import jwtDecode from "jwt-decode";
import http from "./httpService";
import { vidlyEndpoint } from "../config.json";

const address = vidlyEndpoint.auth;
const token = "tokenUser";

http.setJwt(getJwt());

export async function login(email, password) {
  let { data: jwt, status } = await http.post(address, {
    email,
    password
  });
  loginWithJwt(jwt);
  return status;
}

export function logout() {
  localStorage.removeItem(token);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(token);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(token, jwt);
}

export function getJwt() {
  return localStorage.getItem(token);
}

export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getJwt
};
