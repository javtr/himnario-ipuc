import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import AlphabetFilter from './components/AlphabetFilter';
import SongList from './components/SongList';
import SongDetail from './components/SongDetail';
const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/javtr/himnario-ipuc/gh-pages/src/data/songs.json';
import './styles/App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLetter, setActiveLetter] = useState('');

  // Cargar canciones al inicio
  useEffect(() => {
    fetch(GITHUB_JSON_URL)
      .then(response => response.json())
      .then(data => {
        setSongs(data);
        setFilteredSongs(data);
      })
      .catch(error => console.error('Error al cargar las canciones:', error));
  }, []);

  // Filtrar canciones cuando cambia el término de búsqueda o la letra activa
  useEffect(() => {
    let result = [...songs];
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(song => 
        song.title.toLowerCase().includes(term) || 
        song.lyrics.toLowerCase().includes(term)
      );
    }
    
    // Filtrar por letra del alfabeto
    if (activeLetter) {
      result = result.filter(song => 
        song.title.toLowerCase().startsWith(activeLetter.toLowerCase())
      );
    }
    
    setFilteredSongs(result);
  }, [searchTerm, activeLetter, songs]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setActiveLetter(''); // Resetear el filtro de letra al buscar
  };

  const handleLetterClick = (letter) => {
    setActiveLetter(letter === activeLetter ? '' : letter);
    setSearchTerm(''); // Resetear la búsqueda al filtrar por letra
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="min-h-screen bg-gray-100">
              <header className="bg-blue-900 text-white shadow-lg">
                <div className="container mx-auto px-4 py-6">
                  <h1 className="text-3xl font-bold text-center mb-6">Himnario IPUC</h1>
                  <div className="max-w-2xl mx-auto">
                    <SearchBar onSearch={handleSearch} />
                    <AlphabetFilter 
                      activeLetter={activeLetter} 
                      onLetterClick={handleLetterClick} 
                    />
                  </div>
                </div>
              </header>
              <main className="container mx-auto px-4 py-8">
                <SongList songs={filteredSongs} />
              </main>
            </div>
          } 
        />
        <Route path="/song/:id" element={<SongDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
