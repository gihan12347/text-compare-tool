import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/react";
import AlertBanner from '../components/alert-banner.js';
import NavigationBar from '../components/navbar.js';
import Footer from '../components/footer.js';
import LoadingSpinner, { LoadingCurtain } from '../components/loading-spinner.js';

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

  // Scroll to result when visible
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
      <NavigationBar />
      <LoadingCurtain show={showCurtain}>
        {isLoading && (<LoadingSpinner />)}
      </LoadingCurtain>
      <div className="flex flex-col min-h-screen pt-2 px-3 md:px-5 py-4 bg-white">
        {isAlertVisible && (
          <AlertBanner title="Both text fields are required.....!" color="warning" />
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
          <Footer/>
        </div>
      </div>
    </>
  );
}