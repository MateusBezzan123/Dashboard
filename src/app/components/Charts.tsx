import { Bar, Line } from 'react-chartjs-2';
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

interface Filters {
  dateRange: { start: string; end: string } | null;
  account: string;
  industry: string;
  state: string;
}

interface ChartsProps {
  transactions: Transaction[];
  filters: Filters;
}

const Charts: React.FC<ChartsProps> = ({ transactions, filters }) => {
  const barData = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        label: 'Transações',
        data: [
          transactions
            .filter((t) => t.transaction_type === 'deposit')
            .reduce((acc, t) => acc + parseFloat(t.amount) / 100, 0),
          transactions
            .filter((t) => t.transaction_type === 'withdraw')
            .reduce((acc, t) => acc + parseFloat(t.amount) / 100, 0),
        ],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Transações por mês',
        data: [500, 700, 800, 600],
        borderColor: '#0070f3',
        fill: false,
      },
    ],
  };

  return (
    <ChartsContainer>
      <ChartWrapper>
        <Bar data={barData} />
      </ChartWrapper>
      <ChartWrapper>
        <Line data={lineData} />
      </ChartWrapper>
    </ChartsContainer>
  );
};

export default Charts;

const ChartsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 600px;
`;
