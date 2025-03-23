import axios from "axios";
import { useEffect, useState } from "react";

const InstagramApi = () => {
  const [posts, setPosts] = useState([]);
  const options = {
    method: 'GET',
    url: 'https://tiktok-api23.p.rapidapi.com/api/collection/posts',
    params: {
        collectionId: '7442134949027351314',
    count: '30'
    },
    headers: {
      'x-rapidapi-key': '69aab4128dmshbad173bf6e37acbp13deb4jsn019bbbb8bc00', // Reemplaza 'YOUR_API_KEY' con tu clave API válida
      'x-rapidapi-host': 'instagram-scrapper-posts-reels-stories-downloader.p.rapidapi.com'
    }
  };

  const fetchData = async (retries = 3, delay = 1000) => {
    try {
      const response = await axios.request(options);
      
      if (response.data && response.data.items) {
        setPosts(response.data.items); // Asume que los posts están en response.data.items
      } else {
        console.error("No items found in response data");
        console.log("Response data structure:", response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 429 && retries > 0) {
        console.error(`Rate limit exceeded. Retrying in ${delay}ms...`);
        setTimeout(() => fetchData(retries - 1, delay * 2), delay);
      } else if (error.response && error.response.status === 403) {
        console.error("Access forbidden. Please check your API key and permissions.");
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="post">
            <p><strong>{post.user.full_name}</strong>: {post.text}</p>
            <img src={post.user.profile_pic_url} alt={post.user.username} />
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default InstagramApi;
