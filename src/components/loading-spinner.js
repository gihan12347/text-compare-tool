import React from 'react';
import { Spinner } from "@heroui/react";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center my-4">
            <Spinner label="Comparing..." color="primary" />
        </div>
    );
}

export const LoadingCurtain = ({ show, children }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            {children || (
                <div className="text-white text-xl">Loading...</div>
            )}
        </div>
    );
}

export default LoadingSpinner;