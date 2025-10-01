// src/config.js
const isDev = window.location.hostname === "localhost";

const config = {
  apiUrl: isDev
    ? "http://localhost:3000/api"                  // local backend
    : "https://autopost007-7icw.vercel.app/api"   // deployed backend
};

export default config;
