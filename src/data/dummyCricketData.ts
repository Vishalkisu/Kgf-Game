import { Match } from '../services/cricketApi';

export const dummyCricketMatches: Match[] = [
  {
    id: 'dummy-1',
    name: 'India vs Australia',
    matchType: 'T20',
    status: 'Live',
    venue: 'Melbourne Cricket Ground',
    date: new Date().toISOString(),
    dateTimeGMT: new Date().toISOString(),
    teams: ['India', 'Australia'],
    score: [
      { r: 185, w: 4, o: 18.2, inning: 'India Inning' },
      { r: 160, w: 6, o: 16.4, inning: 'Australia Inning' }
    ],
    teamInfo: [
      {
        name: 'India',
        shortname: 'IND',
        img: 'https://example.com/india.png'
      },
      {
        name: 'Australia',
        shortname: 'AUS',
        img: 'https://example.com/australia.png'
      }
    ],
    odds: {
      back: [1.85, 1.86, 1.87],
      lay: [1.88, 1.89, 1.90],
      volumes: [10000, 15000, 20000]
    }
  },
  {
    id: 'dummy-2',
    name: 'England vs South Africa',
    matchType: 'ODI',
    status: 'Live',
    venue: 'Lords Cricket Ground',
    date: new Date().toISOString(),
    dateTimeGMT: new Date().toISOString(),
    teams: ['England', 'South Africa'],
    score: [
      { r: 245, w: 5, o: 35.2, inning: 'England Inning' },
      { r: 180, w: 4, o: 28.4, inning: 'South Africa Inning' }
    ],
    teamInfo: [
      {
        name: 'England',
        shortname: 'ENG',
        img: 'https://example.com/england.png'
      },
      {
        name: 'South Africa',
        shortname: 'SA',
        img: 'https://example.com/southafrica.png'
      }
    ],
    odds: {
      back: [1.65, 1.66, 1.67],
      lay: [1.68, 1.69, 1.70],
      volumes: [12000, 18000, 25000]
    }
  },
  {
    id: 'dummy-3',
    name: 'Pakistan vs New Zealand',
    matchType: 'Test',
    status: 'Live',
    venue: 'National Stadium, Karachi',
    date: new Date().toISOString(),
    dateTimeGMT: new Date().toISOString(),
    teams: ['Pakistan', 'New Zealand'],
    score: [
      { r: 320, w: 6, o: 88.4, inning: 'Pakistan Inning' },
      { r: 280, w: 4, o: 75.2, inning: 'New Zealand Inning' }
    ],
    teamInfo: [
      {
        name: 'Pakistan',
        shortname: 'PAK',
        img: 'https://example.com/pakistan.png'
      },
      {
        name: 'New Zealand',
        shortname: 'NZ',
        img: 'https://example.com/newzealand.png'
      }
    ],
    odds: {
      back: [2.05, 2.06, 2.07],
      lay: [2.08, 2.09, 2.10],
      volumes: [8000, 12000, 15000]
    }
  }
];
