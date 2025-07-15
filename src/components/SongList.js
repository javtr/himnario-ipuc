import React from 'react';
import { Link } from 'react-router-dom';

function SongList({ songs }) {
  if (songs.length === 0) {
    return (
      <div className="text-center py-12 dark:text-gray-300">
        <p className="text-gray-600 text-lg dark:text-gray-400">No se encontraron canciones que coincidan con tu búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
      {songs.map((song) => (
        <Link
          key={song.id}
          to={`/song/${song.id}`}
          className="rounded-card overflow-hidden shadow-md block bg-[#3B6C54] hover:shadow-lg transition-shadow duration-300 dark:bg-gradient-to-b dark:from-[#23412F] dark:to-[#2C4C3A]"
        >
          <div className="p-4 cursor-pointer flex flex-col justify-end min-h-[60px]">
            <h3 className="text-2xl font-bold text-white mb-2 dark:text-green-200">{song.title}</h3>
            <div className="text-white text-base opacity-90 dark:text-green-200">
              {song.lyrics
                .split('\n')
                .filter(line => line.trim())
                .filter(line => !/^[^\w¡¿]+$/.test(line.trim()))
                .slice(0, 2)
                .map((line, index) => {
                  if (line.length > 60) {
                    return line.substring(0, 57) + '...';
                  }
                  return line;
                })
                .join(' ')}
              {song.lyrics.split('\n').length > 2 && '...'}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SongList;
