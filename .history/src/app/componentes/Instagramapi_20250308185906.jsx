import axios from "axios";
import { useEffect } from "react";

const InstagramApi = () => {
  const options = {
    method: 'GET',
    url: 'https://instagram230.p.rapidapi.com/post/comments',
    params: {
      pk: '3142351097879579233'
    },
    headers: {
      'x-rapidapi-key': 'YOUR_API_KEY', // Reemplaza 'YOUR_API_KEY' con tu clave API válida
      'x-rapidapi-host': 'instagram230.p.rapidapi.com'
    }
  };

  const fetchData = async (retries = 3, delay = 1000) => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
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

  return null
  <div>
  {comments.length > 0 ? (
    comments.map((comment, index) => (
      <div key={index} className="comment">
        <p><strong>{comment.user}</strong>: {comment.text}</p>
      </div>
    ))
  ) : (
    <p>No comments available</p>
  )}
</div>
};

export default InstagramApi;