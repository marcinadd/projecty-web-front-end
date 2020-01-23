import {userService} from "@/services/UserService";

export const chatServiceHelper = {
    getSecondUserUsername(message) {
        const currentUserUsername = userService.getCurrentUserUsername();
        if (message.recipient.hasOwnProperty('username')) {
            return currentUserUsername === message.recipient.username ? message.sender.username : message.recipient.username;
        }
        return currentUserUsername === message.recipient ? message.sender : message.recipient;
    }
};

