import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import AlphabetFilter from './components/AlphabetFilter';
import SongList from './components/SongList';
import SongDetail from './components/SongDetail';
import './styles/App.css';

const GITHUB_JSON_URL = 'https://javtr.github.io/himnario-ipuc-json/songs.json';

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLetter, setActiveLetter] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  // Cambiar la clase 'dark' en el body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Filtrar duplicados por id
  function removeDuplicateSongs(songsArray) {
    const seen = new Set();
    return songsArray.filter(song => {
      if (seen.has(song.id)) return false;
      seen.add(song.id);
      return true;
    });
  }

  // Función para limpiar el título y obtener la primera letra significativa
  function cleanTitle(title) {
    return title.replace(/^[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+/, '');
  }

  // Función para normalizar texto eliminando signos de puntuación y espacios extra
  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFD').replace(/[ -]/g, '') // Elimina tildes
      .replace(/[\p{P}\p{S}]/gu, '') // Elimina signos de puntuación y símbolos
      .replace(/\s+/g, ' ') // Espacios múltiples a uno solo
      .trim();
  }

  // Cargar canciones al inicio
  useEffect(() => {
    const url = GITHUB_JSON_URL + '?v=' + new Date().getTime();
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar las canciones: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const uniqueSongs = removeDuplicateSongs(data);
          setSongs(uniqueSongs);
          setFilteredSongs(uniqueSongs);
        } else {
          console.error('Los datos no son un array válido:', data);
        }
      })
      .catch(error => {
        console.error('Error al cargar las canciones:', error);
        setSongs([]);
        setFilteredSongs([]);
      });
  }, []);

  // Filtrar canciones cuando cambia el término de búsqueda o la letra activa
  useEffect(() => {
    let result = [...songs];

    if (searchTerm) {
      const term = normalizeText(searchTerm);
      // 1. Títulos que empiezan exactamente con el término
      const byTitleStart = result.filter(song => normalizeText(song.title).startsWith(term));
      // 2. Títulos que contienen la palabra exacta (palabra completa)
      const wordRegex = new RegExp(`\\b${term}\\b`, 'i');
      const byTitleWord = result.filter(song =>
        !byTitleStart.includes(song) && wordRegex.test(normalizeText(song.title))
      );
      // 3. Títulos que contienen el término en cualquier parte
      const byTitleAny = result.filter(song =>
        !byTitleStart.includes(song) &&
        !byTitleWord.includes(song) &&
        normalizeText(song.title).includes(term)
      );
      // 4. Coincidencias por letra
      const byLyrics = result.filter(song =>
        !byTitleStart.includes(song) &&
        !byTitleWord.includes(song) &&
        !byTitleAny.includes(song) &&
        normalizeText(song.lyrics).includes(term)
      );
      result = [...byTitleStart, ...byTitleWord, ...byTitleAny, ...byLyrics];
    }

    // Filtrar por letra del alfabeto
    if (activeLetter) {
      result = result.filter(song =>
        song.title.toLowerCase().startsWith(activeLetter.toLowerCase())
      );
      // Solo ordenar si NO hay búsqueda activa
      if (!searchTerm) {
        result = result.slice().sort((a, b) =>
          cleanTitle(a.title).localeCompare(cleanTitle(b.title), 'es', { sensitivity: 'base' })
        );
      }
    } else {
      // Si no hay letra activa y NO hay búsqueda, ordenar alfabéticamente
      if (!searchTerm) {
        result = result.slice().sort((a, b) =>
          cleanTitle(a.title).localeCompare(cleanTitle(b.title), 'es', { sensitivity: 'base' })
        );
      }
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
            <div className="min-h-screen bg-[#F7FAF7] flex flex-col items-center dark:bg-[#122218] px-3 md:px-0">
              <header className="w-full flex items-center justify-between px-6 pt-8 pb-4 mb-2">
                <h1 className="text-2xl font-bold text-center flex-1 text-gray-600 dark:text-white">Himnario IPUC Bosa Palestina</h1>
                <button
                  onClick={() => setDarkMode(dm => !dm)}
                  className="ml-4 bg-transparent text-gray-700 text-2xl p-2 rounded-full hover:bg-gray-200 transition-colors dark:text-white dark:hover:bg-green-900"
                  aria-label="Cambiar modo oscuro/claro"
                >
                  {darkMode ? (
                    // Luna (SVG plano)
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                    </svg>
                  ) : (
                    // Sol (SVG plano)
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="5" fill="currentColor" />
                      <g stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                      </g>
                    </svg>
                  )}
                </button>
              </header>
              <main className="w-full max-w-md flex flex-col items-center flex-1">
                <SearchBar onSearch={handleSearch} />
                <AlphabetFilter 
                  activeLetter={activeLetter} 
                  onLetterClick={handleLetterClick} 
                />
                <SongList songs={filteredSongs} />
              </main>
              <footer className="w-full text-center py-4 text-gray-400 text-sm dark:text-green-200">© 2024 Himnario IPUC</footer>
            </div>
          } 
        />
        <Route path="/song/:id" element={<SongDetail songs={songs} />} />
      </Routes>
    </Router>
  );
}

export default App;
