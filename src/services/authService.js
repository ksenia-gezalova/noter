import axios from "axios";

class authService {
  constructor() {
    if (authService.instance) {
      return authService.instance;
    }
    authService.instance = this;

    return this;
  }

  loginUser(data) {
    return axios.post(`/auth/login`, data);
  }

  logoutUser(token) {
    return axios.post("/auth/logout", null, { headers: { token: token } });
  }

  registerUser(data) {
    return axios.post("/auth/register", data);
  }
}

export default new authService();
