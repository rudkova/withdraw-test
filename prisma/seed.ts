import {
  Action as PaymentAction,
  Payment,
  Prisma,
  PrismaClient,
  User,
} from '@prisma/client';
import { Action } from '../src/payments/action.enum';

const prisma = new PrismaClient();

const userData: User[] = [
  {
    id: 1,
    balance: new Prisma.Decimal(100.5),
  },
  {
    id: 2,
    balance: new Prisma.Decimal(0),
  },
];

const actionsData: PaymentAction[] = [
  {
    id: 1,
    name: Action.DEPOSIT,
  },
  {
    id: 2,
    name: Action.WITHDRAW,
  },
];

const now = new Date();
const paymentsData: Payment[] = [
  {
    id: 1,
    userId: 1,
    amount: new Prisma.Decimal(60),
    actionId: 1,
    ts: new Date(-2 * 60 * 1000),
  },
  {
    id: 2,
    userId: 1,
    amount: new Prisma.Decimal(90.5),
    actionId: 1,
    ts: new Date(now.getTime() - 60 * 1000),
  },
  {
    id: 3,
    userId: 1,
    amount: new Prisma.Decimal(50),
    actionId: 2,
    ts: new Date(),
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const { balance } of userData) {
    const user = await prisma.user.create({
      data: { balance },
    });
    console.log(`Created user with id: ${user.id}`);
  }

  for (const { name } of actionsData) {
    const action = await prisma.action.create({
      data: { name },
    });
    console.log(`Created action with id: ${action.id}`);
  }

  for (const p of paymentsData) {
    const payment = await prisma.payment.create({
      data: {
        userId: p.userId,
        amount: p.amount,
        actionId: p.actionId,
        ts: p.ts,
      },
    });
    console.log(`Created payment with id: ${payment.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
