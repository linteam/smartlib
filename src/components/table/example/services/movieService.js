import http from "../../../../services/httpService";
import { vidlyEndpoint } from "../../../../config.json";

const address = vidlyEndpoint.movies;

function getMovieUrl(movieId) {
  return `${address}/${movieId}`;
}

export function getMovies() {
  //return a promise
  return http.get(address);
}

export function getMovie(id) {
  return http.get(getMovieUrl(id));
}

export function saveMovie(movie) {
  let { _id, ...toSave } = { ...movie };
  toSave.numberInStock = parseInt(toSave.numberInStock);
  toSave.dailyRentalRate = parseInt(toSave.dailyRentalRate);
  if (movie._id === "") {
    //new movie
    return http.post(address, toSave);
  } else {
    //update movie
    return http.put(getMovieUrl(movie._id), toSave);
  }
}

export function deleteMovie(id) {
  return http.delete(getMovieUrl(id));
}
