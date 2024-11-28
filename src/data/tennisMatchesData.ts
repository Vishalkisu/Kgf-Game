export interface OddsPoint {
  odds: number;
  volume: number;
}

export interface MarketOdds {
  back: [OddsPoint, OddsPoint, OddsPoint];
  lay: [OddsPoint, OddsPoint, OddsPoint];
}

export interface TennisMatch {
  id: string;
  tournament: string;
  player1: string;
  player2: string;
  date: string;
  venue: string;
  odds: {
    player1: MarketOdds;
    player2: MarketOdds;
  };
}

export const dummyTennisMatches: TennisMatch[] = [
  {
    id: 't1',
    tournament: 'Wimbledon',
    player1: 'Novak Djokovic',
    player2: 'Rafael Nadal',
    date: new Date().toISOString(),
    venue: 'Centre Court',
    odds: {
      player1: {
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
      player2: {
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
    id: 't2',
    tournament: 'US Open',
    player1: 'Carlos Alcaraz',
    player2: 'Daniil Medvedev',
    date: new Date().toISOString(),
    venue: 'Arthur Ashe Stadium',
    odds: {
      player1: {
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
      player2: {
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
  }
];
