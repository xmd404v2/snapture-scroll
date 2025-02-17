'use client';

import { Header } from '@/components/Header';
import { useState } from 'react';

const Reports = () => {
  const [modal, setModal] = useState(false);

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };
  return (
   <>
    <Header />
    <main className="container mx-auto p-4">
        <br />
        <h1>
            Reports Page
        </h1>
    </main>
    </>
  );
};

export default Reports;