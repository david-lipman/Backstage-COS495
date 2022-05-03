const baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://www.getbackstage.xyz";

export default baseURL;
