import axios from 'axios';
import {config} from "@/config";
import createAuthRefreshInterceptor from "axios-auth-refresh/src";

const qs = require('qs');

export const userService = {
    login,
    logout,
    makeRequestToAPI: getData,
    getUsernamesFromInputs,
    makeRequestToAPIWithoutAuth,
    isAuthenticatedUser
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
        baseURL: config.API_URL,
        auth: {
            username: "clientId",
            password: "clientSecret"
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
        // TODO Save username in local storage
    });
}

const refreshAuthLogic = failedRequest => refreshAccessToken().then(newToken => {
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + newToken;
    return Promise.resolve();
});
createAuthRefreshInterceptor(axios, refreshAuthLogic);

function getData(mapping, params = "", method = "get") {
    const token = JSON.parse(localStorage.getItem('token'));
    const auth = 'Bearer ' + token.access_token;
    return axios(config.API_URL + mapping, {
        method: method,
        withCredentials: false,
        headers: {'Authorization': auth},
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

function refreshAccessToken() {
    const refreshToken = JSON.parse(localStorage.getItem('token')).refresh_token;
    return axios.request({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: "/oauth/token",
        method: "post",
        baseURL: config.API_URL,
        auth: {
            username: "clientId",
            password: "clientSecret"
        },
        data: qs.stringify({
            "grant_type": "refresh_token",
            "refresh_token": refreshToken
        })
    }).then(respose => {
        let token = new Token();
        token.access_token = respose.data.access_token;
        token.refresh_token = respose.data.refresh_token;
        localStorage.setItem('token', JSON.stringify(token));
        return token.access_token;
    });
}

function isAuthenticatedUser() {
    return localStorage.getItem('token') !== null;
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

function getUsernamesFromInputs(inputs) {
    const usernames = [];
    for (let i = 0; i < inputs.length; i++) {
        usernames.push(inputs[i].username);
    }
    return usernames;
}
