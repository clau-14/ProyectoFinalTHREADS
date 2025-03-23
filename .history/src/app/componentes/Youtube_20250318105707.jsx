"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PublicacionBotones from './PublicacionBotones';

function Youtube() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: 'AIzaSyA12wh5xEWsPQJbKtIj9PiHfBkVBb86tEU',
            q: 'reels', //  término de búsqueda según tus necesidades
            part: 'snippet',
            type: 'video',
            maxResults: 10,
          }
        });
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    
    <div className='flex flex-col items-center justify-center gap-10 m-9'>
      {videos.map((video) => (
        <div className='w-full h-full p-20 border-2 rounded-lg pr-10' key={video.id.videoId}>
        <iframe className='w-3/4 h-96  '
          key={video.id.videoId}
          
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
          
          allow=""
          allowFullScreen
        ></iframe>
         <PublicacionBotones
            onLike={() => console.log("Me gusta en el video", video.id.videoId)}
            onComment={() => console.log("Comentar en el video", video.id.videoId)}
            onRepost={() => console.log("Repostear el video", video.id.videoId)}
            onShare={() => console.log("Compartir el video", video.id.videoId)}
          />
        </div>
      ))}
    </div>
  );
}

export default Youtube;