import axios from 'axios';
import {config} from "@/config";

const qs = require('qs');
const fileDownload = require('js-file-download');

export const userService = {
    login,
    logout,
    makeRequestToAPI: getData,
    getUsernamesFromInputs,
    makeRequestToAPIWithoutAuth,
    isAuthenticatedUser,
    postFormData,
    downloadFile,
    getCurrentUserUsername,
    refreshAccessToken,
    getImage
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
    }).then(response => {
        let token = new Token();
        token.access_token = response.data.access_token;
        token.refresh_token = response.data.refresh_token;
        localStorage.setItem('token', JSON.stringify(token));
    });
}


function getData(mapping, data = "", method = "get") {
    const token = JSON.parse(localStorage.getItem('token'));
    const auth = 'Bearer ' + token.access_token;
    return axios(config.API_URL + mapping, {
        method: method,
        withCredentials: false,
        headers: {'Authorization': auth},
        data: data
    }).then(response => {
        return response.data;
    })
}

function getImage(mapping, data = "") {
    const token = JSON.parse(localStorage.getItem('token'));
    const auth = 'Bearer ' + token.access_token;
    return axios.get(config.API_URL + mapping, {
        withCredentials: false,
        headers: {'Authorization': auth},
        responseType: "arraybuffer"
    }).then(response => {
        return response.data;
    })
}

function postFormData(mapping, formData) {
    const token = JSON.parse(localStorage.getItem('token'));
    const auth = 'Bearer ' + token.access_token;
    return axios.post(config.API_URL + mapping, formData, {
        withCredentials: false,
        headers: {'Authorization': auth, /*'Content-Type': 'multipart/form-data'*/},
    }).then(response => {
        return response.data;
    })
}

function downloadFile(mapping, params = "") {
    const token = JSON.parse(localStorage.getItem('token'));
    const auth = 'Bearer ' + token.access_token;
    return axios.get(config.API_URL + mapping, {
        withCredentials: false,
        headers: {'Authorization': auth},
        params: params,
        responseType: "blob"
    }).then(response => {
        const contentDisposition = response.headers['content-disposition'];
        const regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = regex.exec(contentDisposition);
        if (matches !== null && matches[1]) {
            const fileName = matches[1].replace(/['"]/g, '');
            fileDownload(response.data, fileName);
        }
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

function getCurrentUserUsername() {
    return JSON.parse(localStorage.getItem("user")).username;
}
