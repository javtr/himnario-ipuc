import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar canciones..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
      />
    </div>
  );
}

export default SearchBar;
