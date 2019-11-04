import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.interceptors.response.use(
  success => {
    console.log("Success Interceptor can be used for auditing");
    return Promise.resolve(success);
  },
  error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500;
    if (!expectedError) {
      const eventId = logger.log(error); //index.js icinde init ediliyor.
      console.log("Log sent: ", eventId);
      toast.error("An unexpected error occurred"); //Asagidaki sekilde de kullanimi mumkun
      //toast("An unexpected error occurred");
    }
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
