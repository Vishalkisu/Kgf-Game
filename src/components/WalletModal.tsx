import React, { useState } from 'react';
import { useWalletStore } from '../store/walletStore';
import { useBetSlipStore } from '../store/betSlipStore';
import { toast } from 'react-hot-toast';
import { Wallet, X, ArrowDownRight, ArrowUpRight, History, XCircle, Clock, TrendingUp, Smartphone, CreditCard, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking';

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'history'>('deposit');
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const { 
    balance, 
    deposit, 
    withdraw,
    currency: curr,
    ...walletStore 
  } = useWalletStore();
  const { totalStake } = useBetSlipStore();

  const currency = '₹';

  const paymentMethods = [
    { id: 'upi' as PaymentMethod, name: 'UPI', icon: <Smartphone className="w-6 h-6" /> },
    { id: 'card' as PaymentMethod, name: 'Card', icon: <CreditCard className="w-6 h-6" /> },
    { id: 'netbanking' as PaymentMethod, name: 'Net Banking', icon: <Building2 className="w-6 h-6" /> },
  ];

  const quickAmounts = [500, 1000, 2000, 5000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amount);
    
    if (isNaN(value) || value <= 0 || !selectedPaymentMethod) {
      toast.error('Please enter a valid amount and select a payment method');
      return;
    }

    if (activeTab === 'withdraw') {
      const availableBalance = balance - totalStake;
      if (value > availableBalance) {
        toast.error(`Cannot withdraw ${currency}${value.toLocaleString()}. You have ${currency}${totalStake.toLocaleString()} in pending bets.`);
        return;
      }
    }

    try {
      if (activeTab === 'deposit') {
        await deposit(value, selectedPaymentMethod!);
        toast.success(`Successfully deposited ${currency}${value.toLocaleString()}`);
      } else {
        await withdraw(value, selectedPaymentMethod!);
        toast.success(`Successfully withdrew ${currency}${value.toLocaleString()}`);
      }
      setAmount('');
      setSelectedPaymentMethod(null);
    } catch (error) {
      toast.error('Transaction failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  const availableBalance = balance - totalStake;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative transition-all duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:rotate-90 transform"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="bg-orange-100 p-3 rounded-xl mr-4">
            <Wallet className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Wallet</h2>
            <p className="text-sm text-gray-600">Manage your funds securely</p>
          </div>
        </div>

        {/* Balance Display */}
        <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-400 rounded-xl p-6 mb-8 text-white">
          <p className="text-sm opacity-90 mb-2">Available Balance</p>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">₹{balance.toLocaleString()}</span>
            <span className="ml-2 text-sm opacity-90">INR</span>
          </div>
          {totalStake > 0 && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center opacity-90">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Pending Bets:</span>
                </div>
                <span>₹{totalStake.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <div className="flex items-center opacity-90">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>Available:</span>
                </div>
                <span>₹{availableBalance.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex mb-8 bg-gray-100/80 rounded-xl p-1.5 backdrop-blur-sm">
          {[
            { id: 'deposit', icon: ArrowDownRight, label: 'Deposit' },
            { id: 'withdraw', icon: ArrowUpRight, label: 'Withdraw' },
            { id: 'history', icon: History, label: 'History' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300
                ${activeTab === id
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-white/50'
                }`}
              onClick={() => setActiveTab(id as typeof activeTab)}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </div>
            </button>
          ))}
        </div>

        {activeTab !== 'history' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-center text-sm font-medium text-gray-700">
                Amount
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="block w-full pl-8 pr-12 py-3 text-gray-900 rounded-lg focus:ring-1 focus:ring-orange-200 border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-3">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  type="button"
                  className="px-4 py-3 text-sm font-medium rounded-xl text-orange-700 border border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
                  onClick={() => setAmount(quickAmount.toString())}
                >
                  ₹{quickAmount.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <label className="block text-center text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200
                      ${selectedPaymentMethod === method.id
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
                      }`}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div className={`mb-2 ${selectedPaymentMethod === method.id ? 'text-orange-600' : 'text-gray-600'}`}>
                      {method.icon}
                    </div>
                    <span className="text-sm font-medium">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!amount || !selectedPaymentMethod}
              className={`w-full p-4 rounded-xl text-white font-medium transition-all duration-300 flex items-center justify-center space-x-2
                ${activeTab === 'deposit'
                  ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-orange-400 hover:shadow-lg hover:shadow-orange-500/30'
                  : 'bg-gradient-to-br from-rose-500 via-red-500 to-rose-400 hover:shadow-lg hover:shadow-rose-500/30'
                }
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
              `}
            >
              {activeTab === 'deposit' ? (
                <>
                  <ArrowDownRight className="w-5 h-5" />
                  <span>Deposit {amount && `₹${parseFloat(amount).toLocaleString()}`}</span>
                </>
              ) : (
                <>
                  <ArrowUpRight className="w-5 h-5" />
                  <span>Withdraw {amount && `₹${parseFloat(amount).toLocaleString()}`}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-gray-500 py-8">
              <History className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>Transaction history coming soon!</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WalletModal;
