import axios from "axios";
import { useEffect } from "react";

const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://instagram230.p.rapidapi.com/post/comments',
  params: {
    pk: '3142351097879579233'
  },
  headers: {
    'x-rapidapi-key': 'Sign Up for Key',
    'x-rapidapi-host': 'instagram230.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
}

fetchData();