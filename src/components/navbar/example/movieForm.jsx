import React from "react";
import Form from "../../form/form";
import { getGenres } from "../../table/example/services/fakeGenreService";
import Joi from 'joi-browser';

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: []
  };

  schema = this.buildSchema(this.state.data);

  constructor(){
    super();
    let genres = [{ _id: "head", name: "All Genres" }, ...getGenres()];
    this.state.genres = genres.map(g => { return {value: g._id, text: g.name }});
    //this.setState({genres: genres});
    this.schema["numberInStock"] = Joi.number().required().max(100).min(0).label("Number in Stock");
    this.schema['dailyRentalRate'] = Joi.number().required().min(0).max(10).label("Rate");
  }

  componentDidMount(){
    console.log(this.schema);
  }

  doSubmit = () => {
    console.log("Call the server");
  };

  handleSave = () => {
    let address= '/movies?m=' + JSON.stringify(this.state.data);
    console.log('Adres', address );
    /*{
  "title": "deneme",
  "genre": "5b21ca3eeb7f6fbccd471814",
  "numberInStock": "34",
  "rate": "6.8"
}*/

    this.props.history.push(address);
  };

  render() {
    let { match } = this.props;
    return (
      <div>
        <h1>MovieForm {match.params.id === "new" ? "" : match.params.id}</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderInput("title", "Title", { autoFocus: true })}
          {this.renderDropDownList("genreId", "Genre",
          this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save", this.handleSave)}
        </form>
      </div>
    );
  }
}

export default MovieForm;
