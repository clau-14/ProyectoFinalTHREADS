import axios from "axios";
import { useEffect } from "react";

const FetchComments = () => {
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "https://instagram230.p.rapidapi.com/post/comments?",
          {
            headers: {
              "x-rapidapi-host": "instagram230.p.rapidapi.com",
              "x-rapidapi-key": "3142351097879579233",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener los comentarios:", error);
      }
    };

    fetchComments();
  }, []);

  return <div>Revisa la consola para ver los comentarios.</div>;
};

export default FetchComments;
