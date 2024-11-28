import React from 'react';
import { TrendingUp, TrendingDown, Activity, Percent } from 'lucide-react';
import { useBetStore } from '../store/betStore';

const Portfolio: React.FC = () => {
  const { bets, wallet } = useBetStore();

  const stats = {
    totalBets: bets.length,
    activeBets: bets.filter(bet => bet.status === 'pending').length,
    totalStaked: bets.reduce((total, bet) => total + bet.stake, 0),
    totalPotentialWin: bets.reduce((total, bet) => total + bet.potentialWin, 0),
    wonBets: bets.filter(bet => bet.status === 'won').length,
    winRate: bets.length > 0 
      ? (bets.filter(bet => bet.status === 'won').length / bets.length) * 100 
      : 0,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-600 font-medium">Active Bets</h3>
          </div>
          <p className="text-2xl font-semibold">{stats.activeBets}</p>
          <p className="text-sm text-gray-500">
            Total Bets: {stats.totalBets}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-gray-600 font-medium">Total Staked</h3>
          </div>
          <p className="text-2xl font-semibold">
            ₹ {stats.totalStaked.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Potential Win: ₹ {stats.totalPotentialWin.toLocaleString()}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-600 font-medium">Won Bets</h3>
          </div>
          <p className="text-2xl font-semibold">{stats.wonBets}</p>
          <p className="text-sm text-gray-500">
            Lost: {stats.totalBets - stats.wonBets}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Percent className="w-5 h-5 text-green-600" />
            <h3 className="text-gray-600 font-medium">Win Rate</h3>
          </div>
          <p className="text-2xl font-semibold">
            {stats.winRate.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">
            Success Rate
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
