import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface BetSelection {
  matchId: string;
  matchName: string;
  selectionName: string;
  odds: number;
  stake: number;
  isBack: boolean;
  timestamp: number;
}

interface BetSlipState {
  selections: BetSelection[];
  totalStake: number;
  totalPotentialWin: number;
  addSelection: (selection: Omit<BetSelection, 'timestamp'>) => void;
  removeSelection: (matchId: string, selectionName: string) => void;
  updateStake: (matchId: string, selectionName: string, stake: number) => void;
  clearBetSlip: () => void;
  getSelectionByMatch: (matchId: string, selectionName: string) => BetSelection | undefined;
}

export const useBetSlipStore = create<BetSlipState>()(
  persist(
    (set, get) => ({
      selections: [],
      totalStake: 0,
      totalPotentialWin: 0,

      addSelection: (selection) => set((state) => {
        const existingIndex = state.selections.findIndex(
          s => s.matchId === selection.matchId && s.selectionName === selection.selectionName
        );

        let newSelections: BetSelection[];
        if (existingIndex >= 0) {
          // Update existing selection
          newSelections = [...state.selections];
          newSelections[existingIndex] = {
            ...selection,
            timestamp: Date.now(),
            stake: state.selections[existingIndex].stake
          };
        } else {
          // Add new selection
          newSelections = [
            ...state.selections,
            { ...selection, timestamp: Date.now() }
          ];
        }

        // Calculate totals
        const totalStake = newSelections.reduce((sum, sel) => sum + (sel.stake || 0), 0);
        const totalPotentialWin = newSelections.reduce(
          (sum, sel) => sum + (sel.stake || 0) * sel.odds,
          0
        );

        return {
          selections: newSelections,
          totalStake,
          totalPotentialWin
        };
      }),

      removeSelection: (matchId, selectionName) => set((state) => {
        const newSelections = state.selections.filter(
          s => !(s.matchId === matchId && s.selectionName === selectionName)
        );

        const totalStake = newSelections.reduce((sum, sel) => sum + (sel.stake || 0), 0);
        const totalPotentialWin = newSelections.reduce(
          (sum, sel) => sum + (sel.stake || 0) * sel.odds,
          0
        );

        return {
          selections: newSelections,
          totalStake,
          totalPotentialWin
        };
      }),

      updateStake: (matchId, selectionName, stake) => set((state) => {
        const newSelections = state.selections.map(selection =>
          selection.matchId === matchId && selection.selectionName === selectionName
            ? { ...selection, stake }
            : selection
        );

        const totalStake = newSelections.reduce((sum, sel) => sum + (sel.stake || 0), 0);
        const totalPotentialWin = newSelections.reduce(
          (sum, sel) => sum + (sel.stake || 0) * sel.odds,
          0
        );

        return {
          selections: newSelections,
          totalStake,
          totalPotentialWin
        };
      }),

      clearBetSlip: () => set({
        selections: [],
        totalStake: 0,
        totalPotentialWin: 0
      }),

      getSelectionByMatch: (matchId, selectionName) => {
        const state = get();
        return state.selections.find(
          s => s.matchId === matchId && s.selectionName === selectionName
        );
      }
    }),
    {
      name: 'bet-slip-storage',
      getStorage: () => localStorage,
    }
  )
);

// Wallet Store
interface WalletState {
  balance: number;
  currency: string;
  updateBalance: (newBalance: number) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      balance: 1000, // Initial balance
      currency: '£',
      updateBalance: (newBalance) => set({ balance: newBalance }),
    }),
    {
      name: 'wallet-storage',
      getStorage: () => localStorage,
    }
  )
);
