import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Textarea } from "@heroui/input";
import AlertBanner from "../components/alert-banner.js";
import NavigationBar from "../components/navbar.js";
import Footer from "../components/footer.js";
import LoadingSpinner, {
  LoadingCurtain,
} from "../components/loading-spinner.js";
import { Helmet } from "react-helmet";
import AdComponent from "../components/ad-component.js";

export default function TextCompare() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);
  const [diffMap, setDiffMap] = useState({ text1: [], text2: [] });
  const bottomRef = useRef(null);
  const resultRef = useRef(null);
  const textAreaRef1 = useRef(null);
  const textAreaRef2 = useRef(null);

  useEffect(() => {
    if (isVisible && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isVisible]);

  const resizeTextareas = () => {
    const resize = (el) => {
      if (el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
      }
    };
    resize(textAreaRef1.current);
    resize(textAreaRef2.current);
  };

  useEffect(() => {
    resizeTextareas();
  }, [text1, text2]);

  const compareTexts = async () => {
    if (!text1.trim() || !text2.trim()) {
      setIsAlertVisible(true);
      return;
    }
    setIsAlertVisible(false);
    setIsLoading(true);
    setShowCurtain(true);
    try {
      const res = await axios.post(
        "https://text-compare-tool-1071342381187.us-central1.run.app/text-compare-tool/api/compare",
        {
          text1,
          text2,
        }
      );
      setDiffMap(res.data);
      setIsVisible(true);
    } catch (error) {
      console.error("Error comparing texts:", error);
    } finally {
      setIsLoading(false);
      setShowCurtain(false);
    }
  };

  const cleanText = () => {
    setText1("");
    setText2("");
    setIsVisible(false);
    setIsAlertVisible(false);
  };

  const renderDiffStream = (diffArray) =>
    diffArray.map((part, index) => {
      let backgroundColor =
        part.type === "insert"
          ? "#008040"
          : part.type === "delete"
          ? "#FF0000"
          : "transparent";
      return (
        <span key={index} style={{ color: "black", backgroundColor }}>
          {part.text}
        </span>
      );
    });

  return (
    <>
      <Helmet>
        <title>Free Online Text Compare Tool – Instant Diff Checker</title>
        <meta
          name="description"
          content="Use our free online text compare tool to detect and highlight differences. Compare texts easily and instantly with our diff checker online."
        />
        <meta
          name="keywords"
          content="free online text compare tool, online text compare tool, text compare tool, compare online, compare text, textcompare, text compare, diff checker online, free text compare tool, free compare tool, online diff checker"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeonlinetextcomparetool.com/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Free Online Text Compare Tool – Instant Diff Checker"
        />
        <meta
          property="og:description"
          content="Compare two texts online for free using our instant text comparison tool. Detect changes, highlight differences, and review edits with ease."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://freeonlinetextcomparetool.com/"
        />
        <meta
          property="og:image"
          content="https://freeonlinetextcomparetool.com/og-image.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Free Online Text Compare Tool – Instant Diff Checker"
        />
        <meta
          name="twitter:description"
          content="Easily compare texts online and find differences. Try our 100% free online diff checker now."
        />
        <meta
          name="twitter:image"
          content="https://freeonlinetextcomparetool.com/og-image.png"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Free Online Text Compare Tool",
        "url": "https://freeonlinetextcomparetool.com/",
        "image": "https://freeonlinetextcomparetool.com/og-image.png",
        "description": "Compare two texts online for free. Detect differences with this instant text compare tool and online diff checker.",
        "applicationCategory": "Utility",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "USD"
        }
      }
    `}
        </script>
      </Helmet>

      <NavigationBar />
      <AdComponent />

      <LoadingCurtain show={showCurtain}>
        {isLoading && <LoadingSpinner />}
      </LoadingCurtain>

      <div className="flex flex-col pt-2 px-3 md:px-5 py-4 bg-white overflow-hidden">
        {isAlertVisible && (
          <AlertBanner title="Both text fields are required!" color="warning" />
        )}

        <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch justify-center mb-4">
          <div className="flex w-full">
            <Textarea
              ref={textAreaRef1}
              isRequired
              disableAnimation
              className="w-full whitespace-pre-wrap !border-none !outline-none !ring-0 focus:!outline-none focus:!ring-0 bg-white text-sm min-h-[2rem] p-1"
              placeholder="Original Text"
              value={text1}
              onChange={(e) => {
                setText1(e.target.value);
                setIsAlertVisible(false);
              }}
              variant="bordered"
            />
          </div>

          <div className="flex w-full">
            <Textarea
              ref={textAreaRef2}
              isRequired
              disableAnimation
              className="w-full whitespace-pre-wrap !border-none !outline-none !ring-0 focus:!outline-none focus:!ring-0 bg-white text-sm min-h-[2rem] p-1"
              placeholder="Changed Text"
              value={text2}
              onChange={(e) => {
                setText2(e.target.value);
                setIsAlertVisible(false);
              }}
              variant="bordered"
            />
          </div>
        </div>

        <div className="flex gap-4 w-full justify-center mb-2">
          <button
            onClick={compareTexts}
            disabled={isLoading}
            className={`
      relative overflow-hidden group
      inline-flex items-center justify-center gap-2
      px-8 py-3 min-w-[120px]
      text-white font-semibold text-base
      bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600
      hover:from-blue-600 hover:via-purple-600 hover:to-purple-700
      rounded-xl shadow-lg shadow-purple-500/25
      hover:shadow-xl hover:shadow-purple-500/40
      transform hover:-translate-y-1 hover:scale-105
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-4 focus:ring-purple-500/50
      active:translate-y-0 active:scale-100
      disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
      before:absolute before:inset-0 before:bg-white/10 before:rounded-xl
      before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
    `}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Comparing...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Compare</span>
              </>
            )}
          </button>

          <button
            onClick={cleanText}
            disabled={isLoading}
            className={`
      relative overflow-hidden group
      inline-flex items-center justify-center gap-2
      px-8 py-3 min-w-[120px]
      text-white font-semibold text-base
      bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500
      hover:from-emerald-600 hover:via-green-600 hover:to-teal-600
      rounded-xl shadow-lg shadow-green-500/25
      hover:shadow-xl hover:shadow-green-500/40
      transform hover:-translate-y-1 hover:scale-105
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-4 focus:ring-green-500/50
      active:translate-y-0 active:scale-100
      disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
      before:absolute before:inset-0 before:bg-white/10 before:rounded-xl
      before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
    `}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>Clean</span>
          </button>
        </div>

        {isVisible && (
          <div
            ref={resultRef}
            className="flex flex-col lg:flex-row gap-4 w-full justify-center mt-2"
          >
            <div className="w-full lg:w-1/2">
              <label className="block text-sm font-medium font-bold mb-2">
                Original Text (Compared)
              </label>
              <div className="bg-gray-100 whitespace-pre-wrap p-2">
                {renderDiffStream(diffMap.text1)}
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <label className="block text-sm font-medium mb-2">
                Changed Text (Compared)
              </label>
              <div className="bg-gray-100 whitespace-pre-wrap p-2">
                {renderDiffStream(diffMap.text2)}
              </div>
            </div>
          </div>
        )}

        <div
          ref={bottomRef}
          className="bg-black text-white py-4 text-center mt-4"
        >
          <AdComponent />
          <Footer />
        </div>
      </div>
    </>
  );
}
