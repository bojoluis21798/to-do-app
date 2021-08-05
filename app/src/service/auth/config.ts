import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: 'localhost:3000/api',
});

axiosInstance.interceptors.request.use(config => {
  return (async () => {
    if (!config.headers?.Authorization) {
      try {
        const token = await AsyncStorage.getItem('TOKEN');

        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      } catch (error) {
        delete config.headers.Authorization;
      }
    }

    return config;
  })();
});
