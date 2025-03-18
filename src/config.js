// config.js
const isLocal = process.env.NODE_ENV === "development";
const config = {
  API_BASE_URL: isLocal
    ? "http://localhost:8015/api"
    : "https://nct-frontend-liard.vercel.app",
  RAISE_HAND_ENDPOINT: isLocal
    ? "http://localhost:8015/api/raiseHand"
    : "https://fit.neu.edu.vn/codelab/api/raiseHand",
  API_OJ_BASE_URL: "https://fit.neu.edu.vn/oj",
};

export default config;
