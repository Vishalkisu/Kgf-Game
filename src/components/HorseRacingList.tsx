import React from 'react';
import { format } from 'date-fns';
import { HorseRace } from '../data/horseRacingData';
import { useBetStore } from '../store/betStore';

interface HorseRacingListProps {
  selectedTrack: string;
  matches: HorseRace[];
}

const HorseRacingList: React.FC<HorseRacingListProps> = ({ selectedTrack, matches }) => {
  const { placeBet } = useBetStore();

  const filteredRaces = selectedTrack === 'all'
    ? matches
    : matches.filter(race => race.racecourse === selectedTrack);

  const handleBetClick = (
    raceId: string,
    horseId: string,
    horseName: string,
    isBack: boolean,
    odds: number,
    index: number
  ) => {
    placeBet({
      id: `${raceId}-${horseId}-${isBack ? 'back' : 'lay'}-${index}`,
      matchId: raceId,
      team: horseName,
      odds,
      isBack,
      sport: 'horseRacing',
      eventName: `${horseName} (${isBack ? 'Back' : 'Lay'})`
    });
  };

  return (
    <div className="space-y-6">
      {filteredRaces.map(race => (
        <div key={race.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold">{race.racecourse}</h3>
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
                  <th className="text-left py-2">Horse</th>
                  <th className="text-left py-2">Jockey</th>
                  <th className="text-left py-2">Trainer</th>
                  <th className="text-center py-2">Age</th>
                  <th className="text-center py-2">Weight</th>
                  <th className="text-center py-2" colSpan={3}>Back</th>
                  <th className="text-center py-2" colSpan={3}>Lay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {race.horses.map(horse => (
                  <tr key={horse.id} className="hover:bg-gray-50">
                    <td className="py-3">
                      <div className="font-medium">{horse.name}</div>
                    </td>
                    <td className="py-3">{horse.jockey}</td>
                    <td className="py-3">{horse.trainer}</td>
                    <td className="text-center py-3">{horse.age}y</td>
                    <td className="text-center py-3">{horse.weight}</td>
                    {horse.odds.back.map((point, index) => (
                      <td key={`back-${index}`} className="py-2 px-1">
                        <button
                          onClick={() => handleBetClick(race.id, horse.id, horse.name, true, point.odds, index)}
                          className="w-full bg-blue-100 hover:bg-blue-200 p-2 rounded text-center"
                        >
                          <div className="font-semibold">{point.odds}</div>
                          <div className="text-xs text-gray-600">₹{point.volume}</div>
                        </button>
                      </td>
                    ))}
                    {horse.odds.lay.map((point, index) => (
                      <td key={`lay-${index}`} className="py-2 px-1">
                        <button
                          onClick={() => handleBetClick(race.id, horse.id, horse.name, false, point.odds, index)}
                          className="w-full bg-pink-100 hover:bg-pink-200 p-2 rounded text-center"
                        >
                          <div className="font-semibold">{point.odds}</div>
                          <div className="text-xs text-gray-600">₹{point.volume}</div>
                        </button>
                      </td>
                    ))}
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

export default HorseRacingList;
