import axios from "axios";
import VueSimpleAlert from "vue-simple-alert";

const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === "ECONNABORTED") {
      VueSimpleAlert.fire({
        title: "Oops...",
        text: "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
        type: "error",
      });

      return Promise.reject(error);
    }

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
