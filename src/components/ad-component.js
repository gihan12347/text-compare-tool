import { useEffect, useRef } from "react";

const AdComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const adContainer = containerRef.current;

    if (!adContainer) return;

    // Clear any previously rendered ads
    adContainer.innerHTML = "";

    // Create a fresh <ins> tag for Google AdSense
    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", "ca-pub-2010341405700903");
    ins.setAttribute("data-ad-slot", "1234567890");
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");

    adContainer.appendChild(ins);

    // Safely push to AdSense queue
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("Adsense push error:", e);
    }
  }, []);

  return <div ref={containerRef} />;
};

export default AdComponent;
