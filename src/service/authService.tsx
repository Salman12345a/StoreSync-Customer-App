import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@state/storage';
import {useAuthStore} from '@state/authStore';

export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, {phone});
    const {accessToken, refreshToken, customer} = response.data;

    // Store tokens
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);

    // Update user in the auth store
    const {setUser} = useAuthStore.getState();
    setUser(response.data.customer);
  } catch (error: any) {
    // Better error logging
    if (error.response) {
      console.error('Login Error - Response:', error.response.data);
    } else if (error.request) {
      console.error('Login Error - Request:', error.request);
    } else {
      console.error('Login Error - Message:', error.message);
    }
  }
};
