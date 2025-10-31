import { Action, Payment } from '@prisma/client';

export type PaymentWithAction = Payment & { action: Action };
