"use client";

import { useCallback, useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import CreateNewProject from "@/components/forms/createProject/CreateNewProject";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "n") {
        event.preventDefault();
        toggleModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <Button onClick={toggleModal}>
          [+] {"\u00A0"} Create New Project
        </Button>
      </main>

      {/* Modal: Create New Project */}
      {isModalOpen && <CreateNewProject isOpen={isModalOpen} onClose={toggleModal} />}
    </>
  );
};

export default Dashboard;
