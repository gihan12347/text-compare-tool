import React from 'react';
import { AcmeLogo } from './navbar.js';
import { useDisclosure } from "@heroui/react";
import CustomModal from './customModal.js'; 

const Footer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <footer className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10">
            <AcmeLogo />
          </div>
          <div className="flex gap-4 text-sm">
            {/* Replace href with onClick to open modal */}
          <button 
            onClick={onOpen}
            className="text-blue-400 hover:underline"
          >
            About
          </button>
          <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} />
            <a href="/feedback" className="text-blue-400 hover:underline">Feedback</a>
            <a href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</a>
          </div>
        </div>
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} Gihan Kadawathage. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
