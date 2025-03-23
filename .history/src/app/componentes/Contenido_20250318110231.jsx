"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PublicacionBotones from './PublicacionBotones';

const Contenido = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('https://api.pexels.com/v1/search', {
          headers: {
            Authorization: 'HpjjTXJEJ7DvGGPoXex4Qy5ZFCk95zuEGxR8C3UxWCxr6EPDJDzYK9ra',
          },
          params: {
            query: 'all,love,friend,nature',
            per_page: 5,
            page: 1,
            
          },
        });
        setPhotos(response.data.photos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://api.pexels.com/videos/search', {
          headers: {
            Authorization: 'HpjjTXJEJ7DvGGPoXex4Qy5ZFCk95zuEGxR8C3UxWCxr6EPDJDzYK9ra', // Asegúrate de que esta es tu clave de API de Pexels
          },
          params: {
            query: 'comedia',
            per_page: 2, // Número de videos por página
        
          },
        });
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
    fetchPhotos();
  }, []);

  return (
    <div>
      
      <div className=' flex flex-col items-center justify-center gap-5 '>
        {photos.map((photo) => (
          <div className='w-3/5' key={photo.id}>
            <img className='w-full h-full object-contain' src={photo.src.medium} alt={photo.photographer} />
            <p>Fotógrafo: {photo.photographer}</p>
          </div>
           <PublicacionBotones 
           onLike={() => console.log("Me gusta en el video", video.id.videoId)}
           onComment={() => console.log("Comentar en el video", video.id.videoId)}
           onRepost={() => console.log("Repostear el video", video.id.videoId)}
           onShare={() => console.log("Compartir el video", video.id.videoId)}
         />
        ))}
      </div>
      <div className=' relative flex flex-col items-center justify-center gap-7'>
        {videos.map((video) => (
          <div key={video.id} className='w-3/4 h-3/4 p-5 border-2 rounded-lg'>
            <video className='w-2/3 h-2/4 object-contain' controls= "1.0">
              <source src={video.video_files[0].link} type="video/mp4" />
              
            </video>
            <p>Videógrafo: {video.user.name}</p>
           
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default Contenido;


