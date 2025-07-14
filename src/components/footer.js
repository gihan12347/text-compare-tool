import React, { useState, useEffect } from "react";
import { ChevronUp, ExternalLink } from "lucide-react";
import {AboutModal, FeedbackModal} from "./all-modals";

const AcmeLogo = () => {
  return (
    <svg
      fill="none"
      height="36"
      width="36"
      viewBox="0 0 32 32"
      className="text-white transition-transform duration-300 hover:scale-110"
      aria-label="Acme Logo"
      role="img"
    >
      <title>Acme Logo</title>
      <desc>Logo for Online Text Compare Tool</desc>
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H168453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onOpenChange: setIsOpen,
  };
};

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Manage modal states
  const {
    isOpen: isAboutModalOpen,
    onOpen: onOpenAboutModal,
    onOpenChange: onOpenAboutModalChange,
  } = useDisclosure();

  const {
    isOpen: isFeedBackModalOpen,
    onOpen: onOpenFeedbackModal,
    onOpenChange: onOpenFeedbackModalChange,
  } = useDisclosure();

  // Handle scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40 group"
          aria-label="Scroll to top"
        >
          <ChevronUp
            size={20}
            className="group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </button>
      )}

      <footer
        className="bg-gradient-to-t from-black via-gray-900 to-black border-t border-gray-800 relative overflow-hidden"
        role="contentinfo"
      >
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-transparent to-purple-900/5"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-8">
          {/* Main Footer Content */}
          <div className="flex flex-col items-center gap-6">
            {/* Logo and Brand Section */}
            <div className="flex flex-col items-center gap-3">
              <a
                href="/"
                aria-label="Go to homepage"
                className="group transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <div className="h-12 w-12 flex items-center justify-center">
                    <AcmeLogo />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
              </a>
              <div className="text-center">
                <h3 className="font-bold text-white text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Text Compare Tool
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Compare text with precision and ease
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav aria-label="Footer navigation" className="w-full">
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <a
                  href="/"
                  className="text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105 relative group"
                >
                  <span className="flex items-center gap-1">
                    Home
                    <ExternalLink
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </a>

                <button
                  onClick={onOpenAboutModal}
                  className="text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105 relative group"
                  aria-label="Open About Modal"
                >
                  <span>About</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </button>
                <AboutModal
                  isOpen={isAboutModalOpen}
                  onOpenChange={onOpenAboutModalChange}
                />

                <button
                  onClick={onOpenFeedbackModal}
                  className="text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105 relative group"
                  aria-label="Open Feedback Modal"
                >
                  <span>Feedback</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </button>

                <a
                  href="/privacy-policy"
                  className="text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105 relative group"
                >
                  <span className="flex items-center gap-1">
                    Privacy Policy
                    <ExternalLink
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>
            </nav>

            {/* Separator */}
            <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

            {/* Copyright Section */}
            <div className="text-center space-y-2">
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} All rights reserved - Gihan
                Kadawathage
              </p>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AboutModal
          isOpen={isAboutModalOpen}
          onOpenChange={onOpenAboutModalChange}
        />
        <FeedbackModal
          isOpen={isFeedBackModalOpen}
          onOpenChange={onOpenFeedbackModalChange}
        />
      </footer>
    </>
  );
};

export default Footer;
