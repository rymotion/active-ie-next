"use client";

import { useEffect, useRef } from 'react';
import Script from 'next/script';

const GofundmeWidget = () => {
  const widgetContainerRef = useRef(null);
  const scriptLoaded = useRef(false);

  // Handle script load
  const handleScriptLoad = () => {
    if (window.gofundme) {
      window.gofundme.initialize();
      scriptLoaded.current = true;
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => {
      // Clean up any previous widget instances
      if (widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* GoFundMe Widget Container */}
      <div ref={widgetContainerRef} className="gofundme-widget-container">
        <div 
          className="gfm-embed" 
          data-url="https://www.gofundme.com/f/axels-eagle-project-bike-ramps-for-rancho-cucamonga/widget/medium?sharesheet=undefined&attribution_id=sl:36c9bb55-d95a-46ce-a8fa-197a857f6dcf"
          style={{
            display: 'flex',
            justifyContent: 'center',
            minHeight: '400px',
            margin: '1rem 0',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          {!scriptLoaded.current && (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-gray-500">Loading fundraiser...</p>
            </div>
          )}
        </div>
      </div>

      {/* GoFundMe Script */}
      <Script
        src="https://www.gofundme.com/static/js/embed.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={(e) => {
          console.error('GoFundMe script failed to load', e);
        }}
      />

      {/* Fallback link */}
      <div className="text-center mt-4">
        <a
          href="https://www.gofundme.com/f/axels-eagle-project-bike-ramps-for-rancho-cucamonga"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View on GoFundMe
          <svg
            className="w-3 h-3 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default GofundmeWidget;
