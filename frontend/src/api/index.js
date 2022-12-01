import axios from "axios";

// axios 객체 생성
export default axios.create({
   baseURL: process.env.VUE_APP_API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});
