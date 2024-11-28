export interface OddsPoint {
  odds: number;
  volume: number;
}

export interface MarketOdds {
  back: [OddsPoint, OddsPoint, OddsPoint];
  lay: [OddsPoint, OddsPoint, OddsPoint];
}

export interface KabaddiMatch {
  id: string;
  league: string;
  team1: string;
  team2: string;
  date: string;
  venue: string;
  odds: {
    team1: MarketOdds;
    team2: MarketOdds;
  };
}

export const dummyKabaddiMatches: KabaddiMatch[] = [
  {
    id: 'k1',
    league: 'Pro Kabaddi League',
    team1: 'Patna Pirates',
    team2: 'Bengal Warriors',
    date: new Date().toISOString(),
    venue: 'Netaji Indoor Stadium',
    odds: {
      team1: {
        back: [
          { odds: 1.85, volume: 2000 },
          { odds: 1.84, volume: 2500 },
          { odds: 1.83, volume: 3000 }
        ],
        lay: [
          { odds: 1.86, volume: 1800 },
          { odds: 1.87, volume: 2200 },
          { odds: 1.88, volume: 2700 }
        ]
      },
      team2: {
        back: [
          { odds: 2.10, volume: 1500 },
          { odds: 2.09, volume: 1800 },
          { odds: 2.08, volume: 2000 }
        ],
        lay: [
          { odds: 2.11, volume: 1400 },
          { odds: 2.12, volume: 1700 },
          { odds: 2.13, volume: 1900 }
        ]
      }
    }
  },
  {
    id: 'k2',
    league: 'Pro Kabaddi League',
    team1: 'Dabang Delhi',
    team2: 'U Mumba',
    date: new Date().toISOString(),
    venue: 'Thyagaraj Sports Complex',
    odds: {
      team1: {
        back: [
          { odds: 1.95, volume: 1800 },
          { odds: 1.94, volume: 2200 },
          { odds: 1.93, volume: 2500 }
        ],
        lay: [
          { odds: 1.96, volume: 1700 },
          { odds: 1.97, volume: 2000 },
          { odds: 1.98, volume: 2300 }
        ]
      },
      team2: {
        back: [
          { odds: 1.90, volume: 1600 },
          { odds: 1.89, volume: 1900 },
          { odds: 1.88, volume: 2200 }
        ],
        lay: [
          { odds: 1.91, volume: 1500 },
          { odds: 1.92, volume: 1800 },
          { odds: 1.93, volume: 2100 }
        ]
      }
    }
  },
  {
    id: 'k3',
    league: 'National Kabaddi Championship',
    team1: 'Maharashtra',
    team2: 'Haryana',
    date: new Date().toISOString(),
    venue: 'Shree Shiv Chhatrapati Sports Complex',
    odds: {
      team1: {
        back: [
          { odds: 2.05, volume: 1700 },
          { odds: 2.04, volume: 2000 },
          { odds: 2.03, volume: 2300 }
        ],
        lay: [
          { odds: 2.06, volume: 1600 },
          { odds: 2.07, volume: 1900 },
          { odds: 2.08, volume: 2200 }
        ]
      },
      team2: {
        back: [
          { odds: 1.75, volume: 2200 },
          { odds: 1.74, volume: 2500 },
          { odds: 1.73, volume: 2800 }
        ],
        lay: [
          { odds: 1.76, volume: 2100 },
          { odds: 1.77, volume: 2400 },
          { odds: 1.78, volume: 2700 }
        ]
      }
    }
  }
];
