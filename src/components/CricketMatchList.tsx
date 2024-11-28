import React, { useEffect, useState } from 'react';
import { Match, fetchMatches } from '../services/cricketApi';
import { motion } from 'framer-motion';
import OddsDisplay from './OddsDisplay';
import { Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const CricketMatchList: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        const data = await fetchMatches();
        setMatches(data);
        setError(null);
      } catch (err) {
        setError('Failed to load matches');
        console.error('Error loading matches:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
    // Refresh every 30 seconds for live matches
    const interval = setInterval(loadMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {matches.map((match) => (
        <motion.div
          key={match.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          {/* Match Header */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded text-sm ${
                match.isLive ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}>
                {match.isLive ? 'LIVE' : 'Upcoming'}
              </span>
              <span className="text-sm text-gray-600">{match.matchType}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              {format(new Date(match.date), 'MMM d, h:mm a')}
            </div>
          </div>

          {/* Teams and Scores */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="font-semibold mb-1">{match.team1}</div>
              {match.score.team1.runs > 0 && (
                <div className="text-sm">
                  {match.score.team1.runs}/{match.score.team1.wickets}
                  <span className="text-gray-500 text-xs ml-1">
                    ({match.score.team1.overs} ov)
                  </span>
                </div>
              )}
            </div>
            <div className="text-center text-gray-600 flex items-center justify-center">
              vs
            </div>
            <div className="text-center">
              <div className="font-semibold mb-1">{match.team2}</div>
              {match.score.team2.runs > 0 && (
                <div className="text-sm">
                  {match.score.team2.runs}/{match.score.team2.wickets}
                  <span className="text-gray-500 text-xs ml-1">
                    ({match.score.team2.overs} ov)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            {match.venue}
          </div>

          {/* Odds Display */}
          <div className="grid grid-cols-2 gap-4">
            {match.selections.map((selection) => (
              <div key={selection.name}>
                <OddsDisplay
                  selection={selection}
                  matchId={match.id}
                  isLive={match.isLive}
                />
              </div>
            ))}
          </div>

          {/* Match Status */}
          {match.status && (
            <div className="mt-2 text-sm text-gray-600 text-center">
              {match.status}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default CricketMatchList;
