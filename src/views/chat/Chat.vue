<template>
    <div>
        <div class="container">
            <h1>Chat with <b>{{recipientUsername}}</b></h1>
            <button class="btn btn-success" v-on:click="loadMoreMessages">Load more</button>
            <ul class="list-group" id="messageList" style="overflow-y: scroll; height: 50vh">
            </ul>

            <form @submit.prevent="sendMessage" class="my-5">
                <div class="form-group">
                    <input class="form-control" placeholder="Enter message" type="text" v-model="text">
                </div>
                <button class="btn-success btn">Send</button>
            </form>
        </div>
    </div>
</template>

<script>

    import {SocketService} from "@/services/SocketService";
    import {chatService, userService} from '../../services';
    import {mappings} from "@/router/mappings";
    import {router} from "@/router/router";

    export default {
        name: "Chat",
        data() {
            return {
                socketService: [],
                recipientUsername: "",
                text: "",
                messageCount: 0
            }
        },
        mounted() {
            this.recipientUsername = this.$route.query.with;
            userService.makeRequestToAPI(mappings.CHAT + this.recipientUsername)
                .then((response) => {
                    chatService.appendPastMessages(response.content);
                    this.messageCount += response.content.length;
                    this.socketService = new SocketService();
                    this.socketService.connect(this.onMessageCallback);
                }).catch(() => {
                router.push("/404");
            });
        },
        methods: {
            onMessageCallback(message) {
                message = JSON.parse(message.body);
                chatService.addMessageToList(message.text, false, false);
            },
            sendMessage() {
                this.socketService.sendMessage(this.recipientUsername, this.text);
                chatService.addMessageToList(this.text, true, false);
                this.text = "";
                this.messageCount++;
            },
            loadMoreMessages() {
                userService.makeRequestToAPI(mappings.CHAT + this.recipientUsername + "?offset=" + this.messageCount)
                    .then((response) => {
                        chatService.appendPastMessages(response.content);
                        this.messageCount += response.content.length;
                    });
            }
        }
    }
</script>

<style scoped>
    @import "chat.css"
</style>
