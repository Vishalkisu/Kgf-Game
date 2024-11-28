import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '../types/wallet';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'text-green-600 bg-green-50';
      case 'FAILED':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction History</h3>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'DEPOSIT' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {transaction.type === 'DEPOSIT' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.type === 'DEPOSIT' ? 'Deposit' : 'Withdrawal'}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.paymentMethod.replace('_', ' ')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  transaction.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'DEPOSIT' ? '+' : '-'}{formatAmount(transaction.amount)}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No transactions yet
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
