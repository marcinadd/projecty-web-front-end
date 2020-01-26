<template>

</template>

<script>
    import {SocketService} from "@/services/SocketService";
    import {eventBus} from "@/main";

    export default {
        name: "Notifications",
        data() {
            return {
                socketService: [],
            }
        },
        mounted() {
            this.toastr = require('toastr');
            this.toastr.options = {
                "positionClass": "toast-bottom-right"
            };
            this.socketService = new SocketService("/secured/notifications", "/user/queue/notifications");
            this.socketService.connect(this.onNotificationReceivedCallback);
        },
        methods: {
            onNotificationReceivedCallback(notification) {
                notification = JSON.parse(notification.body);
                this.toastr["success"](notification.message);
                eventBus.$emit("changeUnreadNotificationCount", 1);
            }
        }
    }
</script>

<style scoped>

</style>
