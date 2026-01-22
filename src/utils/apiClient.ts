import axios, { AxiosInstance } from 'axios';
import { LOCAL_API_BASE } from '../constants/api.js';

// Get API key from environment variable
const API_KEY = process.env.ADSPOWER_API_KEY || '';

// Create axios instance with default config
export const apiClient: AxiosInstance = axios.create({
    baseURL: LOCAL_API_BASE,
    timeout: 30000,
});

// Add API key to all requests
apiClient.interceptors.request.use((config) => {
    if (API_KEY) {
        // AdsPower LocalAPI requires the API key as a header (lowercase 'api-key')
        config.headers = config.headers || {};
        config.headers['api-key'] = API_KEY;
        
        // Also add as query parameter as fallback
        const params = config.params || {};
        if (params instanceof URLSearchParams) {
            params.set('api_key', API_KEY);
            config.params = params;
        } else {
            params.api_key = API_KEY;
            config.params = params;
        }
    }
    return config;
});

// Handle response errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.data?.msg) {
            throw new Error(error.response.data.msg);
        }
        throw error;
    }
);

