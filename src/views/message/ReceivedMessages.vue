<template>
    <div>
        <router-link to="/message/sentMessages">
            <button class="btn btn-primary">Sent message list</button>
        </router-link>
        <router-link to="/message/sendMessage">
            <button class="btn btn-success">Send new message</button>
        </router-link>
        <h2>Received Message List</h2>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Seen date</th>
                <th scope="col">From</th>
                <th scope="col">Title</th>
                <th scope="col">View</th>
            </tr>
            </thead>
            <tbody :key="k" v-for="(message,k) in messages">
            <tr th:classappend="${message.seenDate == null} ? bold">
                <td>{{message.sendDate | formatDate}}</td>
                <td>{{message.seenDate | formatDate}}</td>
                <td>{{message.sender.username}}</td>
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
    import {mappings} from "@/router/mappings";

    export default {
        name: "ReceivedMessages",
        data() {
            return {
                messages: []
            }
        },
        mounted() {
            userService.makeRequestToAPI(mappings.MESSAGES + mappings.RECEIVED_MESSAGES)
                .then((messages) => {
                    this.messages = messages;
                });
        }
    }
</script>

<style scoped>

</style>
