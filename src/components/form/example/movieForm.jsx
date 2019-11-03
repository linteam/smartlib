import React from "react";
import Form from "../../form/form";
import { getGenres } from "../../table/example/services/fakeGenreService";
import { getMovies, saveMovie, getMovie } from "../../table/example/services/fakeMovieService";
import Joi from 'joi-browser';

class MovieForm extends Form {
    state = {
        data: { _id:"", title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
        errors: {},
        genres: []
    };

    schema = this.buildSchema(this.state.data);

    constructor() {
        super();
        let genres = [{ _id: "head", name: "All Genres" }, ...getGenres()];
        this.state.genres = genres.map(g => { return { value: g._id, text: g.name } });
        //this.schema['genre'] = Joi.object({ _id: Joi.string().required() , name: Joi.string().required()});
        this.schema['_id'] = Joi.string().allow('');
        this.schema["numberInStock"] = Joi.number().required().max(100).min(0).label("Number in Stock");
        this.schema['dailyRentalRate'] = Joi.number().required().min(0).max(10).label("Rate");
    }


    componentDidMount() {
        let movieId = this.props.match.params.id;
        if (movieId === 'new') return;
        //EDIT MOVIE
        let movie = getMovie(movieId);
        if (movie) {
            //Mapping View
            let { genre, ...data } = movie;
            data.genreId = movie.genre._id;
            this.setState({ data });
        } else {
            return this.props.history.replace('/not-found');
        }
    }

    doSubmit = () => {
        saveMovie(this.state.data);
        console.log("Call the server");
        this.props.history.push('/movies');
    };

    render() {
        return (
            <div>
                <h1>MovieForm</h1>
                <form onSubmit={this.submitHandler}>
                    {this.renderInput("title", "Title", { autoFocus: true })}
                    {this.renderDropDownList("genreId", "Genre",
                        this.state.genres)}
                    {this.renderInput("numberInStock", "Number in Stock")}
                    {this.renderInput("dailyRentalRate", "Rate")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;
