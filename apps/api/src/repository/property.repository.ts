import { PrismaClient } from '@prisma/client';
import {
  buildPropertyWhereClause,
  countProperties,
  findProperties,
  sortProperties,
  geocoder,
} from '../utils/property.utils';

const prisma = new PrismaClient();

interface GetPropertyParams {
  city?: string;
  search?: string;
  page?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'price' | 'name';
  sortDirection?: 'asc' | 'desc';
}

export const repoGetPropertyByRooms = async ({
  city,
  search,
  page,
  startDate,
  endDate,
  sortBy,
  sortDirection,
}: GetPropertyParams) => {
  const pageN = page ? (parseInt(page) - 1) * 4 : 0;
  const whereClause = await buildPropertyWhereClause({
    city,
    search,
    startDate,
    endDate,
  });

  const count = await countProperties(whereClause);
  const allProperties = await findProperties(whereClause, pageN, 4);

  console.log(allProperties);

  return {
    count,
    result: allProperties,
  };
};

export const repoGetPropertyByTenant = async ({
  tenant_id,
  search,
  category,
  page,
  sortBy,
  sortDirection,
  startDate,
  endDate,
}: {
  tenant_id: string;
  search: string;
  category: string;
  page: string;
  sortBy: 'name' | 'price';
  sortDirection: 'asc' | 'desc';
  startDate: string;
  endDate: string;
}) => {
  const pageN = page ? parseInt(page) * 4 - 4 : 0;
  const whereClause = buildPropertyWhereClause({ search, startDate, endDate });

  whereClause['tenant_id'] = parseInt(tenant_id);
  if (category) {
    whereClause['category_property'] = category;
  }

  const count = await countProperties(whereClause);
  const allProperties = await findProperties(whereClause, pageN, 4);
  const sortedProperties = sortProperties(allProperties, sortBy, sortDirection);

  return {
    count,
    result: sortedProperties,
  };
};

export const repoGetDetailProperty = async (property_id: number) => {
  return await prisma.property.findUnique({
    where: {
      id: property_id,
    },
    include: {
      rooms: true,
    },
  });
};

export const repoAddProperty = async ({
  name,
  address,
  city_name,
  province_name,
  category_property,
  tenant_id,
  image,
}: {
  name: string;
  address: string;
  city_name: string;
  province_name: string;
  category_property: string;
  tenant_id: number;
  image: string;
}) => {
  const geocodeResult = await new Promise<any>((resolve, reject) => {
    geocoder.geocode(address, function (err: any, res: any) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

  if (!geocodeResult || geocodeResult.length === 0) {
    throw new Error('Geocoding failed');
  }

  console.log('Geocode result:', geocodeResult);

  const latitude = `${geocodeResult[0].latitude}`;
  const longitude = `${geocodeResult[0].longitude}`;

  return await prisma.property.create({
    data: {
      name,
      address,
      city_name,
      province_name,
      category_property,
      room_count: 0,
      tenant_id,
      image,
      latitude,
      longitude,
    },
  });
};

export const repoUpdateProperty = async ({
  id,
  name,
  address,
  category_property,
  image,
}: {
  id: number;
  name: string;
  address: string;
  category_property: string;
  image: string;
}) => {
  const geocodeResult = await new Promise<any>((resolve, reject) => {
    geocoder.geocode(address, function (err: any, res: any) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

  if (!geocodeResult || geocodeResult.length === 0) {
    throw new Error('Geocoding failed');
  }

  console.log('Geocode result:', geocodeResult);

  const latitude = `${geocodeResult[0].latitude}`;
  const longitude = `${geocodeResult[0].longitude}`;

  return await prisma.property.update({
    where: { id },
    data: {
      name,
      address,
      category_property,
      image,
      latitude,
      longitude,
    },
  });
};

export const repoDeleteProperty = async (id: number) => {
  return await prisma.property.delete({
    where: { id },
  });
};

export const repoCheckProperty = async (id: number) => {
  return await prisma.property.findUnique({
    where: { id },
  });
};
