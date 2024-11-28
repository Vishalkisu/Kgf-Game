import React from 'react';
import { motion } from 'framer-motion';
import { useBetHistoryStore } from '../store/betHistoryStore';
import { useWalletStore } from '../store/walletStore';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart2, PieChart } from 'lucide-react';

const BetPortfolio: React.FC = () => {
  const { bets } = useBetHistoryStore();
  const { currency } = useWalletStore();

  // Calculate portfolio statistics
  const totalBets = bets.length;
  const totalStaked = bets.reduce((sum, bet) => sum + bet.stake, 0);
  const totalPotentialWin = bets.reduce((sum, bet) => sum + bet.potentialWin, 0);
  const averageStake = totalBets > 0 ? totalStaked / totalBets : 0;
  const averageOdds = totalBets > 0 
    ? bets.reduce((sum, bet) => sum + bet.odds, 0) / totalBets 
    : 0;

  // Count back and lay bets
  const backBets = bets.filter(bet => bet.isBack).length;
  const layBets = bets.filter(bet => !bet.isBack).length;

  const stats = [
    {
      title: 'Total Bets',
      value: totalBets,
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    {
      title: 'Total Staked',
      value: `₹${totalStaked.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-100'
    },
    {
      title: 'Potential Returns',
      value: `₹${totalPotentialWin.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100'
    },
    {
      title: 'Average Stake',
      value: `₹${averageStake.toLocaleString()}`,
      icon: BarChart2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100'
    },
    {
      title: 'Average Odds',
      value: averageOdds.toFixed(2),
      icon: PieChart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-100'
    },
    {
      title: 'Back/Lay Ratio',
      value: `${backBets}/${layBets}`,
      icon: TrendingDown,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Bet Portfolio</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${stat.borderColor} ${stat.bgColor} relative overflow-hidden group`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-lg font-semibold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform`} />
                </div>
              </div>
              <div 
                className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
            </motion.div>
          );
        })}
      </div>

      {totalBets === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500"
        >
          <p>No bets placed yet.</p>
          <p className="text-sm text-gray-400 mt-1">Your betting statistics will appear here.</p>
        </motion.div>
      )}
    </div>
  );
};

export default BetPortfolio;
