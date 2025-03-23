"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VideoPlayer() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://pixabay.com/api/videos/', {
          params: {
            key: '49078974-303e3f0496f0ecc1952e52ddb',
            q: 'music', // Puedes cambiar el término de búsqueda
            video_type: 'all',
            per_page: 5,
            page: 1,
            
          }
        });

       
        
        
        
        
        setVideos(response.data.hits);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center gap-8 '>
      {videos.map((video) => (
        <div className='w-10/12 p-5 border-2 rounded-lg' key={video.id}>
        <video className='w-full h-full object-contain' key={video.id} controls volume="1.0">
          <source  src={video.videos.medium.url} type="video/mp4" />
          
        </video>
        </div>
      ))}
      
    </div>
  );
}

export default VideoPlayer;
