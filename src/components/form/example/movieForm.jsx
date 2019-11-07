import React from "react";
import Form from "../../form/form";
import { getGenres } from "../../table/example/services/genreService";
import { saveMovie, getMovie } from "../../table/example/services/movieService";
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
        this.populateGenres();
        //this.schema['genre'] = Joi.object({ _id: Joi.string().required() , name: Joi.string().required()});
        this.schema['_id'] = Joi.string().allow('');
        this.schema["numberInStock"] = Joi.number().required().max(100).min(0).label("Number in Stock");
        this.schema['dailyRentalRate'] = Joi.number().required().min(0).max(10).label("Rate");
    }

    async populateGenres(){
        let {data : genres} = await getGenres();
        genres = [{ _id: "head", name: "All Genres" }, ...genres];
        this.state.genres = genres.map(g => { return { value: g._id, text: g.name } });
    }

    async populateMovie(){
        try {
            let movieId = this.props.match.params.id;
            if (movieId === 'new') return;
            let {data: movie} = await getMovie(movieId);
            let { genre, ...data } = movie;
            data.genreId = movie.genre._id;
            this.setState({ data });
        } catch (error) {
            if(error.response && error.response.status === 404)
                return this.props.history.replace('/not-found');
        }    
    }

    async componentDidMount() {
          this.populateMovie();
    }

    doSubmit = async () => {         
        await saveMovie(this.state.data);
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
