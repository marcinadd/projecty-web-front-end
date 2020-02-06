<template>

</template>

<script>
    import {SocketService} from "@/services/SocketService";
    import {router} from "@/router/router";
    import {eventBus} from "@/main";

    export default {
        name: "ChatNotification",
        data() {
            return {
                socketService: [],
                toastr: null,
            }
        },
        mounted() {
            this.toastr = require('toastr');
            this.toastr.options = {
                "positionClass": "toast-bottom-right"
            };

            this.socketService = new SocketService("/secured/room/", "/user/queue/specific-user");
            this.socketService.connect(this.onNotificationReceivedCallback);
        },
        methods: {
            onNotificationReceivedCallback(message) {
                message = JSON.parse(message.body);
                this.toastr.info(message.text, message.sender,
                    {
                        onclick: function () {
                            router.push({path: "/chat", query: {with: message.from}});
                            // this.playSound();
                        }
                    }
                );
                eventBus.$emit("changeUnreadChatMessageCount", 1);
            },
            playSound() {
                new Audio(require("../assets/notification.mp3")).play();
            }
        }
    }
</script>

<style scoped>

</style>
