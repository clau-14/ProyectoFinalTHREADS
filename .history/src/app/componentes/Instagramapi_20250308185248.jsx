import axios from "axios";
import { useEffect } from "react";

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

async function fetchData(retries = 3, delay = 1000) {
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
}

useEffect(() => {
  fetchData();
}, []);

export default inss;