import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/react";
import AlertBanner from '../components/alert-banner.js';
import NavigationBar from '../components/navbar.js';
import Footer from '../components/footer.js';
import LoadingSpinner, { LoadingCurtain } from '../components/loading-spinner.js';
import { Helmet } from 'react-helmet';

export default function TextCompare() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
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
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isVisible]);

  const resizeTextareas = () => {
    const resize = (el) => {
      if (el) {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
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
      const res = await axios.post('https://text-compare-tool-1071342381187.us-central1.run.app/text-compare-tool/api/compare', {
        text1,
        text2,
      });
      setDiffMap(res.data);
      setIsVisible(true);
    } catch (error) {
      console.error('Error comparing texts:', error);
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
      let backgroundColor = part.type === 'insert'
        ? '#008040'
        : part.type === 'delete'
        ? '#FF0000'
        : 'transparent';
      return (
        <span
          key={index}
          style={{ color: 'black', backgroundColor }}
        >
          {part.text}
        </span>
      );
    });

  return (
    <>
      <Helmet>
        <title>Free Online Text Compare Tool – Fast & Accurate Diff Checker</title>
        <meta
          name="description"
          content="Free online text comparison tool to quickly detect and highlight differences between two text blocks. Secure and easy to use."
        />
        <meta
          name="keywords"
          content="text compare, text diff, diff checker, compare texts, string comparison, text difference tool"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://freeonlinetextcomparetool.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="Free Online Text Compare Tool" />
        <meta
          property="og:description"
          content="Easily find and highlight differences between two blocks of text. Try our free online tool now."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://freeonlinetextcomparetool.com/" />
        <meta
          property="og:image"
          content="https://freeonlinetextcomparetool.com/og-image.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Online Text Compare Tool" />
        <meta
          name="twitter:description"
          content="Quickly detect text differences online. 100% free, private and fast."
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
              "description": "Quickly detect differences between two text blocks online. Free, fast, and secure.",
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

      <LoadingCurtain show={showCurtain}>
        {isLoading && <LoadingSpinner />}
      </LoadingCurtain>

      <div className="flex flex-col min-h-screen pt-2 px-3 md:px-5 py-4 bg-white">
        {isAlertVisible && (
          <AlertBanner title="Both text fields are required!" color="warning" />
        )}

        <div className="flex flex-row gap-4 w-full items-stretch justify-center mb-4">
          <div className="flex w-full">
            <Textarea
              ref={textAreaRef1}
              isRequired
              disableAnimation
              className="w-full whitespace-pre-wrap !border-none !outline-none !ring-0 focus:!outline-none focus:!ring-0 bg-white text-sm min-h-[3rem] p-1"
              placeholder="Original Text"
              value={text1}
              onChange={e => {
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
              className="w-full whitespace-pre-wrap !border-none !outline-none !ring-0 focus:!outline-none focus:!ring-0 bg-white text-sm min-h-[0.5rem] p-1"
              placeholder="Changed Text"
              value={text2}
              onChange={e => {
                setText2(e.target.value);
                setIsAlertVisible(false);
              }}
              variant="bordered"
            />
          </div>
        </div>

        <div className="flex gap-4 w-full justify-center mb-2">
          <Button color="success" onClick={compareTexts}>Compare</Button>
          <Button color="success" onClick={cleanText}>Clean</Button>
        </div>

        {isVisible && (
          <div ref={resultRef} className="flex flex-row gap-4 w-full justify-center mt-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium font-bold mb-2">Original Text (Compared)</label>
              <div className="bg-gray-100 overflow-auto whitespace-pre-wrap p-2">
                {renderDiffStream(diffMap.text1)}
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-2">Changed Text (Compared)</label>
              <div className="bg-gray-100 overflow-auto whitespace-pre-wrap p-2">
                {renderDiffStream(diffMap.text2)}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} className="bg-black text-white py-5 text-center mt-8">
          <Footer />
        </div>
      </div>
    </>
  );
}