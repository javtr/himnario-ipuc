import React from 'react';
import { useParams, Link } from 'react-router-dom';
import songsData from '../data/songs.json';

function SongDetail({ songs }) {
  const { id } = useParams();
  // Usar la prop songs si está disponible y tiene datos, si no, usar el archivo local como respaldo
  const dataSource = Array.isArray(songs) && songs.length > 0 ? songs : songsData;
  const song = dataSource.find(song => song.id === parseInt(id));

  if (!song) {
    return (
      <div className="min-h-screen bg-[#F7FAF7] py-12 px-4 flex flex-col items-center justify-center dark:bg-[#122218]">
        <div className="max-w-2xl w-full bg-white rounded-card shadow-md p-8 text-center dark:bg-[#23412F] dark:text-green-200">
          <h2 className="text-2xl font-bold text-red-600 mb-4 dark:text-green-300">Himno no encontrado</h2>
          <Link to="/" className="text-green-700 hover:underline font-semibold dark:text-green-200 dark:hover:text-green-300">
            Volver al listado de himnos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAF7] py-12 px-4 flex flex-col items-center dark:bg-[#122218]">
      <div className="w-full max-w-2xl mx-auto mb-6 flex justify-start">
        <Link 
          to="/" 
          className="inline-block bg-[#E6F2EA] hover:bg-green-100 text-green-700 font-semibold py-2 px-8 rounded-full transition-colors dark:bg-[#2FC47A] dark:text-[#122218] dark:hover:bg-green-300"
        >
          Volver al listado
        </Link>
      </div>
      <div className="max-w-2xl w-full bg-white rounded-card shadow-md p-2 md:p-8 mx-auto dark:bg-[#23412F] dark:text-green-200">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-green-200">{song.title}</h1>
        </div>
        <div className="bg-[#E6F2EA] p-6 rounded-2xl dark:bg-[#2C4C3A]">
          <div className="whitespace-pre-wrap font-sans text-gray-800 text-lg leading-relaxed dark:text-green-200">
            {song.lyrics.split('\n').map((line, index) => {
              if (!line.trim()) {
                return <br key={index} />;
              }
              const isSectionHeader = /^[IVXLCDM]+\.?$/.test(line.trim()) || 
                line.trim().toLowerCase() === 'coro';
              const isShout = /^¡.*!$/.test(line.trim());
              if (isSectionHeader) {
                return (
                  <div key={index} className="font-bold text-xl text-green-700 mt-6 mb-2 dark:text-green-300">
                    {line}
                  </div>
                );
              } else if (isShout) {
                return (
                  <div key={index} className="font-bold text-green-600 my-2 dark:text-green-200">
                    {line}
                  </div>
                );
              } else {
                return <div key={index} className="my-1">{line}</div>;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongDetail;
