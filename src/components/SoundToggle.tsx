'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSoundManager } from '@/lib/sounds';

export default function SoundToggle() {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const sm = getSoundManager();
    if (!sm) return;
    setMuted(sm.muted);
    return sm.subscribe(setMuted);
  }, []);

  const handleToggle = useCallback(() => {
    getSoundManager()?.toggle();
  }, []);

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-500 group"
      aria-label={muted ? 'Enable sound' : 'Disable sound'}
    >
      <span className="text-[10px] uppercase tracking-[0.15em] text-white hidden md:inline">
        Sound
      </span>

      {/* Animated bars — show activity when unmuted */}
      <span className="flex items-end gap-[2px] h-3 w-4 justify-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-[1.5px] bg-white rounded-full transition-all duration-500"
            style={{
              height: muted ? '3px' : `${6 + i * 3}px`,
              animationName: muted ? 'none' : 'soundBar',
              animationDuration: `${0.4 + i * 0.15}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDirection: 'alternate',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </span>
    </button>
  );
}
