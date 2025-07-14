import React from 'react';

function AlphabetFilter({ activeLetter, onLetterClick }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {alphabet.map((letter) => (
        <button
          key={letter}
          className={`w-8 h-8 flex items-center justify-center rounded-full font-medium transition-colors ${
            activeLetter === letter 
              ? 'bg-blue-700 text-white' 
              : 'bg-white text-blue-700 hover:bg-blue-100'
          }`}
          onClick={() => onLetterClick(letter)}
        >
          {letter}
        </button>
      ))}
      <button 
        className={`px-4 h-8 flex items-center justify-center rounded-full font-medium transition-colors ${
          !activeLetter 
            ? 'bg-blue-700 text-white' 
            : 'bg-white text-blue-700 hover:bg-blue-100'
        }`}
        onClick={() => onLetterClick('')}
      >
        Todas
      </button>
    </div>
  );
}

export default AlphabetFilter;
