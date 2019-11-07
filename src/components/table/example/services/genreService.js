import http from "../../../../services/httpService";
import { vidlyEndpoint } from "../../../../config.json";

export function getGenres() {
  //return a promise
  return http.get(vidlyEndpoint.genres);
}
