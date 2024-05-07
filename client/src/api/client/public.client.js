import axios from "axios";
import queryString from "query-string";

const baseURL = "http://127.0.0.1:5000/api/v1";

//? cấu hình function privateClient
const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params), //? Chuyển chuỗi param thành dạng chuỗi truy vấn (nối nhau không cách không xuống hàng)
  },
});

//? điều chỉnh các yêu cầu gửi từ privateClient trước khi chúng được gửi đi
publicClient.interceptors.request(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  };
});

//? xử lý các phản hồi từ server trước khi chúng được chuyển tiếp cho mã người dùng
publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    throw err.response.error;
  }
);

export default publicClient;
