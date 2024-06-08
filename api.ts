import axios from 'axios';

const API_URL = 'https://path.to.mock.api/endpoint';  // Replace with actual URL

export const fetchData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching data", error);
        throw error;
    }
};
