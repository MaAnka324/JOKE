import axios, { AxiosInstance } from "axios";

const baseURL = "https://v2.jokeapi.dev/";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export const jokeAPI = {
  async getRandomJoke() {
    try {
      return await instance.get("joke/Any");
    } catch (error) {
      console.error("Error new joke", error);
      throw error;
    }
  },
};
