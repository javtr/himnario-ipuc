import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="mb-6 w-full flex justify-center">
      <input
        type="text"
        placeholder="Buscar en el himnario..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full max-w-md px-5 py-3 rounded-card bg-[#E6F2EA] text-gray-800 placeholder-gray-400 border-none shadow-sm focus:ring-2 focus:ring-green-300 focus:outline-none text-base dark:bg-[#23412F] dark:text-green-200 dark:placeholder-green-300"
      />
    </div>
  );
}

export default SearchBar;
