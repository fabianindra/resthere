import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

cron.schedule('*/5 * * * *', async () => {
  console.log('Running the scheduled job to check for expired transactions.');

  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

  try {
    const expiredTransactions = await prisma.transaction.findMany({
      where: {
        status: 'waiting payment',
        updatedAt: {
          lte: twoHoursAgo,
        },
      },
    });

    for (const transaction of expiredTransactions) {
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { 
          status: 'cancelled',
          updatedAt: new Date(),
        },
      });
    }

    console.log(`Cancelled ${expiredTransactions.length} expired transactions.`);
  } catch (error) {
    console.error('Failed to cancel expired transactions:', error);
  }
});
