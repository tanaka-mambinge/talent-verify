const env = process.env.NODE_ENV;
export const BASE_API_URL = env == "development" ? "http://127.0.0.1:8000" : "";
