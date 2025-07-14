import React from 'react';
import { Link } from 'react-router-dom';

function SongList({ songs }) {
  if (songs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No se encontraron canciones que coincidan con tu búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {songs.map((song) => (
        <div key={song.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">{song.title}</h3>
            <div className="text-gray-700 whitespace-pre-line mb-6 line-clamp-3">
              {song.lyrics
                .split('\n')
                // Filtrar líneas vacías
                .filter(line => line.trim())
                // Tomar las primeras 3 líneas que no sean solo signos de puntuación
                .filter(line => !/^[^\w¡¿]+$/.test(line.trim()))
                .slice(0, 3)
                .map((line, index) => {
                  // Acortar líneas muy largas
                  if (line.length > 60) {
                    return line.substring(0, 57) + '...';
                  }
                  return line;
                })
                .join('\n')}
              {song.lyrics.split('\n').length > 3 && '...'}
            </div>
            <Link 
              to={`/song/${song.id}`}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Ver letra completa
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SongList;
