import React from 'react';
import { AcmeLogo } from './navbar.js'; // Reuse logo

const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-row items-center justify-center gap-4">
        <div className="h-10 w-10">
          <AcmeLogo />
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Gihan Kadawathage. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
