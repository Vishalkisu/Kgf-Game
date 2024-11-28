import React from 'react';
import { format } from 'date-fns';
import { KabaddiMatch } from '../data/kabaddiMatchesData';
import { useBetStore } from '../store/betStore';

interface KabaddiMatchListProps {
  selectedLeague: string;
  matches: KabaddiMatch[];
}

const KabaddiMatchList: React.FC<KabaddiMatchListProps> = ({ selectedLeague, matches }) => {
  const { placeBet } = useBetStore();

  const filteredMatches = selectedLeague === 'all'
    ? matches
    : matches.filter(match => match.league === selectedLeague);

  const handleBetClick = (
    matchId: string,
    team: string,
    isBack: boolean,
    odds: number,
    index: number
  ) => {
    placeBet({
      id: `${matchId}-${team}-${isBack ? 'back' : 'lay'}-${index}`,
      matchId,
      team,
      odds,
      isBack,
      sport: 'kabaddi',
      eventName: `${team} (${isBack ? 'Back' : 'Lay'})`
    });
  };

  return (
    <div className="space-y-4">
      {filteredMatches.map(match => (
        <div key={match.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-sm text-gray-600">{match.league}</span>
              <h3 className="text-lg font-semibold">{match.team1} vs {match.team2}</h3>
              <p className="text-sm text-gray-600">
                {format(new Date(match.date), 'MMM d, yyyy h:mm a')} • {match.venue}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-7 gap-2 mb-2 text-sm font-medium text-gray-600">
              <div className="col-span-1">Team</div>
              <div className="col-span-3 text-center">Back</div>
              <div className="col-span-3 text-center">Lay</div>
            </div>

            {/* Team 1 Odds */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              <div className="col-span-1 flex items-center">{match.team1}</div>
              {match.odds.team1.back.map((point, index) => (
                <button
                  key={`back-${index}`}
                  onClick={() => handleBetClick(match.id, match.team1, true, point.odds, index)}
                  className="col-span-1 bg-blue-100 hover:bg-blue-200 p-2 rounded text-center"
                >
                  <div className="font-semibold">{point.odds}</div>
                  <div className="text-xs text-gray-600">₹{point.volume}</div>
                </button>
              ))}
              {match.odds.team1.lay.map((point, index) => (
                <button
                  key={`lay-${index}`}
                  onClick={() => handleBetClick(match.id, match.team1, false, point.odds, index)}
                  className="col-span-1 bg-pink-100 hover:bg-pink-200 p-2 rounded text-center"
                >
                  <div className="font-semibold">{point.odds}</div>
                  <div className="text-xs text-gray-600">₹{point.volume}</div>
                </button>
              ))}
            </div>

            {/* Team 2 Odds */}
            <div className="grid grid-cols-7 gap-2">
              <div className="col-span-1 flex items-center">{match.team2}</div>
              {match.odds.team2.back.map((point, index) => (
                <button
                  key={`back-${index}`}
                  onClick={() => handleBetClick(match.id, match.team2, true, point.odds, index)}
                  className="col-span-1 bg-blue-100 hover:bg-blue-200 p-2 rounded text-center"
                >
                  <div className="font-semibold">{point.odds}</div>
                  <div className="text-xs text-gray-600">₹{point.volume}</div>
                </button>
              ))}
              {match.odds.team2.lay.map((point, index) => (
                <button
                  key={`lay-${index}`}
                  onClick={() => handleBetClick(match.id, match.team2, false, point.odds, index)}
                  className="col-span-1 bg-pink-100 hover:bg-pink-200 p-2 rounded text-center"
                >
                  <div className="font-semibold">{point.odds}</div>
                  <div className="text-xs text-gray-600">₹{point.volume}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KabaddiMatchList;
