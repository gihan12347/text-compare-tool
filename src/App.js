import React, { useState } from 'react';
import axios from 'axios';
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/react";

export default function TextCompare() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [diffMap, setDiffMap] = useState({ text1: [], text2: [] });

  const compareTexts = async () => {
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
  }

  // const renderDiffStream = (diffArray) =>
  //   diffArray.map((part, index) => {
  //     let color = part.type === 'insert'
  //       ? 'green'
  //       : part.type === 'delete'
  //       ? 'red'
  //       : 'black';
  //     return <span key={index} style={{ color }}>{part.text}</span>;
  //   });

  const renderDiffStream = (diffArray) =>
    diffArray.map((part, index) => {
      let backgroundColor = part.type === 'insert'
        ? '#d1fae5' // light green
        : part.type === 'delete'
        ? '#fee2e2' // light red
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
    <div className="flex flex-col min-h-screen w-screen p-8 m-12">
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
            onChange={e => setText1(e.target.value)}
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
            onChange={e => setText2(e.target.value)}
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
          <label className="block text-sm font-medium mb-2">Original Text (Compared)</label>
          <div className="bg-gray-100 h-60 overflow-auto" style={{ whiteSpace: 'pre-wrap' }}>
            {renderDiffStream(diffMap.text1)}
          </div>
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-2">Changed Text (Compared)</label>
          <div className="bg-gray-100 h-60 overflow-auto" style={{ whiteSpace: 'pre-wrap' }}>
            {renderDiffStream(diffMap.text2)}
          </div>
        </div>
      </div>)}    
    </div>
  );
}
