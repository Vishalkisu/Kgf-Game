export interface Match {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  isLive: boolean;
  status: string;
  score: string;
  overs: string;
  startTime: string;
  odds: {
    back: [number, number, number];
    lay: [number, number, number];
    volumes: [number, number, number];
  };
}

export interface BetSelection {
  matchId: string;
  team: string;
  odds: number;
  isBack: boolean;
  stake: number;
}

export interface WalletState {
  balance: number;
  currency: string;
}