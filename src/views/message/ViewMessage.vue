<template>
    <div>
        <!--        TODO check error in render when look in message-->
        <h2><b>View Message</b></h2>
        <p v-if="message.sender"><b>From: </b>{{message.sender.username}}</p>
        <p v-if="message.recipient"><b>To: </b>{{message.recipient.username}}</p>
        <p><b>Date: </b>{{message.sendDate}}</p>
        <span class="border">
        <p>
            <b>Text: </b>
            <br>
            {{message.text}}
        </p>
            <p v-if="message.fileName">
                <b>Attachment: </b>
                <a v-on:click="downloadAttachment">
                    {{message.fileName}}
                </a>
            </p>
    </span>
    </div>
</template>

<script>
    import {userService} from "@/services";

    export default {
        name: "ViewMessage",
        data() {
            return {
                message: []
            }
        },
        mounted() {
            userService.makeRequestToAPI("/message/viewMessage", {messageId: this.$route.query.messageId})
                .then((message) => {
                    this.message = message;
                });
        },
        methods: {
            downloadAttachment() {
                userService.downloadFile("/message/downloadFile", {messageId: this.message.id});
            }
        }
    }
</script>

<style scoped>

</style>
