import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@fontsource/inter';
import 'inter-ui/inter.css';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});


function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp