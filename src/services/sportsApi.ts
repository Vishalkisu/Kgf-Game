export interface Match {
  id: string;
  sportType: string;
  league: string;
  team1: string;
  team2: string;
  startTime: string;
  status: 'live' | 'upcoming' | 'completed';
  score?: {
    team1: number | string;
    team2: number | string;
  };
  markets: Market[];
}

export interface Market {
  id: string;
  name: string;
  selections: Selection[];
}

export interface Selection {
  id: string;
  name: string;
  status: 'active' | 'suspended';
  backOdds: OddsPoint[];
  layOdds: OddsPoint[];
}

export interface OddsPoint {
  price: number;
  volume: number;
}

const generateRandomOdds = (baseOdds: number, isLay: boolean): OddsPoint[] => {
  const variance = 0.05; // 5% variance between odds points
  const volumeBase = Math.floor(10000 + Math.random() * 90000);
  
  return Array(3).fill(null).map((_, i) => {
    const priceVariance = isLay ? i * variance : -i * variance;
    const price = Number((baseOdds * (1 + priceVariance)).toFixed(2));
    const volume = Math.floor(volumeBase * (1 - i * 0.2));
    
    return { price, volume };
  });
};

const generateMatchOdds = (sportType: string, isCompleted: boolean): Market[] => {
  const baseOdds = 1.5 + Math.random();
  
  const matchOddsMarket: Market = {
    id: 'match_odds',
    name: 'Match Odds',
    selections: [
      {
        id: 'team1',
        name: 'Team 1',
        status: isCompleted ? 'suspended' : 'active',
        backOdds: generateRandomOdds(baseOdds, false),
        layOdds: generateRandomOdds(baseOdds + 0.02, true),
      },
      {
        id: 'team2',
        name: 'Team 2',
        status: isCompleted ? 'suspended' : 'active',
        backOdds: generateRandomOdds(baseOdds + 0.5, false),
        layOdds: generateRandomOdds(baseOdds + 0.52, true),
      },
    ],
  };

  // Add draw option for soccer
  if (sportType === 'soccer') {
    matchOddsMarket.selections.push({
      id: 'draw',
      name: 'Draw',
      status: isCompleted ? 'suspended' : 'active',
      backOdds: generateRandomOdds(3.2, false),
      layOdds: generateRandomOdds(3.22, true),
    });
  }

  return [matchOddsMarket];
};

const generateDummyMatches = (sportType: string): Match[] => {
  const leagues: { [key: string]: string[] } = {
    cricket: ['IPL', 'BBL', 'CPL', 'T20 World Cup', 'Test Series'],
    soccer: ['Premier League', 'La Liga', 'Champions League', 'Bundesliga', 'Serie A'],
    tennis: ['Wimbledon', 'US Open', 'French Open', 'Australian Open', 'ATP Finals'],
    kabaddi: ['Pro Kabaddi League', 'National Kabaddi Championship', 'Asian Games'],
    'horse-racing': ['Royal Ascot', 'Kentucky Derby', 'Melbourne Cup', 'Dubai World Cup'],
    greyhound: ['English Derby', 'Australian Cup', 'Golden Easter Egg', 'Phoenix Cup'],
  };

  const teams: { [key: string]: string[][] } = {
    cricket: [
      ['Mumbai Indians', 'Chennai Super Kings'],
      ['Royal Challengers', 'Kolkata Knight Riders'],
      ['Delhi Capitals', 'Rajasthan Royals'],
    ],
    soccer: [
      ['Manchester United', 'Liverpool'],
      ['Barcelona', 'Real Madrid'],
      ['Bayern Munich', 'Borussia Dortmund'],
    ],
    tennis: [
      ['Djokovic', 'Nadal'],
      ['Federer', 'Murray'],
      ['Medvedev', 'Zverev'],
    ],
    kabaddi: [
      ['Bengaluru Bulls', 'Patna Pirates'],
      ['U Mumba', 'Jaipur Pink Panthers'],
      ['Bengal Warriors', 'Telugu Titans'],
    ],
    'horse-racing': [
      ['Thunder Bolt', 'Silver Arrow'],
      ['Golden Star', 'Dark Knight'],
      ['Royal Flash', 'Storm Runner'],
    ],
    greyhound: [
      ['Swift Runner', 'Lightning Bolt'],
      ['Shadow Chaser', 'Wind Rider'],
      ['Star Gazer', 'Night Fury'],
    ],
  };

  const sportLeagues = leagues[sportType] || [];
  const sportTeams = teams[sportType] || [];
  const matches: Match[] = [];

  // Generate 6-10 random matches
  const numMatches = Math.floor(Math.random() * 5) + 6;

  for (let i = 0; i < numMatches; i++) {
    const randomTeamPair = sportTeams[Math.floor(Math.random() * sportTeams.length)];
    const randomLeague = sportLeagues[Math.floor(Math.random() * sportLeagues.length)];
    const isLive = Math.random() > 0.5;
    const hasStarted = Math.random() > 0.3;
    const status = hasStarted ? (isLive ? 'live' : 'completed') : 'upcoming';

    const match: Match = {
      id: `${sportType}-${i}`,
      sportType,
      league: randomLeague,
      team1: randomTeamPair[0],
      team2: randomTeamPair[1],
      startTime: new Date(Date.now() + Math.random() * 86400000).toISOString(),
      status,
      markets: generateMatchOdds(sportType, status === 'completed'),
    };

    // Add scores for live and completed matches
    if (hasStarted) {
      if (sportType === 'tennis') {
        match.score = {
          team1: `${Math.floor(Math.random() * 3)}-${Math.floor(Math.random() * 7)}`,
          team2: `${Math.floor(Math.random() * 3)}-${Math.floor(Math.random() * 7)}`,
        };
      } else if (sportType === 'cricket') {
        match.score = {
          team1: `${Math.floor(Math.random() * 200)}/${Math.floor(Math.random() * 10)}`,
          team2: `${Math.floor(Math.random() * 200)}/${Math.floor(Math.random() * 10)}`,
        };
      } else {
        match.score = {
          team1: Math.floor(Math.random() * 5),
          team2: Math.floor(Math.random() * 5),
        };
      }
    }

    matches.push(match);
  }

  return matches;
};

export const fetchMatches = async (sportType: string): Promise<Match[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    return generateDummyMatches(sportType);
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};
