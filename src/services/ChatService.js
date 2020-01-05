import {userService} from "@/services/UserService";
import moment from "moment";
import {router} from "@/router/router";

export const chatService = {
    addMessageToList,
    appendToPastMessages,
    addElementToInboxList,
    appendToInboxList,
    updateLastMessageWith,
    redirectToLastChat
};

const LAST_MESSAGE_WITH = "lastMessageWith";

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
    for (let i in chatMessages) {
        var message = chatMessages[i].lastMessage;
        let username = getSecondUserUsername(message);
        const element = new Map();
        element.text = message.text;
        element.username = username;
        element.date = message.sendDate;
        element.active = username === activeUsername;
        const unreadMessageCount = chatMessages[i].unreadMessageCount;
        if (unreadMessageCount) {
            element.unreadMessageCount = chatMessages[i].unreadMessageCount;
        }
        addElementToInboxList(element);
    }
}

function addElementToInboxList(element) {
    const inboxList = document.getElementById("inboxList");

    const node = document.createElement("div");
    node.className = element.active ? "chat_list active_chat" : "chat_list";

    node.addEventListener("click", function () {
        router.push({path: "/chat", query: {with: element.username}});
        location.reload();
    });
    node.style.cursor = "pointer";

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
    nodeMessageText.id = LAST_MESSAGE_WITH + element.username;
    nodeMessageText.appendChild(document.createTextNode(element.text));

    nodeChatIb.appendChild(nodeMessageText);

    nodeChatPeople.appendChild(nodeChatIb);

    node.appendChild(nodeChatPeople);

    inboxList.insertBefore(node, inboxList.firstChild);

    if (element.unreadMessageCount > 0) {
        nodeChatIb.style.fontWeight = "bold";
        nodeH5.style.fontWeight = "bold";
        nodeMessageText.style.color = "black";
        nodeMessageText.style.color = "bold";
        const nodeUnreadBadge = document.createElement('span');
        nodeUnreadBadge.className = "badge badge-primary";
        nodeUnreadBadge.appendChild(document.createTextNode(element.unreadMessageCount));
        nodeH5.appendChild(nodeUnreadBadge);
    }
}

function updateLastMessageWith(message, username) {
    const lastMessage = document.getElementById(LAST_MESSAGE_WITH + username);
    if (!lastMessage) {
        const element = new Map();
        element.text = message.text;
        element.username = username;
        element.date = new Date();
        addElementToInboxList(element)
    } else {
        lastMessage.textContent = message.text;
    }
}

function getSecondUserUsername(message) {
    const currentUserUsername = userService.getCurrentUserUsername();
    if (currentUserUsername === message.recipient.username) {
        return message.sender.username;
    }
    return message.recipient.username;
}


function redirectToLastChat(message) {
    const username = getSecondUserUsername(message);
    router.push({path: "/chat", query: {with: username}});
    location.reload();
}
