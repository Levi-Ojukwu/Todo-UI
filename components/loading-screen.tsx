'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate app initialization - remove loading after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background grid pattern for visual depth */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#ec2976_1px,transparent_1px),linear-gradient(#ec2976_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Loading content container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Animated spinner circle */}
        <div className="relative w-24 h-24">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#ec2976] border-r-[#ec2976] animate-spin" />

          {/* Middle pulsing ring */}
          <div className="absolute inset-2 rounded-full border-2 border-[#ec2976]/30 animate-pulse" />

          {/* Inner rotating ring (reverse direction) */}
          <div className="absolute inset-4 rounded-full border-3 border-transparent border-b-[#ec2976] opacity-60 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#ec2976] rounded-full animate-pulse" />
          </div>
        </div>

        {/* Loading text with fade animation */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2 animate-fade-in-up">
            TaskFlow
          </h2>
          <p className="text-sm text-slate-400 tracking-widest uppercase animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Initializing Application
          </p>
        </div>

        {/* Animated loading dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className="w-2 h-2 bg-[#ec2976] rounded-full animate-pulse"
              style={{ animationDelay: `${dot * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Gradient blur effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </div>
  );
}
