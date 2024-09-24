import {jwtDecode} from "jwt-decode";

function isValidTocken(){
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds
    return decodedToken.exp > currentTime; // token is still valid
  } catch (error) {
    return false; // token is invalid
  }
};

export { isValidTocken };