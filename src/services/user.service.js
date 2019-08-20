import axios from 'axios';
import {config} from "@/config";

const qs = require('qs');

export const userService = {
    login,
    logout,
    isAuthenticated,
    makeRequestToAPI: getData,
    getUsernamesFromInputs,
    makeRequestToAPIWithoutAuth
};

class Token {
    access_token;
    refresh_token;
}

function login(username, password) {
    return axios.request({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: "/oauth/token",
        method: "post",
        baseURL: "http://localhost:8080/",
        auth: {
            username: "clientId", // This is the client_id
            password: "clientSecret" // This is the client_secret
        },
        data: qs.stringify({
            "grant_type": "password",
            "username": username,
            "password": password
        })
    }).then(respose => {
        let token = new Token();
        token.access_token = respose.data.access_token;
        token.refresh_token = respose.data.refresh_token;
        localStorage.setItem('token', JSON.stringify(token));
    });
}

function getData(mapping, params = "", method = "get") {
    const user = JSON.parse(localStorage.getItem('token'));
    const basicAuth = 'Bearer ' + user.access_token;
    return axios(config.API_URL + mapping, {
        method: method,
        withCredentials: false,
        headers: {'Authorization': basicAuth},
        params: params
    }).then(response => {
        return response.data;
    })
}

function makeRequestToAPIWithoutAuth(mapping, params = "", method = "get") {
    return axios(config.API_URL + mapping, {
        method: method,
        withCredentials: false,
        params: params
    }).then(response => {
        return response.data;
    })
}

function logout() {
    localStorage.removeItem('token');
}

function isAuthenticated() {
    return localStorage.getItem('token');
}

function getUsernamesFromInputs(inputs) {
    const usernames = [];
    for (let i = 0; i < inputs.length; i++) {
        usernames.push(inputs[i].username);
    }
    return usernames;
}
