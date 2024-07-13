import { Room, SpecialPrice } from '@prisma/client';

export const calculateFinalPrice = async (
  room: Room & { special_price: SpecialPrice[] },
  startDate?: string,
  endDate?: string,
): Promise<number> => {
  let finalPrice = 0;
  const start = startDate ? new Date(startDate) : new Date();
  const end = endDate ? new Date(endDate) : new Date(start);

  for (
    let d = new Date(start);
    d <= new Date(end.getTime() - 24 * 60 * 60 * 1000);
    d.setDate(d.getDate() + 1)
  ) {
    let dayPrice = room.price;
    const specialPrice = room.special_price.find((sp) => {
      const spStart = new Date(sp.start_date);
      const spEnd = new Date(sp.end_date);
      return d >= spStart && d <= spEnd;
    });

    if (specialPrice) {
      dayPrice = specialPrice.special_price;
    } else if (d.getDay() === 0 || d.getDay() === 6) {
      dayPrice = room.weekend_price;
    }

    finalPrice += dayPrice;
  }

  if (finalPrice <= 0) {
    finalPrice = room.price;
  }
  return finalPrice;
};

type WhereClause = {
  property_id: number;
  OR?: { name: { contains: string } }[];
  AND?: {
    OR: (
      | {
          room_availability: {
            none: {
              AND: {
                start_date: { lte: Date };
                end_date: { gte: Date };
              }[];
            };
          };
        }
      | { room_availability: {} }
    )[];
  }[];
};

export const buildWhereClause = (
  property_id: string,
  search?: string,
  startDate?: string,
  endDate?: string,
): WhereClause => {
  const start = startDate ? new Date(startDate) : undefined;
  const end = endDate ? new Date(endDate) : undefined;

  const whereClause: WhereClause = {
    property_id: parseInt(property_id),
  };

  if (search) {
    whereClause.OR = [{ name: { contains: search } }];
  }

  if (start && end) {
    whereClause.AND = [
      {
        OR: [
          {
            room_availability: {
              none: {
                AND: [
                  { start_date: { lte: end } },
                  { end_date: { gte: start } },
                ],
              },
            },
          },
          { room_availability: {} },
        ],
      },
    ];
  }

  return whereClause;
};
