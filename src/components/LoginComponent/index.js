/*
import React, { Component } from 'react';
import './index.css';
import axios from 'axios';
class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        fetch("http://localhost:8090/login",
        {
            headers: {
                 'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({a: 1, b: 2})
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    }


    render() {
        return (



            <div class="container">
                <h1 class="welcome text-center">Welcome to <br /> TCLoans</h1>
                <div class="card card-container">
                    <h2 class='login_title text-center'>Login</h2>
                    <hr />

                    <form class="form-signin" id="form-signin">
                        <span id="reauth-email" class="reauth-email"></span>
                        <p class="input_title">Email</p>
                        <input type="text" id="username" class="login_box" placeholder="rootuser@tcloans.com" required />
                        <p class="input_title">Password</p>
                        <input type="password" id="password" class="login_box" placeholder="******" required />
                        <button class="btn btn-lg btn-primary" type="submit" onClick={(event) => this.handleClick(event)}>Login</button>
                    </form>
                </div>
            </div>)
    }
}
export default LoginComponent;*/
