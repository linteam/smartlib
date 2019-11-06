import http from "../../../../services/httpService";
import config from "../../../../config.json";

export function getGenres() {
  //return a promise
  return http.get(config.vidlyEndpoint.genres);
}
