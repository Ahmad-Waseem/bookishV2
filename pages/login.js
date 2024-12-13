import { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '@/context/AuthContext';


export default function Login() {
  const { login } = useAuth(); //login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const { token, userId, email: userEmail } = await response.json();

      login(token, userId, userEmail);
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Flex
      justify="center"
      align="center"
      height="100vh"
      bg="gray.50"
      padding="4"
    >
      <Box
        width="100%"
        maxWidth="400px"
        bg="white"
        p="6"
        borderRadius="md"
        boxShadow="md"
      >
        <Heading as="h1" size="lg" mb="6" textAlign="center">
          Login
        </Heading>
        <FormControl mb="4" isInvalid={!!error}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && (
            <FormErrorMessage>Email or password is invalid.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        {error && (
          <Text color="red.500" fontSize="sm" mb="4">
            {error}
          </Text>
        )}
        <Button
          colorScheme="teal"
          width="full"
          onClick={handleLogin}
          isDisabled={!email || !password}
        >
          Login
        </Button>
      </Box>
    </Flex>
  );
}
