import {userService} from "@/services/UserService";
import moment from "moment";

export const chatService = {
    addMessageToList,
    appendToPastMessages,
    addElementToInboxList,
    appendToInboxList
};

function addMessageToList(message, isReceived, toBegin = true) {
    const messageList = document.getElementById("msgList");
    const node = document.createElement("div");

    const messageText = document.createElement("p");
    messageText.appendChild(document.createTextNode(message.text));

    const messageDate = document.createElement("span");
    const messageDateText = document.createTextNode(moment(String(message.sendDate)).format('HH:mm DD.MM.YYYY'));
    messageDate.className = "time_date";
    messageDate.appendChild(messageDateText);

    if (isReceived) {
        node.className = "incoming_msg";
        const nodeImgDiv = document.createElement("div");
        nodeImgDiv.className = "incoming_msg_img";
        const nodeImg = document.createElement("img");
        nodeImg.src = "https://ptetutorials.com/images/user-profile.png";
        nodeImgDiv.appendChild(nodeImg);

        const nodeMessage = document.createElement("div");
        nodeMessage.className = "received_msg";

        const nodeWithMsg = document.createElement("div");
        nodeWithMsg.className = "received_withd_msg";

        nodeWithMsg.appendChild(messageText);
        nodeWithMsg.appendChild(messageDate);
        nodeMessage.appendChild(nodeWithMsg);
        node.appendChild(nodeImgDiv);
        node.appendChild(nodeMessage);
    } else {
        node.className = "outgoing_msg";
        const nodeMessage = document.createElement("div");
        nodeMessage.className = "sent_msg";
        nodeMessage.appendChild(messageText);
        nodeMessage.appendChild(messageDate);
        node.appendChild(nodeMessage);
    }

    if (toBegin) {
        messageList.insertBefore(node, messageList.firstChild);
    } else {
        messageList.appendChild(node);
        messageList.scrollTop = node.offsetTop;
    }
}

function appendToPastMessages(chatMessages) {
    const currentUserUsername = userService.getCurrentUserUsername();
    for (let i in chatMessages) {
        const message = chatMessages[i];
        if (message.sender.username === currentUserUsername) {
            this.addMessageToList(chatMessages[i], false);
        } else {
            this.addMessageToList(chatMessages[i], true);
        }
    }
    const msgList = document.getElementById("msgList");
    msgList.scrollTop = msgList.clientHeight;
}

function appendToInboxList(chatMessages, activeUsername) {
    const currentUserUsername = userService.getCurrentUserUsername();
    for (let i in chatMessages) {
        let username;
        if (currentUserUsername === chatMessages[i].recipient.username) {
            username = chatMessages[i].sender.username;
        } else {
            username = chatMessages[i].recipient.username;
        }
        const element = new Map();
        element.text = chatMessages[i].text;
        element.username = username;
        element.date = chatMessages[i].sendDate;
        element.active = username === activeUsername;
        addElementToInboxList(element);
    }
}

function addElementToInboxList(element) {
    const inboxList = document.getElementById("inboxList");

    const node = document.createElement("div");
    node.className = element.active ? "chat_list active_chat" : "chat_list";

    const nodeChatPeople = document.createElement("div");
    nodeChatPeople.className = "chat_people";

    const nodeImgDiv = document.createElement("div");
    nodeImgDiv.className = "chat_img";

    const nodeImg = document.createElement("img");
    nodeImg.src = "https://ptetutorials.com/images/user-profile.png";
    nodeImgDiv.appendChild(nodeImg);

    nodeChatPeople.appendChild(nodeImgDiv);

    const nodeChatIb = document.createElement("div");
    nodeChatIb.className = "chat_ib";

    const nodeH5 = document.createElement("h5");
    nodeH5.appendChild(document.createTextNode(element.username));

    const nodeDate = document.createElement("span");
    const nodeDateText = document.createTextNode(moment(String(element.date)).format('MMM DD'));
    nodeDate.className = "chat_date";
    nodeDate.appendChild(nodeDateText);

    nodeH5.appendChild(nodeDate);

    nodeChatIb.appendChild(nodeH5);

    const nodeMessageText = document.createElement("p");
    nodeMessageText.appendChild(document.createTextNode(element.text));

    nodeChatIb.appendChild(nodeMessageText);

    nodeChatPeople.appendChild(nodeChatIb);

    node.appendChild(nodeChatPeople);

    inboxList.insertBefore(node, inboxList.firstChild);
}
