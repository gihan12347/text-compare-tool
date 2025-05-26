import React, {useState} from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import AlertBanner from './alert-banner.js';

const AboutModal = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} placement="bottom-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl font-bold bg-black text-white">
              About the text compare tool
            </ModalHeader>
            <ModalBody>
              <h3 className="text-lg font-bold mb-2">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Paste your two texts in the "Original Text" and "Compare Text" sections.</li>
                <li>Click the <strong>Compare</strong> button and wait for the response.</li>
                <li><span className="text-red-600">Red</span> highlights show deleted text.</li>
                <li><span className="text-green-600">Green</span> highlights show newly added text.</li>
                <li>Use the <strong>Clean</strong> button to clear both input fields.</li>
              </ol>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const FeedbackModal =  ({ isOpen, onOpenChange }) => {
  const [feedback, seFeedback] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const submitFeedback = async () => {
    if (!feedback.trim()) {
      setIsAlertVisible(true);
      return;
    }
    setIsAlertVisible(false);
    console.log('submit feed back :::::::::: '+ feedback);    
  }

  const clearModal = () => {
    setIsAlertVisible(false);
    seFeedback("");   
  };

  return (
    <Modal isOpen={isOpen} placement="bottom-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl font-bold bg-black text-white">
              Submit your feedbacks
            </ModalHeader>
            <ModalBody>
              <div className="p-2 rounded-b-lg">
                {isAlertVisible && (
                  <AlertBanner title="Feedback can't be empty.....!" color="warning" />
                )}
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Feedback
                </label>
                <input
                  id="feedback"
                  rows="2"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Let us know your thoughts..."
                  value={feedback}
                  onChange={e => {
                    seFeedback(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="mt-3 px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
                  onClick={submitFeedback}>
                  Submit Feedback
                </button>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={clearModal} onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;
