import api from "./api.js";

export const registerApi = async (userData) => {
  try {
    return await api.post("/users/register", userData, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};
export const loginApi = async (userData) => {
  try {
    return await api.post("/users/login", userData, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};
