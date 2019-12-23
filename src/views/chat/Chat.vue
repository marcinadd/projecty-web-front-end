<template>
    <div>
        <h1>Chat with <b>{{recipientUsername}}</b></h1>
        <ul class="list-group" id="messageList">
        </ul>
        <form @submit.prevent="sendMessage">
            <div class="form-group">
                <input class="form-control" placeholder="Enter message" type="text" v-model="text">
            </div>
            <button class="btn-success btn">Send</button>
        </form>
    </div>
</template>

<script>


    import {SocketService} from "@/services/SocketService";

    export default {
        name: "Chat",
        data() {
            return {
                socketService: [],
                recipientUsername: "",
                text: ""
            }
        },
        mounted() {
            this.recipientUsername = this.$route.query.with;
            this.socketService = new SocketService();
            this.socketService.connect(this.onMessageCallback);
        },
        methods: {
            onMessageCallback(message) {
                var message = JSON.parse(message.body);
                var messageList = document.getElementById("messageList");
                var node = document.createElement("li");
                node.className = "list-group-item";
                node.style.textAlign = "left";
                var textNode = document.createTextNode(message.text);
                node.appendChild(textNode);
                messageList.appendChild(node);
            },
            onConnect() {
                console.log("On: Conntect");
                this.socketService.subscribeSpecific();
            },
            sendMessage() {
                this.socketService.sendMessage(this.recipientUsername, this.text);
                var messageList = document.getElementById("messageList");
                var node = document.createElement("li");
                node.className = "list-group-item";
                node.style.textAlign = "right";
                node.style.color = "red";
                var textNode = document.createTextNode(this.text);
                node.appendChild(textNode);
                messageList.appendChild(node);
                this.text = "";
            }
        }
    }
</script>

<style scoped>

</style>
