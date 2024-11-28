const API_KEY = '6c0e2933f1453834f0872a4e18fbe834';
const BASE_URL = 'https://api.the-odds-api.com/v4';

export interface PlayerPassTdsOdds {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Array<{
    key: string;
    title: string;
    markets: Array<{
      key: string;
      outcomes: Array<{
        name: string;
        price: number;
      }>;
    }>;
  }>;
}

export const fetchMatchOdds = async (eventId: string): Promise<PlayerPassTdsOdds> => {
  try {
    const response = await fetch(
      `${BASE_URL}/sports/americanfootball_ncaaf/events/${eventId}/odds?` +
      `apiKey=${API_KEY}&regions=us&markets=player_pass_tds&oddsFormat=american`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch odds data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching odds:', error);
    throw error;
  }
};
