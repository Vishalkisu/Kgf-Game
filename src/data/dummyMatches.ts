import { Match } from '../services/cricketApi';

export interface OddsPoint {
  price: number;
  volume: number;
}

export interface MatchOdds {
  back: OddsPoint[];
  lay: OddsPoint[];
}

export interface MatchSelection {
  name: string;
  odds: MatchOdds;
}

export interface Match {
  id: string;
  matchType: string;
  team1: string;
  team2: string;
  date: string;
  venue: string;
  isLive: boolean;
  selections: MatchSelection[];
}

export const dummyMatches: Match[] = [
  {
    id: '1',
    matchType: 'T20',
    team1: 'India',
    team2: 'Australia',
    date: new Date().toISOString(),
    venue: 'Melbourne Cricket Ground',
    isLive: true,
    selections: [
      {
        name: 'India',
        odds: {
          back: [
            { price: 1.85, volume: 1500 },
            { price: 1.84, volume: 2000 },
            { price: 1.83, volume: 2500 }
          ],
          lay: [
            { price: 1.86, volume: 1200 },
            { price: 1.87, volume: 1800 },
            { price: 1.88, volume: 2200 }
          ]
        }
      },
      {
        name: 'Australia',
        odds: {
          back: [
            { price: 2.05, volume: 1200 },
            { price: 2.04, volume: 1800 },
            { price: 2.03, volume: 2000 }
          ],
          lay: [
            { price: 2.06, volume: 1000 },
            { price: 2.07, volume: 1500 },
            { price: 2.08, volume: 1800 }
          ]
        }
      }
    ]
  },
  {
    id: '2',
    matchType: 'ODI',
    team1: 'England',
    team2: 'South Africa',
    date: new Date(Date.now() + 86400000).toISOString(),
    venue: 'Lords Cricket Ground',
    isLive: false,
    selections: [
      {
        name: 'England',
        odds: {
          back: [
            { price: 1.75, volume: 2000 },
            { price: 1.74, volume: 2500 },
            { price: 1.73, volume: 3000 }
          ],
          lay: [
            { price: 1.76, volume: 1800 },
            { price: 1.77, volume: 2200 },
            { price: 1.78, volume: 2500 }
          ]
        }
      },
      {
        name: 'South Africa',
        odds: {
          back: [
            { price: 2.25, volume: 1500 },
            { price: 2.24, volume: 1800 },
            { price: 2.23, volume: 2000 }
          ],
          lay: [
            { price: 2.26, volume: 1200 },
            { price: 2.27, volume: 1500 },
            { price: 2.28, volume: 1800 }
          ]
        }
      }
    ]
  },
  {
    id: '3',
    matchType: 'Test',
    team1: 'New Zealand',
    team2: 'Pakistan',
    date: new Date(Date.now() + 172800000).toISOString(),
    venue: 'Basin Reserve',
    isLive: false,
    selections: [
      {
        name: 'New Zealand',
        odds: {
          back: [
            { price: 1.90, volume: 1800 },
            { price: 1.89, volume: 2200 },
            { price: 1.88, volume: 2500 }
          ],
          lay: [
            { price: 1.91, volume: 1500 },
            { price: 1.92, volume: 1800 },
            { price: 1.93, volume: 2000 }
          ]
        }
      },
      {
        name: 'Pakistan',
        odds: {
          back: [
            { price: 2.10, volume: 1500 },
            { price: 2.09, volume: 1800 },
            { price: 2.08, volume: 2000 }
          ],
          lay: [
            { price: 2.11, volume: 1200 },
            { price: 2.12, volume: 1500 },
            { price: 2.13, volume: 1800 }
          ]
        }
      }
    ]
  },
  {
    id: '4',
    matchType: 'T20',
    team1: 'West Indies',
    team2: 'Sri Lanka',
    date: new Date(Date.now() + 259200000).toISOString(),
    venue: 'Kensington Oval',
    isLive: false,
    selections: [
      {
        name: 'West Indies',
        odds: {
          back: [
            { price: 1.95, volume: 2000 },
            { price: 1.94, volume: 2500 },
            { price: 1.93, volume: 3000 }
          ],
          lay: [
            { price: 1.96, volume: 1800 },
            { price: 1.97, volume: 2200 },
            { price: 1.98, volume: 2500 }
          ]
        }
      },
      {
        name: 'Sri Lanka',
        odds: {
          back: [
            { price: 2.15, volume: 1500 },
            { price: 2.14, volume: 1800 },
            { price: 2.13, volume: 2000 }
          ],
          lay: [
            { price: 2.16, volume: 1200 },
            { price: 2.17, volume: 1500 },
            { price: 2.18, volume: 1800 }
          ]
        }
      }
    ]
  },
  {
    id: '5',
    matchType: 'ODI',
    team1: 'Bangladesh',
    team2: 'Afghanistan',
    date: new Date(Date.now() + 345600000).toISOString(),
    venue: 'Shere Bangla Stadium',
    isLive: false,
    selections: [
      {
        name: 'Bangladesh',
        odds: {
          back: [
            { price: 1.80, volume: 2200 },
            { price: 1.79, volume: 2700 },
            { price: 1.78, volume: 3200 }
          ],
          lay: [
            { price: 1.81, volume: 2000 },
            { price: 1.82, volume: 2400 },
            { price: 1.83, volume: 2800 }
          ]
        }
      },
      {
        name: 'Afghanistan',
        odds: {
          back: [
            { price: 2.30, volume: 1800 },
            { price: 2.29, volume: 2200 },
            { price: 2.28, volume: 2500 }
          ],
          lay: [
            { price: 2.31, volume: 1500 },
            { price: 2.32, volume: 1800 },
            { price: 2.33, volume: 2000 }
          ]
        }
      }
    ]
  }
];
