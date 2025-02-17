'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { useAccount } from 'wagmi';

const Home = () => {
  // const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
  // TODO: Remove lines 13-14 for 15-18
    router.push('/auth/login')
  });
    // isConnected && address
    //   ? router.push('/dashboard')
    //   : router.push('/auth/login');
  // }, [isConnected, address, router]);
  return <></>;
};

export default Home;