import styled from 'styled-components';


interface CardProps {
  title: string;
  value: number | string;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <CardContainer>
      <h3>{title}</h3>
      <p>{value}</p>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
  }
  p {
    margin: 0.5rem 0 0;
    font-size: 1.5rem;
    color: #0070f3;
  }
`;
