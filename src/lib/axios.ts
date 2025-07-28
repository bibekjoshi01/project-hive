import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';
import { showErrorToast } from '@/utils/notifier';

const noAuthRoutes: string[] = [];

// Constructing the base URL dynamically using environment variables.
export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// Main Axios instance
export const axiosInstance = axios.create({
  baseURL,
});

/**
 * Request Interceptor
 * Adds authorization headers and handles content type dynamically.
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!window.navigator.onLine) {
      showErrorToast('No internet connection available.');
    }

    config.headers = config.headers || {};

    const accessToken = Cookies.get('publicAccessToken');

    // Check if the route is exempt from authentication
    const isExemptRoute = noAuthRoutes.some((path) =>
      config?.url?.endsWith(path),
    );

    if (accessToken && !isExemptRoute) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Set appropriate Content-Type
    if (config?.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Response Interceptor
 * Handles errors, token expiration, and other status codes.
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const errorConfig = error?.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (axios.isCancel(error)) {
      showErrorToast(`Request canceled: ${error.message}`);
    } else if (error.message === 'No Internet') {
      showErrorToast('Please check your internet connection.');
    } else if (error.toJSON().message === 'Network Error') {
      showErrorToast('Network Error.');
    }
    // Handle 401 Unauthorized errors
    else if (error.response?.status === 401) {
      const { store } = await import('./store');
      const { logoutSuccess } = await import('@/app/(public)/(auth)/redux/auth.slice');
      store.dispatch(logoutSuccess());
      showErrorToast('Unauthorized.');
    }
    // Handle other error statuses
    else if (error.response?.status === 403) {
      showErrorToast('Permission denied.');
    } else if (error.response?.status === 404) {
      showErrorToast('Resource not found.');
    } else if (error.response?.status === 405) {
      showErrorToast('Method not allowed.');
    } else if (error.response?.status === 500 || error.response?.status > 500) {
      showErrorToast('Server error, try again later.');
    }

    throw error;
  },
);
