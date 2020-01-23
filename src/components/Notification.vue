<template>

</template>

<script>
    import {SocketService} from "@/services/SocketService";
    import {router} from "@/router/router";

    export default {
        name: "Notification",
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

            this.socketService = new SocketService();
            this.socketService.connect(this.onMessageCallback);
        },
        methods: {
            onMessageCallback(message) {
                message = JSON.parse(message.body);
                this.toastr.info(message.text, message.sender,
                    {
                        onclick: function () {
                            router.push({path: "/chat", query: {with: message.from}});
                            // this.playSound();
                        }
                    }
                );
            },
            playSound() {
                new Audio(require("../assets/notification.mp3")).play();
            }
        }
    }
</script>

<style scoped>

</style>
