import axios from 'axios';
import {BASE_URL} from './config';

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error
      console.error('Axios Error:', error.message);
      console.error(
        'Error Response:',
        error.response?.data || 'No response data',
      );
    } else if (error instanceof Error) {
      // Generic error
      console.error('Generic Error:', error.message);
    } else {
      // Fallback for unknown error
      console.error('Unknown Error:', error);
    }
    return [];
  }
};

export const getProductByCategoryId = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error
      console.error('Axios Error:', error.message);
      console.error(
        'Error Response:',
        error.response?.data || 'No response data',
      );
    } else if (error instanceof Error) {
      // Generic error
      console.error('Generic Error:', error.message);
    } else {
      // Fallback for unknown error
      console.error('Unknown Error:', error);
    }
    return [];
  }
};
