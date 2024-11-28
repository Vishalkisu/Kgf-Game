export type PaymentMethod = 'UPI' | 'CARD' | 'NET_BANKING';

export type TransactionType = 'DEPOSIT' | 'WITHDRAW';

export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  paymentMethod: PaymentMethod;
  status: TransactionStatus;
  timestamp: Date;
}

export interface WalletState {
  balance: number;
  transactions: Transaction[];
}
