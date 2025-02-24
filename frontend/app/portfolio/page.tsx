'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  BarChart, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft 
} from 'lucide-react';
import { DepositModal } from '@/components/deposit-modal';
import { WithdrawalModal } from '@/components/withdrawal-modal';
import { PriceChart } from '@/components/price-chart';
import { TransactionList } from '@/components/transaction-list';
import { sbtcService } from '@/lib/sbtc-service';
import { formatBTC, formatUSD, calculatePercentageChange } from '@/lib/utils';
import type { Transaction, PortfolioStats } from '@/types/sbtc';

export default function PortfolioPage() {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [stats, setStats] = useState<PortfolioStats>({
    totalBalance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    priceChange24h: 0,
    btcPrice: 0,
    sbtcPrice: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');

        // In a real app, we would get the user's address from their wallet
        const userAddress = localStorage.getItem('stacksAddress');
        if (!userAddress) {
          setError('Please connect your wallet');
          return;
        }

        const [portfolioStats, txHistory] = await Promise.all([
          sbtcService.getPortfolioStats(userAddress),
          sbtcService.getTransactions(userAddress),
        ]);

        setStats(portfolioStats);
        setTransactions(txHistory);
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err);
        setError('Failed to load portfolio data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDepositSuccess = (txId: string) => {
    // Optimistically add the transaction to the list
    const newTx: Transaction = {
      id: txId,
      type: 'deposit',
      amount: 0, // Will be updated when confirmed
      status: 'pending',
      timestamp: new Date().toISOString(),
      txId,
    };
    setTransactions([newTx, ...transactions]);
  };

  const handleWithdrawalSuccess = (requestId: string) => {
    // Optimistically add the transaction to the list
    const newTx: Transaction = {
      id: requestId,
      type: 'withdrawal',
      amount: 0, // Will be updated when confirmed
      status: 'pending',
      timestamp: new Date().toISOString(),
    };
    setTransactions([newTx, ...transactions]);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-gray-500">Loading portfolio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">sBTC Portfolio</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Balance</p>
              <p className="text-2xl font-bold">{formatBTC(stats.totalBalance)}</p>
              {stats.btcPrice && (
                <p className="text-sm text-gray-500">
                  {formatUSD(stats.totalBalance * stats.btcPrice)}
                </p>
              )}
            </div>
            <Wallet className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Deposits</p>
              <p className="text-2xl font-bold">{formatBTC(stats.totalDeposits)}</p>
            </div>
            <ArrowUpRight className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Withdrawals</p>
              <p className="text-2xl font-bold">{formatBTC(stats.totalWithdrawals)}</p>
            </div>
            <ArrowDownLeft className="h-8 w-8 text-red-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">24h Change</p>
              <p className="text-2xl font-bold">{calculatePercentageChange(stats.sbtcPrice || 0, (stats.sbtcPrice || 0) * (1 - stats.priceChange24h / 100))}</p>
            </div>
            <LineChart className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-8">
        <Button onClick={() => setIsDepositModalOpen(true)}>
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Deposit BTC
        </Button>
        <Button 
          variant="outline"
          onClick={() => setIsWithdrawalModalOpen(true)}
          disabled={stats.totalBalance === 0}
        >
          <ArrowDownLeft className="mr-2 h-4 w-4" />
          Withdraw sBTC
        </Button>
      </div>

      {/* Price Chart */}
      <div className="mb-8">
        <PriceChart />
      </div>

      {/* Recent Transactions */}
      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        error={error}
      />

      {/* Modals */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onSuccess={handleDepositSuccess}
      />

      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
        onSuccess={handleWithdrawalSuccess}
        maxAmount={stats.totalBalance}
      />
    </div>
  );
} 