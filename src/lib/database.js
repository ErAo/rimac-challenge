import { endpoints } from './endpoints.js';
const API = 'https://rimac-front-end-challenge.netlify.app/api/';

const DB = (endpoint) => {
    const defaultHeaders = {
        "Content-Type": "application/json"
    }

    const get = async (id = '') => {
        try {
            const response = await fetch(`${API}${endpoints[endpoint].get(id)}`, {
                method: 'GET',
                headers: defaultHeaders,
            });
            
            const data = await response.json();
    
            return data;
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    };

    return {
        get
    }
}

export { DB, API, endpoints}