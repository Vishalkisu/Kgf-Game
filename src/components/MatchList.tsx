import React, { useState, useMemo } from 'react';
import { Match } from '../services/sportsApi';
import { Circle, ArrowUpDown, Filter, SortAsc, Clock, Star, Users } from 'lucide-react';
import OddsDisplay from './OddsDisplay';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLoginModal } from '../context/LoginModalContext';

interface MatchListProps {
  matches: Match[];
  selectedLeague: string;
  selectedSport: string;
}

type SortOption = 'time' | 'odds' | 'name';
type FilterOption = 'all' | 'live' | 'upcoming' | 'completed';

const MatchList: React.FC<MatchListProps> = ({ matches, selectedLeague, selectedSport }) => {
  const [sortBy, setSortBy] = useState<SortOption>('time');
  const [filterStatus, setFilterStatus] = useState<FilterOption>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { userId } = useAuth();
  const { showLoginModal } = useLoginModal();

  const filteredAndSortedMatches = useMemo(() => {
    // First apply league filter
    let filtered = selectedLeague === 'all'
      ? matches
      : matches.filter(match => match.league === selectedLeague);

    // Then apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(match => match.status === filterStatus);
    }

    // Sort matches
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'time':
          const timeA = new Date(a.startTime).getTime() || 0;
          const timeB = new Date(b.startTime).getTime() || 0;
          return sortDirection === 'asc' ? timeA - timeB : timeB - timeA;
        
        case 'odds':
          const oddsA = a.markets[0]?.selections[0]?.backOdds[0]?.price || 0;
          const oddsB = b.markets[0]?.selections[0]?.backOdds[0]?.price || 0;
          return sortDirection === 'asc' ? oddsA - oddsB : oddsB - oddsA;
        
        case 'name':
          return sortDirection === 'asc'
            ? a.team1.localeCompare(b.team1)
            : b.team1.localeCompare(a.team1);
        
        default:
          return 0;
      }
    });
  }, [matches, selectedLeague, filterStatus, sortBy, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'text-red-500';
      case 'upcoming':
        return 'text-green-500';
      case 'completed':
        return 'text-gray-500';
      default:
        return 'text-blue-500';
    }
  };

  const formatScore = (score: any) => {
    if (!score) return '';
    if (typeof score === 'string') return score;
    return score;
  };

  const getMatchTime = (startTime: string) => {
    const date = new Date(startTime);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleMatchClick = () => {
    if (!userId) {
      showLoginModal();
      return;
    }
    // Handle match click for logged in users
  };

  if (filteredAndSortedMatches.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No matches available for the selected filters.
      </div>
    );
  }

  return (
    <div>
      {/* Filters and Sort Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-4 mb-6 items-center"
      >
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['all', 'live', 'upcoming', 'completed'] as FilterOption[]).map((status) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${filterStatus === status
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  {status === 'live' && <Circle className="w-2 h-2 mr-2 fill-current text-red-500 animate-pulse" />}
                  {status === 'upcoming' && <Clock className="w-3 h-3" />}
                  {status === 'completed' && <Star className="w-3 h-3" />}
                  {status === 'all' && <Users className="w-3 h-3" />}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-700">
            <SortAsc className="w-4 h-4" />
            <span className="text-sm font-medium">Sort by:</span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                hover:bg-gray-100 transition-colors duration-200"
            >
              <option value="time">Start Time</option>
              <option value="odds">Best Odds</option>
              <option value="name">Team Name</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSortDirection}
              className={`p-2 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 
                transition-colors duration-200 group ${sortDirection === 'desc' ? 'bg-blue-50 border-blue-200' : ''}`}
              title={`Sort ${sortDirection === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              <ArrowUpDown 
                className={`w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-transform duration-200
                  ${sortDirection === 'desc' ? 'transform rotate-180 text-blue-600' : ''}`} 
              />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Match List */}
      <div className="space-y-4">
        {filteredAndSortedMatches.map((match) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={handleMatchClick}
          >
            {/* Match Header */}
            <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">{match.league}</span>
                  <div className="flex items-center mt-1">
                    {match.status === 'live' && (
                      <Circle className="w-2 h-2 mr-2 fill-current text-red-500 animate-pulse" />
                    )}
                    <span className={`text-sm font-medium ${getStatusColor(match.status)}`}>
                      {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500">{getMatchTime(match.startTime)}</span>
            </div>

            {/* Match Content */}
            <div className="p-4">
              {/* Teams and Scores */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{match.team1}</h3>
                  {match.score && (
                    <p className="text-lg font-bold text-gray-900">{formatScore(match.score.team1)}</p>
                  )}
                </div>
                <div className="px-4 text-gray-400 font-medium">VS</div>
                <div className="flex-1 text-right">
                  <h3 className="font-semibold text-gray-800">{match.team2}</h3>
                  {match.score && (
                    <p className="text-lg font-bold text-gray-900">{formatScore(match.score.team2)}</p>
                  )}
                </div>
              </div>

              {/* Markets */}
              {match.markets.map((market) => (
                <div key={market.id} className="space-y-4">
                  <div className="text-sm font-medium text-gray-600">{market.name}</div>
                  
                  {/* Selections */}
                  <div className="space-y-3">
                    {market.selections.map((selection) => (
                      <div key={selection.id} className="space-y-1">
                        <div className="text-sm font-medium text-gray-700">{selection.name}</div>
                        <OddsDisplay
                          matchId={match.id}
                          matchName={`${match.team1} vs ${match.team2}`}
                          selectionName={selection.name}
                          backOdds={selection.backOdds}
                          layOdds={selection.layOdds}
                          disabled={selection.status === 'suspended' || match.status === 'completed'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MatchList;