import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:7200/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
  
      
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          
          const refreshResponse = await axios.post("/refresh-token", {}, { withCredentials: true });
          
          const { accessToken: newAccessToken } = refreshResponse.data;
  
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token", refreshError);
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );


export default axiosInstance;
