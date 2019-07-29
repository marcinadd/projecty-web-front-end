import axios from 'axios';

export const userService = {
    login,
    logout,
};

class User {
    username;
    authdata
}

function login(username, password) {
    var session_url = 'http://localhost:8080/auth';
    var basicAuth = 'Basic ' + btoa(username + ':' + password);
    return axios.get(session_url, {
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

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function isAuthenticated() {
    return localStorage.getItem('user');
}
