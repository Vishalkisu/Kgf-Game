export interface OddsPoint {
  odds: number;
  volume: number;
}

export interface MarketOdds {
  back: [OddsPoint, OddsPoint, OddsPoint];
  lay: [OddsPoint, OddsPoint, OddsPoint];
}

export interface Horse {
  id: string;
  name: string;
  jockey: string;
  trainer: string;
  age: number;
  weight: string;
  odds: MarketOdds;
}

export interface HorseRace {
  id: string;
  racecourse: string;
  raceNumber: number;
  raceType: string;
  distance: string;
  date: string;
  prize: string;
  horses: Horse[];
}

export const dummyHorseRaces: HorseRace[] = [
  {
    id: 'hr1',
    racecourse: 'Royal Western India Turf Club',
    raceNumber: 1,
    raceType: 'Flat Racing',
    distance: '1400m',
    date: new Date().toISOString(),
    prize: '₹500,000',
    horses: [
      {
        id: 'h1',
        name: 'Thunder Bolt',
        jockey: 'Suraj Narredu',
        trainer: 'Pesi Shroff',
        age: 4,
        weight: '56kg',
        odds: {
          back: [
            { odds: 2.50, volume: 5000 },
            { odds: 2.48, volume: 6000 },
            { odds: 2.46, volume: 7000 }
          ],
          lay: [
            { odds: 2.52, volume: 4800 },
            { odds: 2.54, volume: 5500 },
            { odds: 2.56, volume: 6500 }
          ]
        }
      },
      {
        id: 'h2',
        name: 'Star Warrior',
        jockey: 'PS Chouhan',
        trainer: 'SK Sunderji',
        age: 5,
        weight: '58kg',
        odds: {
          back: [
            { odds: 3.20, volume: 4000 },
            { odds: 3.18, volume: 4500 },
            { odds: 3.16, volume: 5000 }
          ],
          lay: [
            { odds: 3.22, volume: 3800 },
            { odds: 3.24, volume: 4200 },
            { odds: 3.26, volume: 4800 }
          ]
        }
      },
      {
        id: 'h3',
        name: 'Royal Knight',
        jockey: 'A Sandesh',
        trainer: 'MK Jadhav',
        age: 4,
        weight: '54kg',
        odds: {
          back: [
            { odds: 4.50, volume: 3000 },
            { odds: 4.48, volume: 3500 },
            { odds: 4.46, volume: 4000 }
          ],
          lay: [
            { odds: 4.52, volume: 2800 },
            { odds: 4.54, volume: 3200 },
            { odds: 4.56, volume: 3800 }
          ]
        }
      }
    ]
  },
  {
    id: 'hr2',
    racecourse: 'Bangalore Turf Club',
    raceNumber: 2,
    raceType: 'Handicap',
    distance: '1600m',
    date: new Date().toISOString(),
    prize: '₹600,000',
    horses: [
      {
        id: 'h4',
        name: 'Speed King',
        jockey: 'Yash Narredu',
        trainer: 'S Padmanabhan',
        age: 5,
        weight: '57kg',
        odds: {
          back: [
            { odds: 1.95, volume: 6000 },
            { odds: 1.94, volume: 7000 },
            { odds: 1.93, volume: 8000 }
          ],
          lay: [
            { odds: 1.96, volume: 5800 },
            { odds: 1.97, volume: 6500 },
            { odds: 1.98, volume: 7500 }
          ]
        }
      },
      {
        id: 'h5',
        name: 'Desert Storm',
        jockey: 'Trevor Patel',
        trainer: 'Arjun Mangalorkar',
        age: 4,
        weight: '55kg',
        odds: {
          back: [
            { odds: 2.80, volume: 4500 },
            { odds: 2.78, volume: 5000 },
            { odds: 2.76, volume: 5500 }
          ],
          lay: [
            { odds: 2.82, volume: 4300 },
            { odds: 2.84, volume: 4800 },
            { odds: 2.86, volume: 5200 }
          ]
        }
      }
    ]
  },
  {
    id: 'hr3',
    racecourse: 'Madras Race Club',
    raceNumber: 3,
    raceType: 'Classic',
    distance: '2000m',
    date: new Date().toISOString(),
    prize: '₹800,000',
    horses: [
      {
        id: 'h6',
        name: 'Victory March',
        jockey: 'Akshay Kumar',
        trainer: 'James McKeown',
        age: 4,
        weight: '56kg',
        odds: {
          back: [
            { odds: 3.60, volume: 4000 },
            { odds: 3.58, volume: 4500 },
            { odds: 3.56, volume: 5000 }
          ],
          lay: [
            { odds: 3.62, volume: 3800 },
            { odds: 3.64, volume: 4200 },
            { odds: 3.66, volume: 4800 }
          ]
        }
      },
      {
        id: 'h7',
        name: 'Golden Glory',
        jockey: 'Suraj Narredu',
        trainer: 'Vijay Singh',
        age: 5,
        weight: '58kg',
        odds: {
          back: [
            { odds: 2.10, volume: 5500 },
            { odds: 2.08, volume: 6000 },
            { odds: 2.06, volume: 6500 }
          ],
          lay: [
            { odds: 2.12, volume: 5300 },
            { odds: 2.14, volume: 5800 },
            { odds: 2.16, volume: 6200 }
          ]
        }
      }
    ]
  }
];
