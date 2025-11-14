import { PaymentWithAction } from '../types/types';

// todo move calculations in database
const calculateBalance = (payments: PaymentWithAction[]): number => {
  return payments.reduce((acc, cur) => {
    acc +=
      cur.action.name === 'deposit' ? Number(cur.amount) : -Number(cur.amount);
    return acc;
  }, 0);
};

export { calculateBalance };
