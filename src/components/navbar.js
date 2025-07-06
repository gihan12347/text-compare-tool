import React from "react";

export const AcmeLogo = () => {
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
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const NavigationBar = () => {
  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <a
                href="/"
                className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
                aria-label="Go to homepage"
              >
                <div className="relative">
                  <AcmeLogo />
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h1 className="font-bold text-white text-lg sm:text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    TextCompare
                  </h1>
                  <p className="text-xs text-gray-400 hidden sm:block">
                    Compare text with precision
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
