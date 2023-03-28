import { useContext } from 'react';
import { AuthContext } from '@/src/contexts/AuthContext';
import { Header } from '@/src/components/Header';
import Head from "next/head"

export default function Dashboard() {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // redirect to login page or show an error message
    return <div>You need to be logged in to access this page.</div>;
  }

  // return the dashboard component
  return (
    <>
    
    <Head>
      <title>Elanto - Dashboard</title>
    </Head>
    
      <Header/>
      <div>
        <h1>Dashboard!</h1>
      </div>
    </>
  );
}
