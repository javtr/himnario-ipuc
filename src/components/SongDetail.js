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
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Himno no encontrado</h2>
          <Link to="/" className="text-blue-600 hover:underline">
            Volver al listado de himnos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto mb-6">
        <Link 
          to="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors"
        >
          Volver al listado
        </Link>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">{song.title}</h1>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="whitespace-pre-wrap font-sans text-gray-800 text-lg leading-relaxed">
              {song.lyrics.split('\n').map((line, index, array) => {
                // Si la línea está vacía, mostramos un salto de línea
                if (!line.trim()) {
                  return <br key={index} />;
                }
                
                // Verificar si la línea es un número romano o la palabra "Coro"
                const isSectionHeader = /^[IVXLCDM]+\.?$/.test(line.trim()) || 
                                     line.trim().toLowerCase() === 'coro';
                
                // Verificar si la línea es un grito o expresión (texto entre signos de exclamación)
                const isShout = /^¡.*!$/.test(line.trim());
                
                // Aplicar estilos según el tipo de línea
                if (isSectionHeader) {
                  return (
                    <div key={index} className="font-bold text-xl text-blue-800 mt-6 mb-2">
                      {line}
                    </div>
                  );
                } else if (isShout) {
                  return (
                    <div key={index} className="font-bold text-blue-700 my-2">
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
    </div>
  );
}

export default SongDetail;
