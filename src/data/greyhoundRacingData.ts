export interface OddsPoint {
  odds: number;
  volume: number;
}

export interface MarketOdds {
  back: [OddsPoint, OddsPoint, OddsPoint];
  lay: [OddsPoint, OddsPoint, OddsPoint];
}

export interface Greyhound {
  id: string;
  name: string;
  trainer: string;
  trapNumber: number;
  weight: string;
  form: string; // Recent race positions e.g. "1-2-3-4"
  odds: MarketOdds;
}

export interface GreyhoundRace {
  id: string;
  track: string;
  raceNumber: number;
  raceType: string;
  distance: string;
  date: string;
  prize: string;
  greyhounds: Greyhound[];
}

export const dummyGreyhoundRaces: GreyhoundRace[] = [
  {
    id: 'gr1',
    track: 'Bangalore Greyhound Stadium',
    raceNumber: 1,
    raceType: 'Sprint',
    distance: '480m',
    date: new Date().toISOString(),
    prize: '₹200,000',
    greyhounds: [
      {
        id: 'g1',
        name: 'Swift Runner',
        trainer: 'R. Kumar',
        trapNumber: 1,
        weight: '32kg',
        form: '1-2-1-3',
        odds: {
          back: [
            { odds: 2.20, volume: 3000 },
            { odds: 2.18, volume: 3500 },
            { odds: 2.16, volume: 4000 }
          ],
          lay: [
            { odds: 2.22, volume: 2800 },
            { odds: 2.24, volume: 3200 },
            { odds: 2.26, volume: 3800 }
          ]
        }
      },
      {
        id: 'g2',
        name: 'Rapid Fire',
        trainer: 'S. Patel',
        trapNumber: 2,
        weight: '31.5kg',
        form: '2-1-3-2',
        odds: {
          back: [
            { odds: 3.10, volume: 2500 },
            { odds: 3.08, volume: 3000 },
            { odds: 3.06, volume: 3500 }
          ],
          lay: [
            { odds: 3.12, volume: 2300 },
            { odds: 3.14, volume: 2800 },
            { odds: 3.16, volume: 3200 }
          ]
        }
      },
      {
        id: 'g3',
        name: 'Flash Point',
        trainer: 'M. Singh',
        trapNumber: 3,
        weight: '33kg',
        form: '3-3-2-1',
        odds: {
          back: [
            { odds: 4.20, volume: 2000 },
            { odds: 4.18, volume: 2500 },
            { odds: 4.16, volume: 3000 }
          ],
          lay: [
            { odds: 4.22, volume: 1800 },
            { odds: 4.24, volume: 2200 },
            { odds: 4.26, volume: 2800 }
          ]
        }
      }
    ]
  },
  {
    id: 'gr2',
    track: 'Mumbai Greyhound Park',
    raceNumber: 2,
    raceType: 'Distance',
    distance: '660m',
    date: new Date().toISOString(),
    prize: '₹250,000',
    greyhounds: [
      {
        id: 'g4',
        name: 'Storm Chaser',
        trainer: 'A. Desai',
        trapNumber: 1,
        weight: '32.5kg',
        form: '1-1-2-1',
        odds: {
          back: [
            { odds: 1.90, volume: 4000 },
            { odds: 1.88, volume: 4500 },
            { odds: 1.86, volume: 5000 }
          ],
          lay: [
            { odds: 1.92, volume: 3800 },
            { odds: 1.94, volume: 4200 },
            { odds: 1.96, volume: 4800 }
          ]
        }
      },
      {
        id: 'g5',
        name: 'Night Fury',
        trainer: 'V. Shah',
        trapNumber: 2,
        weight: '31kg',
        form: '2-3-1-2',
        odds: {
          back: [
            { odds: 2.70, volume: 3000 },
            { odds: 2.68, volume: 3500 },
            { odds: 2.66, volume: 4000 }
          ],
          lay: [
            { odds: 2.72, volume: 2800 },
            { odds: 2.74, volume: 3200 },
            { odds: 2.76, volume: 3800 }
          ]
        }
      }
    ]
  },
  {
    id: 'gr3',
    track: 'Delhi Greyhound Circuit',
    raceNumber: 3,
    raceType: 'Hurdles',
    distance: '540m',
    date: new Date().toISOString(),
    prize: '₹300,000',
    greyhounds: [
      {
        id: 'g6',
        name: 'Sky Walker',
        trainer: 'P. Reddy',
        trapNumber: 1,
        weight: '33.5kg',
        form: '1-3-1-2',
        odds: {
          back: [
            { odds: 3.40, volume: 2500 },
            { odds: 3.38, volume: 3000 },
            { odds: 3.36, volume: 3500 }
          ],
          lay: [
            { odds: 3.42, volume: 2300 },
            { odds: 3.44, volume: 2800 },
            { odds: 3.46, volume: 3200 }
          ]
        }
      },
      {
        id: 'g7',
        name: 'Thunder Bolt',
        trainer: 'K. Sharma',
        trapNumber: 2,
        weight: '32kg',
        form: '2-1-2-1',
        odds: {
          back: [
            { odds: 2.00, volume: 3500 },
            { odds: 1.98, volume: 4000 },
            { odds: 1.96, volume: 4500 }
          ],
          lay: [
            { odds: 2.02, volume: 3300 },
            { odds: 2.04, volume: 3800 },
            { odds: 2.06, volume: 4200 }
          ]
        }
      }
    ]
  }
];
