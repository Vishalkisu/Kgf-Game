import React from 'react';
import { TennisMatch, MarketOdds, OddsPoint } from '../data/tennisMatchesData';
import { useBetStore } from '../store/betStore';

interface TennisMatchListProps {
  selectedTournament: string;
  matches: TennisMatch[];
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
        className="bg-red-100 hover:bg-red-200 p-2 rounded transition-colors"
      >
        <div className="text-red-800 font-bold">{point.odds.toFixed(2)}</div>
        <div className="text-red-600 text-xs">₹{point.volume}</div>
      </button>
    ))}
  </div>
);

const TennisMatchList: React.FC<TennisMatchListProps> = ({ selectedTournament, matches }) => {
  const { placeBet } = useBetStore();

  const filteredMatches = matches.filter(
    match => selectedTournament === 'all' || match.tournament === selectedTournament
  );

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

  const handleBackBet = (match: TennisMatch, player: string, odds: OddsPoint) => {
    placeBet({
      id: `${match.id}-${player}-back`,
      matchId: match.id,
      team: player,
      type: 'back',
      odds: odds.odds,
      stake: 0,
      potential: 0
    });
  };

  const handleLayBet = (match: TennisMatch, player: string, odds: OddsPoint) => {
    placeBet({
      id: `${match.id}-${player}-lay`,
      matchId: match.id,
      team: player,
      type: 'lay',
      odds: odds.odds,
      stake: 0,
      potential: 0
    });
  };

  return (
    <div className="space-y-6">
      {filteredMatches.map(match => (
        <div
          key={match.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-blue-600">{match.tournament}</span>
            <span className="text-sm text-gray-600">{formatDate(match.date)}</span>
          </div>
          
          <div className="space-y-4">
            {/* Market headers */}
            <div className="grid grid-cols-4 gap-4 mb-2">
              <div></div>
              <div className="col-span-3 grid grid-cols-2 gap-4">
                <div className="text-center text-sm font-semibold text-blue-800">Back</div>
                <div className="text-center text-sm font-semibold text-red-800">Lay</div>
              </div>
            </div>

            {/* Player 1 odds */}
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="text-lg font-bold">{match.player1}</div>
              <div className="col-span-3">
                <OddsTable
                  market={match.odds.player1}
                  onBackClick={(odds) => handleBackBet(match, match.player1, odds)}
                  onLayClick={(odds) => handleLayBet(match, match.player1, odds)}
                />
              </div>
            </div>

            {/* Player 2 odds */}
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="text-lg font-bold">{match.player2}</div>
              <div className="col-span-3">
                <OddsTable
                  market={match.odds.player2}
                  onBackClick={(odds) => handleBackBet(match, match.player2, odds)}
                  onLayClick={(odds) => handleLayBet(match, match.player2, odds)}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {match.venue}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TennisMatchList;
