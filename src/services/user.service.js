import axios from 'axios';
import {config} from "@/config";

export const userService = {
    login,
    logout,
    isAuthenticated,
    makeRequestToAPI: getData,
    getUsernamesFromInputs,
    makeRequestToAPIWithoutAuth
};

class User {
    username;
    authdata
}

function login(username, password) {
    var basicAuth = 'Basic ' + btoa(username + ':' + password);
    return axios.get(config.API_URL + '/auth', {
        withCredentials: false,
        headers: {'Authorization': +basicAuth},
        auth: {
            username: username,
            password: password
        }
    }).then(function () {
        const user = new User();
        user.username = username;
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    });
}

function getData(mapping, params = "", method = "get") {
    const user = JSON.parse(localStorage.getItem('user'));
    const basicAuth = 'Basic ' + user.authdata;
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
    localStorage.removeItem('user');
}

function isAuthenticated() {
    return localStorage.getItem('user');
}

function getUsernamesFromInputs(inputs) {
    const usernames = [];
    for (let i = 0; i < inputs.length; i++) {
        usernames.push(inputs[i].username);
    }
    return usernames;
}
