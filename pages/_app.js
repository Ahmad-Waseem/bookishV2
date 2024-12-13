import Navbar from "@/components/navbar";
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <ChakraProvider>
    <AuthProvider><Navbar/>
      <Component {...pageProps} />
    </AuthProvider>
  </ChakraProvider>;
}


