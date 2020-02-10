import {userService} from "@/services/UserService";
import moment from "moment";
import {router} from "@/router/router";
import {chatServiceHelper} from "@/services/ChatServiceHelper";

export const chatService = {
    addMessageToList,
    appendToPastMessages,
    addElementToInboxList,
    appendToInboxList,
    updateLastMessageWith,
    redirectToLastChat,
    onMessageReceived
};

const LAST_MESSAGE_WITH = "lastMessageWith";
const UNREAD_MESSAGE_COUNT_WITH = "unreadMessageCountWith";

function addMessageToList(message, isReceived, toBegin = true, avatar) {
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
        nodeImg.className = "chat_img_el";
        nodeImg.src = avatar;
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

function appendToPastMessages(chatMessages, avatar) {
    const currentUserUsername = userService.getCurrentUserUsername();
    for (let i in chatMessages) {
        const message = chatMessages[i];
        if (message.sender.username === currentUserUsername) {
            this.addMessageToList(chatMessages[i], false, true, avatar);
        } else {
            this.addMessageToList(chatMessages[i], true, true, avatar);
        }
    }
    const msgList = document.getElementById("msgList");
    msgList.scrollTop = msgList.clientHeight;
}

function appendToInboxList(chatMessages, activeUsername) {
    for (let i in chatMessages) {
        var message = chatMessages[i].lastMessage;
        let username = chatServiceHelper.getSecondUserUsername(message);
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
    nodeImg.className = "chat_img_el";
    nodeImgDiv.appendChild(nodeImg);

    userService.getImage("/user/" + element.username + "/avatar")
        .then(avatar => {
            nodeImg.src = " data:image/jpeg;charset=utf-8;base64, "
                + Buffer.from(avatar).toString("base64");
        }).catch(function () {
        nodeImg.src = require("../assets/avatar.jpg")
    });

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

    const nodeUnreadMessageCount = document.createElement('span');
    nodeUnreadMessageCount.id = UNREAD_MESSAGE_COUNT_WITH + element.username;
    nodeUnreadMessageCount.className = "badge badge-primary";
    nodeUnreadMessageCount.appendChild(document.createTextNode(element.unreadMessageCount > 0 ? element.unreadMessageCount : 0));
    nodeH5.appendChild(nodeUnreadMessageCount);

    if (element.unreadMessageCount > 0) {
        nodeChatIb.style.fontWeight = "bold";
        nodeH5.style.fontWeight = "bold";
        nodeMessageText.style.color = "black";
        nodeMessageText.style.color = "bold";
        nodeUnreadMessageCount.style.visibility = "visible";
    } else {
        nodeUnreadMessageCount.style.visibility = "hidden";
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

function updateMessageCounterWith(username) {
    const messageCount = document.getElementById(UNREAD_MESSAGE_COUNT_WITH + username);
    if (messageCount) {
        let unreadMessageCount = 1;
        if (messageCount.textContent !== undefined) {
            unreadMessageCount = parseInt(messageCount.textContent) + 1;
        }
        messageCount.textContent = unreadMessageCount;
        messageCount.style.visibility = "visible";
    }
}

function redirectToLastChat(message) {
    const username = chatServiceHelper.getSecondUserUsername(message);
    router.push({path: "/chat", query: {with: username}});
    location.reload();
}

function onMessageReceived(message, selectedChatUsername, avatar) {
    if (message.sender === selectedChatUsername) {
        addMessageToList(message, true, false, avatar);
        updateLastMessageWith(message, selectedChatUsername);
    } else {
        const secondUsername = chatServiceHelper.getSecondUserUsername(message);
        updateLastMessageWith(message, secondUsername);
        updateMessageCounterWith(secondUsername);
    }
}
