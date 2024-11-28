const API_KEY = '48c00238-a135-4ec2-98d9-fae24cc178f9';
const BASE_URL = 'https://api.cricapi.com/v1';

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
  status: string;
  score: {
    team1: {
      runs: number;
      wickets: number;
      overs: number;
    };
    team2: {
      runs: number;
      wickets: number;
      overs: number;
    };
  };
  selections: MatchSelection[];
}

export interface CricAPIMatch {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: Array<{
    name: string;
    shortname: string;
  }>;
  score: Array<{
    r: number;
    w: number;
    o: number;
    inning: string;
  }>;
}

export interface CricAPIResponse {
  apikey: string;
  data: CricAPIMatch[];
  status: string;
  info: {
    hitsToday: number;
    hitsUsed: number;
    hitsLimit: number;
  };
}

// Generate random odds for a team
const generateOdds = (basePrice: number): MatchOdds => {
  const variation = 0.05;
  const backPrice = basePrice + Math.random() * variation;
  const layPrice = backPrice + 0.02 + Math.random() * variation;

  return {
    back: [
      { price: backPrice, volume: Math.floor(Math.random() * 1000) + 500 },
      { price: backPrice - 0.02, volume: Math.floor(Math.random() * 800) + 300 },
      { price: backPrice - 0.04, volume: Math.floor(Math.random() * 500) + 200 }
    ],
    lay: [
      { price: layPrice, volume: Math.floor(Math.random() * 1000) + 500 },
      { price: layPrice + 0.02, volume: Math.floor(Math.random() * 800) + 300 },
      { price: layPrice + 0.04, volume: Math.floor(Math.random() * 500) + 200 }
    ]
  };
};

// Transform CricAPI match to our Match format
export const transformMatch = (cricMatch: CricAPIMatch): Match => {
  const team1Score = cricMatch.score?.find(s => s.inning.includes(cricMatch.teams[0]));
  const team2Score = cricMatch.score?.find(s => s.inning.includes(cricMatch.teams[1]));

  return {
    id: cricMatch.id,
    matchType: cricMatch.matchType,
    team1: cricMatch.teams[0],
    team2: cricMatch.teams[1],
    date: cricMatch.dateTimeGMT,
    venue: cricMatch.venue,
    isLive: cricMatch.status.toLowerCase().includes('live'),
    status: cricMatch.status,
    score: {
      team1: {
        runs: team1Score?.r || 0,
        wickets: team1Score?.w || 0,
        overs: team1Score?.o || 0,
      },
      team2: {
        runs: team2Score?.r || 0,
        wickets: team2Score?.w || 0,
        overs: team2Score?.o || 0,
      }
    },
    selections: [
      {
        name: cricMatch.teams[0],
        odds: generateOdds(1.8)
      },
      {
        name: cricMatch.teams[1],
        odds: generateOdds(2.0)
      }
    ]
  };
};

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    console.log('Fetching matches from API...');
    const response = await fetch(`${BASE_URL}/currentMatches?apikey=${API_KEY}&offset=0`);
    const data: CricAPIResponse = await response.json();

    if (data.status !== "success") {
      throw new Error('API request failed');
    }

    // Log API usage
    console.log('API Usage:', {
      hitsToday: data.info.hitsToday,
      hitsUsed: data.info.hitsUsed,
      hitsLimit: data.info.hitsLimit
    });

    if (!data.data || data.data.length === 0) {
      throw new Error('No matches found');
    }

    return data.data.map(transformMatch);
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

export const getMatchStatus = (match: Match): string => {
  return match.isLive ? 'Live' : 'Upcoming';
};

export const formatMatchTime = (date: string): string => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};
