import { useRouter } from 'next/router';
import styled from 'styled-components';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <Container>
      <NavItem onClick={() => router.push('/')}>Home</NavItem>
      <NavItem onClick={handleLogout}>Logout</NavItem>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  width: 200px;
  background-color: #0070f3;
  padding: 1rem;
  color: white;
`;

const NavItem = styled.div`
  margin-bottom: 1rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
