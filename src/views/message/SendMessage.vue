<template>
    <div>
        <h2>Send message</h2>
        <form @submit.prevent="sendMessage">
            <div class="form-group">
                <label for="recipientUsername">To: </label>
                <input class="form-control" id="recipientUsername" placeholder="Enter username" type="text"
                       v-model="recipientUsername"/>
            </div>
            <div class="form-group">
                <label for="title">Title: </label>
                <input class="form-control" id="title" placeholder="Enter title" type="text" v-model="title"/>
            </div>
            <div class="form-group">
                <label for="text">Message</label>
                <textarea class="form-control" id="text" placeholder="Enter message" rows="4" v-model="text"></textarea>
            </div>
            <div class="form-actions">
                <button class="btn btn-success" type="submit">Send</button>
            </div>
        </form>
    </div>
</template>

<script>
    import {userService} from "@/services";

    export default {
        name: "SendMessage",
        data() {
            return {
                recipientUsername: '',
                title: '',
                text: ''
            }
        },
        methods: {
            sendMessage() {
                userService.makeRequestToAPI("/message/sendMessage", {
                    recipientUsername: this.recipientUsername,
                    title: this.title,
                    text: this.text
                }, "post");
                //router.push('/myProjects');
            }
        }
    }
</script>

<style scoped>

</style>
