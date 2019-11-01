import React, { Component } from "react";
import {Link} from 'react-router-dom';
import ListGroup from "../../common/listGroup";
import Table from "../table";
import Like from "../../common/like";
import Pagination from "../../pagination/pagination";
import { getMovies, saveMovie } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import { paginate } from "../../pagination/paginate";
import queryString from 'query-string';
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", orderAs: "asc" }
  };

  columns = [
    { path: "title", label: "Title", content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.handleDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  componentDidMount() {
    //GET parametresi ile yeni film ekleme
    let search = this.props.location.search;
    const { m } = queryString.parse(search);
    if(m){
        let newMovie = JSON.parse(m);
        saveMovie(newMovie);
    }

    /* {"title":"asd","genre":"5b21ca3eeb7f6fbccd471814","numberInStock":"2","dailyRentalRate":"2"}*/
    const genres = [{ _id: "head", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id && (selectedGenre._id != "head")
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.orderAs]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={
              this.state
                .selectedGenre /*selectedItem ve onItemSelect gibi isimlendirmeler uyumlu olmali  .*/
            }
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link className="btn btn-primary" to="/movies/new">Add Movie</Link>
          <p>Showing {totalCount} movies in the database.</p>
          <Table
            columns={this.columns}
            data={movies}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={
              totalCount /*Kac sayfa olacagini belirlemek icin veriyoruz.*/
            }
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
