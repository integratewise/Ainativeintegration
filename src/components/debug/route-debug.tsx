/**
 * Route Debug Component
 * Use this to debug routing issues
 */

import { useState, useEffect } from "react";

export function RouteDebug() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  
  // Update on hash change
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  
  const goToApp = () => {
    console.log("[DEBUG] Navigating to #app");
    window.location.hash = "app";
  };
  
  const goToHome = () => {
    console.log("[DEBUG] Navigating to home (clearing hash)");
    window.location.hash = "";
  };
  
  const isOnAppPage = currentHash === "#app";
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/95 text-white p-4 rounded-lg shadow-2xl font-mono text-xs z-[9999] max-w-md border border-white/20">
      <div className="font-bold mb-3 text-sm flex items-center gap-2">
        <span className="text-2xl">🔍</span>
        <span>Route Debug</span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-start gap-4">
          <span className="text-gray-400 shrink-0">URL:</span>
          <span className="text-green-400 break-all text-right">{window.location.href}</span>
        </div>
        
        <div className="flex justify-between items-center gap-4">
          <span className="text-gray-400 shrink-0">Hash:</span>
          <span className="text-yellow-400 font-bold">
            {currentHash || "(empty)"}
          </span>
        </div>
        
        <div className="flex justify-between items-center gap-4">
          <span className="text-gray-400 shrink-0">Expected:</span>
          <span className="text-blue-400">#app</span>
        </div>
        
        <div className="flex justify-between items-center gap-4">
          <span className="text-gray-400 shrink-0">Status:</span>
          <span className={isOnAppPage ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
            {isOnAppPage ? "✅ ON APP PAGE" : "❌ NOT ON APP"}
          </span>
        </div>
      </div>
      
      {!isOnAppPage && (
        <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded text-yellow-200">
          <div className="font-bold mb-1">⚠️ Not on app page!</div>
          <div className="text-xs">Click "Go to Login" below</div>
        </div>
      )}
      
      {isOnAppPage && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded text-green-200">
          <div className="font-bold mb-1">✅ Routing correct!</div>
          <div className="text-xs">Login page should appear above</div>
        </div>
      )}
      
      <div className="pt-3 border-t border-gray-700">
        <div className="text-gray-400 mb-2 text-xs">Navigation:</div>
        <div className="flex gap-2">
          <button
            onClick={goToApp}
            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-xs font-bold transition-colors"
          >
            🚀 Go to Login
          </button>
          <button
            onClick={goToHome}
            className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white text-xs transition-colors"
          >
            🏠 Go Home
          </button>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-700 text-gray-400 text-[10px]">
        Tip: Check browser console for detailed routing logs
      </div>
    </div>
  );
}