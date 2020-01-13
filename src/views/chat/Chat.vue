<template>
    <div>
        <button class="btn btn-success" v-on:click="loadMoreMessages">Load more</button>
        <div class="messaging">
            <div class="inbox_msg">
                <div class="inbox_people">
                    <div class="headind_srch">
                        <div class="recent_heading">
                            <h4>Recent</h4>
                        </div>
                        <div class="srch_bar">
                            <div class="stylish-input-group">
                                <input class="search-bar" placeholder="Search" type="text">
                                <span class="input-group-addon">
                <button type="button"> <i aria-hidden="true" class="fa fa-search"></i> </button>
                </span></div>
                        </div>
                    </div>
                    <div class="inbox_chat" id="inboxList"></div>
                </div>
                <div class="mesgs">
                    <div class="msg_history" id="msgList"></div>
                    <div class="type_msg">
                        <div class="input_msg_write">
                            <form @submit.prevent="sendMessage">
                                <input class="write_msg" placeholder="Type a message" type="text" v-model="text"/>
                                <button class="msg_send_btn" type="submit"><i aria-hidden="true"
                                                                              class="fa fa-paper-plane-o"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-center top_spac"> Chat design by <a href="https://bootsnipp.com/sunil8107" target="">Sunil
                Rajput</a></p>
        </div>
    </div>
</template>

<script>

    import {SocketService} from "@/services/SocketService";
    import {userService} from '../../services';
    import {mappings} from "@/router/mappings";
    import {router} from "@/router/router";
    import {chatService} from "@/services/ChatService";


    export default {
        name: "Chat",
        data() {
            return {
                socketService: [],
                selectedChatUsername: "",
                text: "",
                messageCount: 0
            }
        },
        mounted() {
            this.selectedChatUsername = this.$route.query.with;
            userService.makeRequestToAPI(mappings.CHAT)
                .then((chatMessages) => {
                    chatService.appendToInboxList(chatMessages, this.selectedChatUsername);
                    if (!this.selectedChatUsername) {
                        chatService.redirectToLastChat(chatMessages[chatMessages.length - 1].lastMessage);
                    }
                });
            if (this.selectedChatUsername) {
                userService.makeRequestToAPI(mappings.CHAT + this.selectedChatUsername)
                    .then((response) => {
                        chatService.appendToPastMessages(response.content);
                        this.messageCount += response.content.length;
                        this.socketService = new SocketService();
                        this.socketService.connect(this.onMessageCallback);
                        userService.makeRequestToAPI(mappings.CHAT + this.selectedChatUsername + "/set/read")
                    }).catch(() => {
                    router.push("/404");
                });
            }
        },
        methods: {
            onMessageCallback(message) {
                message = JSON.parse(message.body);
                chatService.onMessageReceived(message, this.selectedChatUsername);
            },
            sendMessage() {
                if (this.text) {
                    let message = new Map();
                    message.text = this.text;
                    message.sendDate = new Date().toISOString();
                    this.socketService.sendMessage(this.selectedChatUsername, this.text);
                    chatService.addMessageToList(message, false, false);
                    chatService.updateLastMessageWith(message, this.selectedChatUsername);
                    this.text = "";
                    this.messageCount++;
                }
            },
            loadMoreMessages() {
                userService.makeRequestToAPI(mappings.CHAT + this.selectedChatUsername + "?offset=" + this.messageCount)
                    .then((response) => {
                        chatService.appendToPastMessages(response.content);
                        this.messageCount += response.content.length;
                    });
            }
        }
    }
</script>

<style scoped>
    @import "chat.css";
</style>
