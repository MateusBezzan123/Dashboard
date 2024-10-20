import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js'; 
import styled from 'styled-components';
import  Transaction  from '../public/transactions.json';

ChartJS.register(
  CategoryScale, 
  LinearScale,  
  BarElement,
  LineElement,   
  PointElement
);

interface Transaction {
  date: number;
  amount: string;
  transaction_type: 'deposit' | 'withdraw';
  currency: string;
  account: string;
  industry: string;
  state: string;
}

interface ChartsProps {
  transactions: Transaction[]; 
  filters: any;
}

const Charts: React.FC<ChartsProps> = ({ transactions, filters }) => {
  const barData = {
    labels: ['Receitas', 'Despesas'],
    datasets: [
      {
        label: 'Transações',
        data: [3000, 2000],
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
