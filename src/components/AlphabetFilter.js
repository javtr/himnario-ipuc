import React from 'react';

function AlphabetFilter({ activeLetter, onLetterClick }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {alphabet.map((letter) => (
        <button
          key={letter}
          className={`w-10 h-7 flex items-center justify-center rounded-lg font-normal text-base shadow-sm transition-colors
            ${activeLetter === letter 
              ? 'bg-[#3B6C54] text-white dark:bg-[#2FC47A] dark:text-[#122218]' 
              : 'bg-gray-200 text-gray-700 hover:bg-green-100 dark:bg-[#23412F] dark:text-green-200 dark:hover:bg-green-900'}
          `}
          onClick={() => onLetterClick(letter)}
        >
          {letter}
        </button>
      ))}
      <button 
        className={`w-16 h-7 flex items-center justify-center rounded-card font-normal text-base shadow-sm transition-colors
          ${!activeLetter 
            ? 'bg-[#3B6C54] text-white dark:bg-[#2FC47A] dark:text-[#122218]' 
            : 'bg-gray-200 text-gray-700 hover:bg-green-100 dark:bg-[#23412F] dark:text-green-200 dark:hover:bg-green-900'}
        `}
        onClick={() => onLetterClick('')}
      >
        Todas
      </button>
    </div>
  );
}

export default AlphabetFilter;
