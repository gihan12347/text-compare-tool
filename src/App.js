import React, { useState } from 'react';
import axios from 'axios';
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/react";
import AlertBanner from './components/alert-banner.js';

export default function TextCompare() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false); // Corrected typo
  const [diffMap, setDiffMap] = useState({ text1: [], text2: [] });

  const compareTexts = async () => {
    if (!text1.trim() || !text2.trim()) {
      setIsAlertVisible(true); // Corrected typo
      return;
    }
    setIsAlertVisible(false); // Corrected typo
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
    setIsAlertVisible(false); // Corrected typo
  }

  const renderDiffStream = (diffArray) =>
    diffArray.map((part, index) => {
      let backgroundColor = part.type === 'insert'
        ? '#008040' // light green
        : part.type === 'delete'
        ? '#FF0000' // light red
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
    <div style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }} className="flex flex-col min-h-screen px-4 md:px-12 py-8 mb-20">
      {isAlertVisible && (<AlertBanner title="Both text fields are required.....!" color="warning"></AlertBanner>)}
      <div className="flex flex-1 flex-row gap-4 w-full items-stretch justify-center">
        <div className="flex w-full" style={{ height: '60vh' }}>
          <Textarea
            isRequired
            disableAnimation
            disableAutosize
            className="w-full h-full"
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
        <div className="flex w-full" style={{ height: '60vh' }}>
          <Textarea
            isRequired
            disableAnimation
            disableAutosize
            className="w-full h-full"
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
      <div className="flex flex-1 flex-row gap-4 w-full items-stretch justify-center">
        <div className="flex flex-wrap gap-4 items-center justify-center mt-8">
          <Button color="success" onClick={compareTexts}>
            Compare
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center mt-8">
          <Button color="success" onClick={cleanText}>
            Clean
          </Button>
        </div>
      </div>
      {isVisible && (<div className="flex flex-row gap-4 w-full justify-center mt-12">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-2 font-bold">Original Text (Compared)</label>
          <div className="bg-gray-100 h-60 overflow-auto" style={{ whiteSpace: 'pre-wrap' }}>
            {renderDiffStream(diffMap.text1)}
          </div>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-2 font-bold">Changed Text (Compared)</label>
          <div className="bg-gray-100 h-60 overflow-auto" style={{ whiteSpace: 'pre-wrap' }}>
            {renderDiffStream(diffMap.text2)}
          </div>
        </div>
      </div>)}    
    </div>
  );
}