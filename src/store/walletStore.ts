import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useBetSlipStore } from './betSlipStore';

type PaymentMethod = 'upi' | 'card' | 'netbanking';

interface WalletStore {
  balance: number;
  currency: string;
  deposit: (amount: number, paymentMethod: PaymentMethod) => void;
  withdraw: (amount: number, paymentMethod: PaymentMethod) => void;
  updateBalance: (newBalance: number) => void;
  getAvailableBalance: () => number;
  totalStake: number;
  pendingBetsCount: number;
}

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      balance: 10000,
      currency: '₹',
      totalStake: 0,
      pendingBetsCount: 0,

      deposit: (amount: number, paymentMethod: PaymentMethod) => 
        set((state) => ({ 
          balance: state.balance + amount 
        })),

      withdraw: (amount: number, paymentMethod: PaymentMethod) => {
        const state = get();
        const availableBalance = state.balance - state.totalStake;
        
        if (amount <= availableBalance) {
          set({ balance: state.balance - amount });
          return true;
        }
        return false;
      },

      updateBalance: (newBalance: number) => 
        set({ balance: newBalance }),

      getAvailableBalance: () => {
        const state = get();
        return state.balance - state.totalStake;
      },

      updatePendingBets: (totalStake: number, pendingBetsCount: number) =>
        set({ totalStake, pendingBetsCount })
    }),
    {
      name: 'wallet-storage',
    }
  )
);

// Middleware to sync bet slip state with wallet
const betSlipSubscriber = useBetSlipStore.subscribe(
  (state) => {
    const totalStake = state.totalStake;
    const pendingBetsCount = state.selections.length;
    useWalletStore.getState().updatePendingBets(totalStake, pendingBetsCount);
  }
);
