import React, { Component } from "react";
//import "../App.css";
import http from "../httpService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config.json";

class HTTPExample extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    /*
    For http requests ->
    - fetch API
    - jQuery ajax
    - axios
    */
    //pending --> resolved (success) or rejected (failure)
    //const promise = http.get("https://jsonplaceholder.typicode.com/posts");
    //promise.then() yontemi eski yontem bunun yerine kullanilan
    //const response = await promise; //await keyword'unu kullandigimiz metot basina async keywordunu yazmaliyiz.
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    let object = { title: "a", body: "b" };
    //Tum postlari donmez yeni olusturulan post'u doner.
    //Farkli domaine post gittiginde once OPTIONS metodu ile istek gonderir, sonra POST metodu ile ikinci istegi gonderir.
    //GET, POST (to create data), PUT (to update data), DELETE metotlari bilinmeli
    //POST metoduna 201 status code donerse veri olusturuldu demektir.
    let { data: post } = await http.post(config.apiEndpoint, object); //object request payload
    this.setState({ posts: [post, ...this.state.posts] });
  };

  handleUpdate = async post => {
    post.title = "UPDATED " + post.title;
    //PUT tum datayi gunceller, patch belirtilen property'i gunceller.
    //await http.put(`${config.apiEndpoint}/${post.id}`, post);
    let { data } = await http.patch(`${config.apiEndpoint}/${post.id}`, {
      title: post.title
    });
    console.log(data);
    const posts = [...this.state.posts];
    posts[posts.indexOf(post)] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    //delete posts[post.id];
    this.setState({ posts });

    try {
      await http.delete(`${config.apiEndpoint}/${post.id}`);
      //throw new Error("deneme");
    } catch (ex) {
      console.log("hata var");

      //Expected Errors: 404 (not found), 400 (bad request)
      //400 ile baslayan hatalara CLIENT ERRORS denir. Bunlar icin User'a uyari gostermeliyiz.
      if (ex.response && ex.response.status === 404) {
        alert("this post has already deleted");
      }
      //Unexpected Errors: Network is down, server is down, database is down, bug
      //Log them and display generic and friendly error message
      else {
        //Bu kismi interceptore tasidim.
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default HTTPExample;
