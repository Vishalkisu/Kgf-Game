import React, { useState } from 'react';
import { useBetSlipStore } from '../store/betSlipStore';
import { useWalletStore } from '../store/walletStore';
import { useBetHistoryStore } from '../store/betHistoryStore';
import { X, Wallet, Trash2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const BetSlip: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { selections, removeSelection, updateStake, clearBetSlip, totalStake, totalPotentialWin } = useBetSlipStore();
  const { balance, updateBalance } = useWalletStore();
  const { addBet } = useBetHistoryStore();

  const handlePlaceBet = () => {
    // Validation checks
    if (selections.length === 0) {
      toast.error('Add selections to your bet slip first');
      return;
    }

    if (totalStake === 0) {
      toast.error('Please enter a stake amount');
      return;
    }

    if (totalStake > balance) {
      toast.error('Insufficient balance!');
      return;
    }

    // Process each selection as a separate bet
    selections.forEach(selection => {
      if (!selection.stake || selection.stake <= 0) return;

      const potentialWin = selection.stake * selection.odds;
      
      addBet({
        matchId: selection.matchId,
        matchName: selection.matchName,
        selectionName: selection.selectionName,
        odds: selection.odds,
        stake: selection.stake,
        potentialWin,
        isBack: selection.isBack
      });
    });

    // Update wallet balance
    updateBalance(balance - totalStake);
    
    // Clear bet slip
    clearBetSlip();
    
    // Show success message
    toast.success('Bets placed successfully!');
  };

  if (selections.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Bet Slip</h2>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">
              ₹{balance.toLocaleString()}
            </span>
          </div>
        </div>
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-1">Your bet slip is empty</p>
          <p className="text-sm text-gray-400">
            Select some odds to start betting
          </p>
        </motion.div>
      </motion.div>
    );
  }

  const hasInsufficientBalance = totalStake > balance;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100"
    >
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Bet Slip</h2>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-50 transition-colors"
            >
              {isCollapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearBetSlip}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-50 transition-colors group"
              title="Clear bet slip"
            >
              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-teal-50 to-blue-50 rounded-md border border-teal-100"
            >
              <Wallet className="w-4 h-4 text-teal-600" />
              <span className="text-sm font-medium text-teal-700">
                ₹{balance.toLocaleString()}
              </span>
            </motion.div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1 text-center py-1.5 text-xs font-medium text-teal-700 bg-gradient-to-r from-teal-50 to-blue-50 rounded-md border border-teal-100">
            {selections.length} Selection{selections.length !== 1 ? 's' : ''}
          </div>
          <div className="flex-1 text-center py-1.5 text-xs font-medium text-teal-700 bg-gradient-to-r from-teal-50 to-blue-50 rounded-md border border-teal-100">
            Total Stake: ₹{totalStake.toLocaleString()}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="divide-y divide-gray-100 max-h-[calc(100vh-20rem)] overflow-y-auto"
          >
            {selections.map((selection, index) => (
              <motion.div 
                key={`${selection.matchId}-${selection.selectionName}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div>
                    <p className="font-medium text-gray-900 mb-1">{selection.selectionName}</p>
                    <p className="text-sm text-gray-500">{selection.matchName}</p>
                  </div>
                  <button
                    onClick={() => removeSelection(selection.matchId, selection.selectionName)}
                    className="text-gray-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors group"
                  >
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                <div className="flex items-end justify-between gap-4">
                  <div className="flex-1">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`
                        inline-flex items-center px-2 py-1 rounded-md text-xs font-medium mb-2
                        ${selection.isBack 
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200' 
                          : 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200'}
                      `}
                    >
                      {selection.isBack ? 'Back' : 'Lay'} @ {selection.odds}
                    </motion.div>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={selection.stake || ''}
                        onChange={(e) => updateStake(selection.matchId, selection.selectionName, Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-md text-right text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-shadow duration-200"
                        placeholder="0.00"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        Potential Win: ₹{((selection.stake || 0) * selection.odds).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        layout
        className="p-4 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100"
      >
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Stake</span>
            <span className="font-medium text-gray-900">₹{totalStake.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Potential Win</span>
            <motion.span 
              key={totalPotentialWin}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-medium text-teal-700"
            >
              ₹{totalPotentialWin.toLocaleString()}
            </motion.span>
          </div>
        </div>

        <AnimatePresence>
          {hasInsufficientBalance && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-2 mb-3 bg-gradient-to-r from-red-50 to-red-100 text-red-700 text-sm rounded-md border border-red-200"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Insufficient balance</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePlaceBet}
          disabled={selections.length === 0 || totalStake === 0 || hasInsufficientBalance}
          className="w-full py-2.5 px-4 rounded-md font-medium transition-all duration-200
            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
            enabled:bg-gradient-to-r enabled:from-teal-600 enabled:to-blue-600 enabled:text-white enabled:hover:from-teal-700 enabled:hover:to-blue-700 enabled:shadow-md"
        >
          Place Bet
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default BetSlip;