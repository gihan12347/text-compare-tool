import React from 'react';
import { Alert } from "@heroui/react";

export default function AlertBanner({ title, color }) {
  return (
    <div className="flex items-center justify-center w-full mb-5 px-4">
      <div className="w-full max-w-md">
        <Alert
          color={color || "warning"}
          title={title || "Both text fields are required..."}
          variant="faded"
          classNames={{
            base: "py-1 text-sm", 
            title: "text-sm font-medium",
          }}
        />
      </div>
    </div>
  );
}
