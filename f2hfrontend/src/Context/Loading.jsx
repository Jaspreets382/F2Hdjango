import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // Helper functions to start and stop loading
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
      {/* 2. GLOBAL SPINNER COMPONENT */}
      {loading && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-white/60 backdrop-blur-sm transition-opacity">
          <div className="flex flex-col items-center gap-4">
            {/* Organic Green Spinner matching your theme */}
            <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>
            <p className="text-green-800 font-black animate-pulse uppercase tracking-widest text-xs">
              Fetching Freshness...
            </p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);