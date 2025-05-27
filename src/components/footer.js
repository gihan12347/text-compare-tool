import React from 'react';
import { AcmeLogo } from './navbar.js';
import { useDisclosure } from "@heroui/react";
import AboutModal, {FeedbackModal} from './all-modals.js'; 

const Footer = () => {
// useDisclosure() helps manage visibility state cleanly.
// isOpen tracks whether a modal (or similar) is shown.
// onOpen and onOpenChange are used to control that visibility
// useDisclosure is function that commonly 
//  to manage the open/close state of modal dialogs, popovers, drawers, etc.
  const { 
    isOpen : isAboutModalOpen, 
    onOpen : onOpenAboutModal, 
    onOpenChange : onOpenAboutModalChange } = useDisclosure();

  const { 
    isOpen : isFeedBackModalOpen, 
    onOpen : onOpenFeedbackModal, 
    onOpenChange : onOpenFeedbackModalChange } = useDisclosure();

  return (
    <footer className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10">
            <AcmeLogo />
          </div>
          <div className="flex gap-4 text-sm">
            <a href="/" className="text-blue-400 hover:underline">Home</a>
            <button onClick={onOpenAboutModal} className="text-blue-400 hover:underline">
              About
            </button>
            <AboutModal isOpen={isAboutModalOpen} onOpenChange={onOpenAboutModalChange} />
            <button onClick={onOpenFeedbackModal} className="text-blue-400 hover:underline">
              Feedback
            </button>
            <FeedbackModal isOpen={isFeedBackModalOpen} onOpenChange={onOpenFeedbackModalChange} />
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
