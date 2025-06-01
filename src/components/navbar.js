import { Navbar } from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <svg
      fill="none"
      height="36"
      width="36"
      viewBox="0 0 32 32"
      className="text-white"
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

export default function NavigationBar() {
  return (
    <Navbar className="bg-black text-white justify-between px-6">
      <div className="flex items-center gap-2">
        <a href="/" className="flex items-center gap-2" aria-label="Go to homepage">
          <AcmeLogo />
          <h1 className="font-bold text-white text-base sm:text-lg">
            Online Text Compare Tool
          </h1>
        </a>
      </div>
      <div className="hidden sm:flex items-center gap-4">
        {/* Add optional nav items here */}
      </div>
    </Navbar>
  );
}
