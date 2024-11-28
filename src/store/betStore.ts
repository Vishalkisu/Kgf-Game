import { create } from 'zustand';

interface Bet {
  id: string;
  matchId: string;
  matchName: string;
  type: 'back' | 'lay';
  odds: number;
  stake: number;
  potentialWin: number;
  timestamp: Date;
  status: 'pending' | 'won' | 'lost';
}

type PaymentMethod = 'upi' | 'netbanking' | 'card';

interface Wallet {
  balance: number;
  transactions: Array<{
    id: string;
    type: 'deposit' | 'withdraw' | 'bet';
    amount: number;
    timestamp: Date;
    status: 'success' | 'pending' | 'failed';
  }>;
}

interface State {
  bets: Bet[];
  wallet: Wallet;
  deposit: (amount: number, paymentMethod: PaymentMethod) => void;
  withdraw: (amount: number, paymentMethod: PaymentMethod) => void;
  placeBet: (bet: Omit<Bet, 'id' | 'potentialWin' | 'timestamp' | 'status'>) => void;
  removeBet: (id: string) => void;
  updateStake: (id: string, stake: number) => void;
}

const initialState: State = {
  bets: [],
  wallet: {
    balance: 10000, // Initialize wallet with 10,000 rupees
    transactions: [],
  },
  deposit: (amount: number, paymentMethod: PaymentMethod) => { },
  withdraw: (amount: number, paymentMethod: PaymentMethod) => { },
  placeBet: (bet: Omit<Bet, 'id' | 'potentialWin' | 'timestamp' | 'status'>) => { },
  removeBet: (id: string) => { },
  updateStake: (id: string, stake: number) => { },
};

export const useBetStore = create<State>((set) => ({
  ...initialState,
  deposit: (amount: number, paymentMethod: PaymentMethod) =>
    set((state) => ({
      wallet: {
        ...state.wallet,
        balance: state.wallet.balance + amount,
        transactions: [
          ...state.wallet.transactions,
          {
            id: Math.random().toString(36).substr(2, 9),
            type: 'deposit',
            amount,
            timestamp: new Date(),
            status: 'success',
          },
        ],
      },
    })),
  withdraw: (amount: number, paymentMethod: PaymentMethod) =>
    set((state) => ({
      wallet: {
        ...state.wallet,
        balance: state.wallet.balance - amount,
        transactions: [
          ...state.wallet.transactions,
          {
            id: Math.random().toString(36).substr(2, 9),
            type: 'withdraw',
            amount,
            timestamp: new Date(),
            status: 'success',
          },
        ],
      },
    })),
  placeBet: (bet) =>
    set((state) => {
      const id = Math.random().toString(36).substr(2, 9);
      const potentialWin = bet.type === 'back' 
        ? bet.stake * (bet.odds - 1)
        : bet.stake;
      
      return {
        bets: [
          ...state.bets,
          {
            ...bet,
            id,
            potentialWin,
            timestamp: new Date(),
            status: 'pending',
          },
        ],
        wallet: {
          ...state.wallet,
          balance: state.wallet.balance - bet.stake,
          transactions: [
            ...state.wallet.transactions,
            {
              id: Math.random().toString(36).substr(2, 9),
              type: 'bet',
              amount: -bet.stake,
              timestamp: new Date(),
              status: 'success',
            },
          ],
        },
      };
    }),
  removeBet: (id) =>
    set((state) => {
      const bet = state.bets.find((b) => b.id === id);
      if (!bet) return state;

      return {
        bets: state.bets.filter((b) => b.id !== id),
        wallet: {
          ...state.wallet,
          balance: state.wallet.balance + bet.stake,
          transactions: [
            ...state.wallet.transactions,
            {
              id: Math.random().toString(36).substr(2, 9),
              type: 'bet',
              amount: bet.stake,
              timestamp: new Date(),
              status: 'success',
            },
          ],
        },
      };
    }),
  updateStake: (id, stake) =>
    set((state) => ({
      bets: state.bets.map((bet) =>
        bet.id === id
          ? {
              ...bet,
              stake,
              potentialWin:
                bet.type === 'back' ? stake * (bet.odds - 1) : stake,
            }
          : bet
      ),
    })),
}));