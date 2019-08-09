<template>
    <div>
        <router-link to="/message/receivedMessages">
            <button class="btn btn-primary">Received message list</button>
        </router-link>
        <router-link to="/message/sendMessage">
            <button class="btn btn-success">Send new message</button>
        </router-link>
        <h2>Sent Message List</h2>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Seen date</th>
                <th scope="col">To</th>
                <th scope="col">Title</th>
                <th scope="col">View</th>
            </tr>
            </thead>
            <tbody :key="k" v-for="(message,k) in messages">
            <tr>
                <td>{{message.sendDate | formatDate}}</td>
                <td>{{message.seenDate | formatDate}}</td>
                <td v-if="message.recipient">{{message.recipient.username}}</td>
                <td>{{message.title}}</td>
                <td>
                    <router-link :to="{path: '/message/viewMessage', query: {messageId: message.id}}">
                        <button class="btn btn-primary">View</button>
                    </router-link>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {userService} from "@/services";

    export default {
        name: "SentMessages",
        data() {
            return {
                messages: []
            }
        },
        mounted() {
            userService.makeRequestToAPI("/message/sentMessages")
                .then((messages) => {
                    this.messages = messages;
                });
        }
    }
</script>

<style scoped>

</style>
