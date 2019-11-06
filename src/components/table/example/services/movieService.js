import http from "../../../../services/httpService";
import config from "../../../../config.json";

const address = config.vidlyEndpoint.movies;
export function getMovies() {
  //return a promise
  return http.get(address);
}

export function getMovie(id) {
  return http.get(address + "/" + id);
}

export function saveMovie(movie) {
  return http.push(address, movie);
}

export function deleteMovie(id) {
  console.log("Istek gonderilen adres: ", address + "/" + id);
  return http.delete(address + "/" + id);
}
