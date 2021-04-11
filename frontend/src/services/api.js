import axios from "axios";
import VueSimpleAlert from "vue-simple-alert";

const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    VueSimpleAlert.fire({
      title: "Oops...",
      html: error.response.data.errors
        .map((err) => {
          return `<p>${err}</p>`;
        })
        .join(""),
      type: "error",
    });

    return Promise.reject(error);
  }
);

export default api;
