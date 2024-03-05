'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

const IsClientContext = createContext(false);

export const IsClientProvider = ({ children }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <IsClientContext.Provider value={isClient}>
        {children}
        </IsClientContext.Provider>
    );
};

export function useIsClient() {
    return useContext(IsClientContext);
}
