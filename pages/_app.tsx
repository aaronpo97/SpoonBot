import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/ui/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
