import axios from "axios";

const axiosInstance=axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
    },
});

// request interceptor
axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('auth_token');

        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

export default axiosInstance