import React from 'react';
import { format } from 'date-fns';
import { GreyhoundRace } from '../data/greyhoundRacingData';
import { useBetStore } from '../store/betStore';

interface GreyhoundRacingListProps {
  selectedTrack: string;
  matches: GreyhoundRace[];
}

const GreyhoundRacingList: React.FC<GreyhoundRacingListProps> = ({ selectedTrack, matches }) => {
  const { placeBet } = useBetStore();

  const filteredRaces = selectedTrack === 'all'
    ? matches
    : matches.filter(race => race.track === selectedTrack);

  const handleBackBet = (race: GreyhoundRace, greyhound: { id: string; name: string }, odds: OddsPoint) => {
    placeBet({
      id: `${race.id}-${greyhound.id}-back`,
      matchId: race.id,
      team: greyhound.name,
      type: 'back',
      odds: odds.odds,
      stake: 0,
      potential: 0,
      sport: 'greyhoundRacing',
      eventName: `${race.track} - Race ${race.raceNumber}`
    });
  };

  const handleLayBet = (race: GreyhoundRace, greyhound: { id: string; name: string }, odds: OddsPoint) => {
    placeBet({
      id: `${race.id}-${greyhound.id}-lay`,
      matchId: race.id,
      team: greyhound.name,
      type: 'lay',
      odds: odds.odds,
      stake: 0,
      potential: 0,
      sport: 'greyhoundRacing',
      eventName: `${race.track} - Race ${race.raceNumber}`
    });
  };

  return (
    <div className="space-y-6">
      {filteredRaces.map(race => (
        <div key={race.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold">{race.track}</h3>
                <p className="text-sm text-gray-600">
                  Race {race.raceNumber} • {race.raceType} • {race.distance}
                </p>
                <p className="text-sm text-gray-600">
                  {format(new Date(race.date), 'MMM d, yyyy h:mm a')}
                </p>
              </div>
              <div className="text-right">
                <span className="text-green-600 font-semibold">{race.prize}</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="text-left py-2">Trap</th>
                  <th className="text-left py-2">Greyhound</th>
                  <th className="text-left py-2">Trainer</th>
                  <th className="text-center py-2">Weight</th>
                  <th className="text-center py-2">Form</th>
                  <th className="text-center py-2" colSpan={6}>Odds</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {race.greyhounds.map(greyhound => (
                  <tr key={greyhound.id} className="hover:bg-gray-50">
                    <td className="py-3 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold">
                        {greyhound.trapNumber}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="font-medium">{greyhound.name}</div>
                    </td>
                    <td className="py-3">{greyhound.trainer}</td>
                    <td className="text-center py-3">{greyhound.weight}</td>
                    <td className="text-center py-3">
                      <span className="font-mono">{greyhound.form}</span>
                    </td>
                    <td className="py-3" colSpan={6}>
                      <div className="grid grid-cols-6 gap-1">
                        {greyhound.odds.back.map((point, idx) => (
                          <button
                            key={`back-${idx}`}
                            onClick={() => handleBackBet(race, { id: greyhound.id, name: greyhound.name }, point)}
                            className="bg-blue-100 hover:bg-blue-200 p-2 rounded transition-colors"
                          >
                            <div className="text-blue-800 font-bold">{point.odds.toFixed(2)}</div>
                            <div className="text-blue-600 text-xs">₹{point.volume}</div>
                          </button>
                        )).reverse()}
                        {greyhound.odds.lay.map((point, idx) => (
                          <button
                            key={`lay-${idx}`}
                            onClick={() => handleLayBet(race, { id: greyhound.id, name: greyhound.name }, point)}
                            className="bg-pink-100 hover:bg-pink-200 p-2 rounded transition-colors"
                          >
                            <div className="text-pink-800 font-bold">{point.odds.toFixed(2)}</div>
                            <div className="text-pink-600 text-xs">₹{point.volume}</div>
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GreyhoundRacingList;
