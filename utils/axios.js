import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    // 可以在这里添加其他默认的请求头
    // "Authorization": `Bearer ${jwt}`,
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求被发送之前做一些事情
    console.log('请求拦截器执行:', config);

    // 你可以在这里修改请求的配置，例如添加 token 等

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export default axiosInstance;
