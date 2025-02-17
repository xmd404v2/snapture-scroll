'use client';

import { useState } from 'react';
import { Header } from "@/components/Header";

const Projects = () => {
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
            Projects Page
        </h1>
      </main>
    </>
  );
};

export default Projects;