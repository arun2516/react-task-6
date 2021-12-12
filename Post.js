import React, { Component } from 'react'
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
            userId: "",
            title: "",
            body: "",
        }
    }

    //Create
    createPost = async () => {
        try {
            const { userId, title, body } = this.state;
            const { data } = await axios.post(API_URL, { userId, title, body });
            const post = [...this.state.post];
            post.push(data);
            this.setState({ post, userId: "", title: "", body: "" });
            } catch (err) {
                console.log(err);
            }
    };
    //Read
    getPost = async () => {
        try {
        const {data} = await axios.get(API_URL);
        this.setState({ post: data });
        } catch (err) {
            console.log(err);
        }
    };
    //Update
    updatePost = async () => {
        try {
            const { id, userId, title, body } = this.state;
            const { data } = await axios.put(`${API_URL}/${id}`, { userId, title, body });
            const post = [...this.state.post];
            const index = this.state.post.findIndex((post) => post.id === id);
            post[index] = data;
            this.setState({ post, id: "", userId: "", title: "", body: "" });
            } catch (err) {
                console.log(err);
            }
    };
    //Delete
    deletePost = async (id) => {
        try {
        const {data} = await axios.delete(`${API_URL}/${id}`);
        console.log(data);
        const post =  this.state.post.filter((post) => post.id !== id);
        this.setState({ post });
        } catch (err) {
            console.log(err);
        }
    };

    handleChange = ({ target: {name, value} }) => {
        this.setState({ [name]: value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.id) {
            this.updatePost();
        } else {
        this.createPost();
        }
    }

    editPost = (post) => this.setState({ ...post});

    componentDidMount() {
        this.getPost();
    }

    render() {
        console.log("Rendered!!");
        return (
            <div>
                <h1>Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>UserId: </label>
                        <input type="number" name="userId" value={this.state.userId} onChange={this.handleChange} />
                    </div>
                    <br />
                    <div>
                        <label>Title: </label>
                        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    </div>
                    <br />
                    <div>
                        <label>Body: </label>
                        <input type="text" name="body" value={this.state.body} onChange={this.handleChange} />
                    </div>
                    <br />
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Id</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.post.map((post) => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.userId}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                    <button onClick={() => this.deletePost(post.id)} >Delete</button>
                                    <br />
                                    <button onClick={() => this.editPost(post)} >Edit</button>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Post
