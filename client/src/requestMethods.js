import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWUxMDVhYzQ1YTM5OTk2YjE5OTBmYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMDY2ODYyNywiZXhwIjoxNzAwOTI3ODI3fQ.N2Igu4x9FlKAKJAvwu2K00WtoPs2TZK4m5VIEQo1K4I";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
