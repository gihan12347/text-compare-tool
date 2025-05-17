import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

const CustomModal = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} placement="bottom-center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl font-bold">
              Online Text Compare Tool
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

export default CustomModal;
