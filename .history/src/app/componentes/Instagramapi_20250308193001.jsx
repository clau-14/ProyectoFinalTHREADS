import axios from "axios";
import { useEffect, useState } from "react";

const InstagramApi = () => {
  const [posts, setPosts] = useState([]);
  const options = {
    method: 'GET',
    url: 'https://instagram230.p.rapidapi.com/user/posts',
    params: {
      username: 'joerogan'
    },
    headers: {
      'x-rapidapi-key': '69aab4128dmshbad173bf6e37acbp13deb4jsn019bbbb8bc00', // Reemplaza 'YOUR_API_KEY' con tu clave API válida
      'x-rapidapi-host': 'instagram230.p.rapidapi.com'
    }
  };

  const fetchData = async (retries = 3, delay = 1000) => {
    try {
      const response = await axios.request(options);
      console.log("Response data:", response.data);
      setPosts(response.data); // Asume que los posts están en response.data
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
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="post">
            <p><strong>{post.user}</strong>: {post.text}</p>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default InstagramApi;