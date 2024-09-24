import axios from "axios";
import base_url from "../api.url/api";

let axiosInstance=axios.create({
    baseUrl:base_url
});
export default axiosInstance;