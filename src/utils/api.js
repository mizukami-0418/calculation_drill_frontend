import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const fetchMessage = async () => {
  try {
    const response = await api.get("/calculation/hello/");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchHello = async () => {
  try {
    const response = await api.get("/calculation/user/");
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// export const fetchQuestions = async (settings) => {
//   const response = await api.post("/calculation/generate_drill/", {
//     body: JSON.stringify(settings),
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch questions");
//   }
//   const data = await response.json();
//   return data.questions;
// };

export const fetchQuestions = async (settings) => {
  try {
    const response = await api.post("/calculation/generate_drill/", settings);
    return response.data.questions;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    throw new Error("Failed to fetch questions");
  }
};

export default api;
