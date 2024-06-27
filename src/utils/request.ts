import { globalRouter } from '@/routes';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { createDiscreteApi } from 'naive-ui';
export const getBaseUrl = () => {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  if (import.meta.env.MODE === 'development') return import.meta.env.VITE_REQUEST_BASEURL + ':9800/qcs/';
  if (import.meta.env.MODE === 'production') return `${protocol}//${hostname}:9800/qcs/`;
  return '';
};

const { message: NMessage } = createDiscreteApi(['message']);

class HttpRequest {
  axiosInstance: AxiosInstance;
  // 初始化拦截器
  initInterceptors() {
    // 请求拦截
    this.axiosInstance.interceptors.request.use(
      config => {
        config.headers.token = window.sessionStorage.getItem('token') ?? '';
        return config;
      },
      error => {
        NMessage.error('网络连接错误' + error);
        return Promise.reject(error);
      },
    );
    // 响应拦截
    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { code, message } = res.data;
        if (code === 200) return Promise.resolve(res.data);
        else {
          if (code === 403)
            globalRouter?.push({ path: '/login', query: { redirect: globalRouter.currentRoute.value.path } });
          NMessage.error(message || '服务已断开！');
          return Promise.reject(res);
        }
      },
      error => {
        NMessage.error('请求超时！' + error);
        return Promise.reject(error);
      },
    );
  }
  constructor(config: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
    this.initInterceptors();
  }
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<T>(config)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}
const httpRequest = new HttpRequest({
  baseURL: getBaseUrl(),
  timeout: 5000,
});
export const request = httpRequest.request.bind(httpRequest) as <T>(
  config: AxiosRequestConfig,
) => Promise<AxiosResponse<T, any>>;
