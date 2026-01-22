import { apiClient } from '../utils/apiClient.js';
import { API_ENDPOINTS } from '../constants/api.js';
import type { GetApplicationListParams } from '../types/application.js';

export const applicationHandlers = {
    async getApplicationList({ size }: GetApplicationListParams) {
        const params = new URLSearchParams();
        if (size) {
            params.set('page_size', size.toString());
        }

        const response = await apiClient.get(API_ENDPOINTS.GET_APPLICATION_LIST, { params });
        if (response.data.code === 0 && response.data.data) {
            return `Application list: ${JSON.stringify(response.data.data.list || [], null, 2)}`;
        }
        throw new Error(`Failed to get application list: ${response.data.msg || 'Unknown error'}`);
    }
}; 