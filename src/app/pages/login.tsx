"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard'); 
    } else {
      alert('Credenciais inválidas');
    }
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <LoginBox>
        <h1>Login</h1>
        <Input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <Button onClick={handleLogin}>Entrar</Button>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const LoginBox = styled.div`
  padding: 2rem;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const Input = styled.input`
  margin: 1rem 0;
  padding: 0.75rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.75rem;
  width: 100%;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;
