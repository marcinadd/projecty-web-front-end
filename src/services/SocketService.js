import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import {userService} from "@/services/UserService";

export {
    SocketService
}

function SocketService() {
    var that = this;

    that.sessionId = "";
    that.stompClient = [];

    this.connect = function (messageCallback) {
        const token = JSON.parse(localStorage.getItem('token'));
        const endpoint = 'http://localhost:8080/secured/room/?access_token=' + token.access_token;
        var socket = new SockJS(endpoint);
        var stompClient = Stomp.over(socket);

        stompClient.connect({}, function () {
            let url = stompClient.ws._transport.url;
            url = url.replace(
                "ws://localhost:8080/secured/room/", "");
            url = url.replace("/websocket", "");
            url = url.replace(/^[0-9]+\//, "");
            url = url.replace(/\?.*/, "");
            that.sessionId = url;
            that.stompClient = stompClient;
            that.subscribeSpecific(messageCallback);
            return stompClient;
        })
    };

    this.subscribeSpecific = function (callback) {
        that.stompClient.subscribe('/secured/user/queue/specific-user'
            + '-user' + that.sessionId, callback);
    };

    this.sendMessage = function (recipient, text) {
        const username = userService.getCurrentUserUsername();
        const message = {
            'sender': username,
            'recipient': recipient,
            'text': text
        };
        that.stompClient.send("/spring-security-mvc-socket/secured/room", {},
            JSON.stringify(message));
    }
}


