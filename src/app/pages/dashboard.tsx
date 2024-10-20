import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAfter, isBefore } from 'date-fns';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Charts from '../components/Charts';
import FilterBar from '../components/FilterBar';
import transactionsData from '../public/transactions.json';
import styled from 'styled-components';


interface Transaction {
  date: number;
  amount: string;
  transaction_type: 'deposit' | 'withdraw';
  currency: string;
  account: string;
  industry: string;
  state: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    dateRange: null,
    account: '',
    industry: '',
    state: ''
  });

  const [summary, setSummary] = useState({
    income: 0,
    expenses: 0,
    pending: 0,
    totalBalance: 0
  });

  const transactions: Transaction[] = transactionsData as Transaction[];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    const filteredTransactions = applyFilters(transactions, filters);
    const summaryData = calculateSummary(filteredTransactions);
    setSummary(summaryData);
  }, [filters]);

  const applyFilters = (transactions: Transaction[], filters: any) => {
    const { dateRange, account, industry, state } = filters;
  
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
  
      if (dateRange?.start && isBefore(transactionDate, new Date(dateRange.start))) {
        return false;
      }
      if (dateRange?.end && isAfter(transactionDate, new Date(dateRange.end))) {
        return false;
      }

      if (account && account !== '' && transaction.account !== account) {
        return false;
      }
  
      if (industry && industry !== '' && transaction.industry !== industry) {
        return false;
      }
  
      if (state && state !== '' && transaction.state !== state) {
        return false;
      }
  
      return true;
    });
  };

  const calculateSummary = (transactions: Transaction[]) => {
    return {
      income: transactions
        .filter(t => t.transaction_type === 'deposit')
        .reduce((acc, t) => acc + parseFloat(t.amount) / 100, 0),
      expenses: transactions
        .filter(t => t.transaction_type === 'withdraw')
        .reduce((acc, t) => acc + parseFloat(t.amount) / 100, 0),
      pending: 0,
      totalBalance: 0, 
    };
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <FilterBar filters={filters} setFilters={setFilters} />
        <SummaryCards>
          <Card title="Receitas" value={summary.income} />
          <Card title="Despesas" value={summary.expenses} />
          <Card title="Pendentes" value={summary.pending} />
          <Card title="Saldo Total" value={summary.totalBalance} />
        </SummaryCards>
        <Charts transactions={transactions} filters={filters} />
      </MainContent>
    </Container>
  );
};

export default DashboardPage;

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 1rem;
`;

const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;
