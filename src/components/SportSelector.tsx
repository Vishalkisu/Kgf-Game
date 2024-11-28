import React from 'react';

interface Sport {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface SportSelectorProps {
  selectedSport: string;
  onSelectSport: (sport: string) => void;
}

const SportSelector: React.FC<SportSelectorProps> = ({ selectedSport, onSelectSport }) => {
  const sports: Sport[] = [
    { id: 'cricket', name: 'Cricket', icon: '🏏', color: 'from-green-500 to-green-600' },
    { id: 'soccer', name: 'Soccer', icon: '⚽', color: 'from-blue-500 to-blue-600' },
    { id: 'tennis', name: 'Tennis', icon: '🎾', color: 'from-yellow-500 to-yellow-600' },
    { id: 'kabaddi', name: 'Kabaddi', icon: '🤼', color: 'from-orange-500 to-orange-600' },
    { id: 'horse-racing', name: 'Horse Racing', icon: '🏇', color: 'from-purple-500 to-purple-600' },
    { id: 'greyhound', name: 'Greyhound', icon: '🐕', color: 'from-red-500 to-red-600' },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Sport</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {sports.map((sport) => (
          <button
            key={sport.id}
            onClick={() => onSelectSport(sport.id)}
            className={`relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
              selectedSport === sport.id
                ? `bg-gradient-to-br ${sport.color} text-white shadow-lg scale-105`
                : 'bg-white hover:bg-gray-50 text-gray-800 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-3xl">{sport.icon}</span>
              <span className="text-sm font-medium">{sport.name}</span>
            </div>
            {selectedSport === sport.id && (
              <div className="absolute top-2 right-2">
                <span className="text-white">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SportSelector;
