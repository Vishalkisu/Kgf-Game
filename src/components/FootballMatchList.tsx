import React, { useEffect, useState } from 'react';
import { FootballMatch, MarketOdds, OddsPoint, PlayerPassTdsOdds } from '../data/newFootballMatchesData';
import { useBetStore } from '../store/betStore';
import { fetchMatchOdds } from '../services/oddsApi';

interface FootballMatchListProps {
  selectedLeague: string;
  matches: FootballMatch[];
}

interface OddsTableProps {
  market: MarketOdds;
  onBackClick: (odds: OddsPoint) => void;
  onLayClick: (odds: OddsPoint) => void;
}

const OddsTable: React.FC<OddsTableProps> = ({ market, onBackClick, onLayClick }) => (
  <div className="grid grid-cols-6 gap-1 w-full">
    {/* Back odds */}
    {market.back.map((point, idx) => (
      <button
        key={`back-${idx}`}
        onClick={() => onBackClick(point)}
        className="bg-blue-100 hover:bg-blue-200 p-2 rounded transition-colors"
      >
        <div className="text-blue-800 font-bold">{point.odds.toFixed(2)}</div>
        <div className="text-blue-600 text-xs">₹{point.volume}</div>
      </button>
    )).reverse()}

    {/* Lay odds */}
    {market.lay.map((point, idx) => (
      <button
        key={`lay-${idx}`}
        onClick={() => onLayClick(point)}
        className="bg-pink-100 hover:bg-pink-200 p-2 rounded transition-colors"
      >
        <div className="text-pink-800 font-bold">{point.odds.toFixed(2)}</div>
        <div className="text-pink-600 text-xs">₹{point.volume}</div>
      </button>
    ))}
  </div>
);

const FootballMatchList: React.FC<FootballMatchListProps> = ({ selectedLeague, matches }) => {
  const { placeBet } = useBetStore();
  const [oddsData, setOddsData] = useState<Record<string, PlayerPassTdsOdds>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<Record<string, string>>({});

  const filteredMatches = matches.filter(
    match => selectedLeague === 'all' || match.league === selectedLeague
  );

  useEffect(() => {
    filteredMatches.forEach(match => {
      if (!oddsData[match.id] && !loading[match.id]) {
        setLoading(prev => ({ ...prev, [match.id]: true }));
        
        fetchMatchOdds(match.id)
          .then(data => {
            setOddsData(prev => ({ ...prev, [match.id]: data }));
            setError(prev => ({ ...prev, [match.id]: '' }));
          })
          .catch(err => {
            setError(prev => ({ ...prev, [match.id]: err.message }));
          })
          .finally(() => {
            setLoading(prev => ({ ...prev, [match.id]: false }));
          });
      }
    });
  }, [filteredMatches]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleBackBet = (match: FootballMatch, team: string, odds: OddsPoint) => {
    placeBet({
      id: `${match.id}-${team}-back`,
      matchId: match.id,
      team,
      type: 'back',
      odds: odds.odds,
      stake: 0,
      potential: 0
    });
  };

  const handleLayBet = (match: FootballMatch, team: string, odds: OddsPoint) => {
    placeBet({
      id: `${match.id}-${team}-lay`,
      matchId: match.id,
      team,
      type: 'lay',
      odds: odds.odds,
      stake: 0,
      potential: 0
    });
  };

  return (
    <div className="space-y-4">
      {filteredMatches.map(match => (
        <div key={match.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-blue-600">{match.league}</span>
            <span className="text-sm text-gray-600">{formatDate(match.date)}</span>
          </div>
          
          <div className="space-y-4">
            {/* Market headers */}
            <div className="grid grid-cols-4 gap-4 mb-2">
              <div></div>
              <div className="col-span-3 grid grid-cols-2 gap-4">
                <div className="text-center text-sm font-semibold text-blue-800">Back</div>
                <div className="text-center text-sm font-semibold text-pink-800">Lay</div>
              </div>
            </div>

            {/* Team 1 odds */}
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="text-lg font-bold">{match.team1}</div>
              <div className="col-span-3">
                <OddsTable
                  market={match.odds.team1}
                  onBackClick={(odds) => handleBackBet(match, match.team1, odds)}
                  onLayClick={(odds) => handleLayBet(match, match.team1, odds)}
                />
              </div>
            </div>

            {/* Draw odds */}
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="text-lg font-medium text-gray-600">Draw</div>
              <div className="col-span-3">
                <OddsTable
                  market={match.odds.draw}
                  onBackClick={(odds) => handleBackBet(match, 'Draw', odds)}
                  onLayClick={(odds) => handleLayBet(match, 'Draw', odds)}
                />
              </div>
            </div>

            {/* Team 2 odds */}
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="text-lg font-bold">{match.team2}</div>
              <div className="col-span-3">
                <OddsTable
                  market={match.odds.team2}
                  onBackClick={(odds) => handleBackBet(match, match.team2, odds)}
                  onLayClick={(odds) => handleLayBet(match, match.team2, odds)}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {match.venue}
          </div>

          {/* Player Pass TDs Odds Section */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Player Pass TDs</h3>
            {loading[match.id] ? (
              <div className="text-gray-500">Loading odds...</div>
            ) : error[match.id] ? (
              <div className="text-red-500">{error[match.id]}</div>
            ) : oddsData[match.id] ? (
              <div className="grid grid-cols-2 gap-4">
                {oddsData[match.id].bookmakers.map(bookmaker => (
                  <div key={bookmaker.key} className="border p-2 rounded">
                    <h4 className="font-medium">{bookmaker.title}</h4>
                    {bookmaker.markets[0]?.outcomes.map(outcome => (
                      <div key={outcome.name} className="flex justify-between">
                        <span>{outcome.name}</span>
                        <span className="font-bold">{outcome.price}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FootballMatchList;
