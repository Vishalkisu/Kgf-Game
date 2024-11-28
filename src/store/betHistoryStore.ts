import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Bet {
  id: string;
  matchId: string;
  matchName: string;
  selectionName: string;
  odds: number;
  stake: number;
  potentialWin: number;
  isBack: boolean;
  timestamp: number;
  status: 'pending' | 'won' | 'lost';
}

interface BetHistoryState {
  bets: Bet[];
  addBet: (bet: Omit<Bet, 'id' | 'timestamp' | 'status'>) => void;
  updateBetStatus: (betId: string, status: Bet['status']) => void;
  getBetsByMatch: (matchId: string) => Bet[];
}

export const useBetHistoryStore = create<BetHistoryState>()(
  persist(
    (set, get) => ({
      bets: [],
      
      addBet: (bet) => set((state) => ({
        bets: [
          ...state.bets,
          {
            ...bet,
            id: Math.random().toString(36).slice(2),
            timestamp: Date.now(),
            status: 'pending'
          }
        ]
      })),

      updateBetStatus: (betId, status) => set((state) => ({
        bets: state.bets.map(bet => 
          bet.id === betId ? { ...bet, status } : bet
        )
      })),

      getBetsByMatch: (matchId) => get().bets.filter(bet => bet.matchId === matchId)
    }),
    {
      name: 'bet-history-storage'
    }
  )
);
