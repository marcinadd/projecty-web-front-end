import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import {userService} from "@/services/UserService";
import {config} from "@/config";

export {
    SocketService
}

class SocketService {
    endpoint = "";
    subscribeURL = "";
    // this.sessionId = "";
    // stompClient = [];

    constructor(endpoint, subscribeURL) {
        this.endpoint = endpoint;
        this.subscribeURL = subscribeURL;
    }

    connect(messageCallback) {
        const token = JSON.parse(localStorage.getItem('token'));
        const endpoint = config.API_URL + this.endpoint + "?access_token=" + token.access_token;
        var socket = new SockJS(endpoint);
        var stompClient = Stomp.over(socket);
        stompClient.debug = () => {
        };
        var that = this;
        stompClient.connect({}, function () {
            let url = stompClient.ws._transport.url;
            url = url.replace(
                "ws://localhost:8080" + that.endpoint, "");
            url = url.replace("/websocket", "");
            url = url.replace(/^[0-9]+\//, "");
            url = url.replace(/\?.*/, "");
            that.sessionId = url;
            that.stompClient = stompClient;
            that.subscribeSpecific(messageCallback, that.subscribeURL);
            return stompClient;
        });
        socket.onclose = function () {
            setTimeout(function () {
                that.connect(messageCallback)
            }, 5000);
        };
    }

    //
    subscribeSpecific(callback, subscribeURL) {
        this.stompClient.subscribe(subscribeURL, callback);
    }

    sendMessage(recipient, text) {
        const username = userService.getCurrentUserUsername();
        const message = {
            'sender': username,
            'recipient': recipient,
            'text': text
        };
        this.stompClient.send("/app/secured/room", {}, JSON.stringify(message));
    }
}


