import {userService} from "@/services/UserService";

export const chatService = {
    addMessageToList,
    appendPastMessages
};

function addMessageToList(text, isFromCurrentUser, toBegin = true) {
    const messageList = document.getElementById("messageList");
    const node = document.createElement("li");
    node.className = "list-group-item";

    if (isFromCurrentUser) {
        node.style.textAlign = "right";
        node.style.color = "red";
    } else {
        node.style.textAlign = "left";
    }
    const textNode = document.createTextNode(text);
    node.appendChild(textNode);
    if (toBegin) {
        messageList.insertBefore(node, messageList.firstChild);
    } else {
        messageList.appendChild(node);
    }
}

function appendPastMessages(chatMessages) {
    const currentUserUsername = userService.getCurrentUserUsername();
    for (let i in chatMessages) {
        const message = chatMessages[i];
        if (message.sender.username === currentUserUsername) {
            this.addMessageToList(chatMessages[i].text, true);
        } else {
            this.addMessageToList(chatMessages[i].text, false);
        }
    }
}
