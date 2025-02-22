"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CreateNewProject from "@/components/forms/createProject/CreateNewProject";

export function KeyboardShortcuts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  // Check if current path starts with /auth/
  const isAuthPage = pathname?.startsWith('/auth/');

  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  useEffect(() => {
    // Don't add the event listener if we're on an auth page
    if (isAuthPage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "n") {
        event.preventDefault();
        toggleModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleModal, isAuthPage]);

  // Don't render the modal if we're on an auth page
  if (isAuthPage) return null;

  return isModalOpen ? (
    <CreateNewProject isOpen={isModalOpen} onClose={toggleModal} />
  ) : null;
}