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
            <b>Attachments: </b>
            <ul :key="k" class="list-group" v-for="(attachment, k) in attachments">
                <li class="list-group-item" style="cursor: pointer" v-on:click="downloadAttachment(k)">
                    {{attachment.fileName}}
                </li>
            </ul>
    </span>
    </div>
</template>

<script>
    import {userService} from "@/services";
    import {mappings} from "@/router/mappings";

    export default {
        name: "ViewMessage",
        data() {
            return {
                message: [],
                attachments: []
            }
        },
        mounted() {
            userService.makeRequestToAPI(mappings.MESSAGES + this.$route.query.messageId, {messageId: this.$route.query.messageId})
                .then((message) => {
                    this.message = message;
                    this.attachments = message.attachments;
                });
        },
        methods: {
            downloadAttachment(k) {
                userService.downloadFile("/message/downloadFile", {messageId: this.message.id, fileId: k});
            }
        }
    }
</script>

<style scoped>

</style>
