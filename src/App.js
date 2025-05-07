import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/react";
import AlertBanner from './components/alert-banner.js';
import NavigationBar from './components/navbar.js';
import Footer from './components/footer.js';

export default function TextCompare() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [diffMap, setDiffMap] = useState({ text1: [], text2: [] });
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const compareTexts = async () => {
    if (!text1.trim() || !text2.trim()) {
      setIsAlertVisible(true);
      return;
    }
    setIsAlertVisible(false);
    try {
      const res = await axios.post('http://localhost:8380/text-compare-tool/api/compare', {
        text1,
        text2,
      });
      setDiffMap(res.data);
      setIsVisible(true);
    } catch (error) {
      console.error('Error comparing texts:', error);
    }
  };

  const cleanText = async () => {
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
          style={{
            color: 'black',
            backgroundColor,
          }}
        >
          {part.text}
        </span>
      );
    });

  return (
    <>
      <NavigationBar />

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow px-3 md:px-5 py-8">
          {isAlertVisible && (
            <AlertBanner title="Both text fields are required.....!" color="warning" />
          )}
          <div className="flex flex-row gap-4 w-full items-stretch justify-center mb-4">
            <div className="flex w-full">
              <Textarea
                isRequired
                disableAnimation
                disableAutosize
                className="w-full h-60"
                label="Original Text"
                placeholder="Enter your first text"
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
                isRequired
                disableAnimation
                disableAutosize
                className="w-full h-60"
                label="Changed Text"
                placeholder="Enter your second text"
                value={text2}
                onChange={e => {
                  setText2(e.target.value);
                  setIsAlertVisible(false);
                }}
                variant="bordered"
              />
            </div>
          </div>
          <div className="flex gap-4 w-full justify-center mb-4">
            <Button color="success" onClick={compareTexts}>Compare</Button>
            <Button color="success" onClick={cleanText}>Clean</Button>
          </div>
          {isVisible && (
            <div className="flex flex-row gap-4 w-full justify-center mt-8">
              <div className="w-1/2">
                <label className="block text-sm font-medium font-bold mb-2">Original Text (Compared)</label>
                <div className="bg-gray-100 h-60 overflow-auto whitespace-pre-wrap">
                  {renderDiffStream(diffMap.text1)}
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-2">Changed Text (Compared)</label>
                <div className="bg-gray-100 h-60 overflow-auto whitespace-pre-wrap">
                  {renderDiffStream(diffMap.text2)}
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={bottomRef} className="bg-purple-700 text-white py-5 text-center">
          <Footer />
        </div>
      </div>
    </>
  );
}
