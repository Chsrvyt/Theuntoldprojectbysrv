import React from 'react';
import { EMOTIONS, Emotion } from '../data';

interface FilterBarProps {
  selectedEmotion: Emotion | 'All';
  onSelect: (emotion: Emotion | 'All') => void;
}

export function FilterBar({ selectedEmotion, onSelect }: FilterBarProps) {
  return (
    <div className="flex overflow-x-auto no-scrollbar items-center md:justify-center gap-2 mb-8 md:mb-12 px-4 -mx-4 md:px-0 md:mx-0 snap-x">
      <button
        onClick={() => onSelect('All')}
        className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[13px] md:text-[14px] transition-all border shrink-0 snap-start ${
          selectedEmotion === 'All'
            ? 'bg-black border-black text-white dark:bg-white dark:border-white dark:text-black'
            : 'bg-transparent border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 dark:text-white'
        }`}
      >
        All Messages
      </button>
      {EMOTIONS.map((emotion) => (
        <button
          key={emotion}
          onClick={() => onSelect(emotion)}
          className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-[13px] md:text-[14px] transition-all border shrink-0 snap-start ${
            selectedEmotion === emotion
              ? 'bg-black border-black text-white dark:bg-white dark:border-white dark:text-black'
              : 'bg-transparent border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 dark:text-white'
          }`}
        >
          {emotion}
        </button>
      ))}
    </div>
  );
}