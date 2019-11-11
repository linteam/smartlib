import http from "./httpService";
import { vidlyEndpoint } from "../config.json";

const address = vidlyEndpoint.users;

export function register(user) {
  return http.post(address, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
