<template>
    <div class="container">
        <div>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#unread">Unread</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#read" v-on:click="getReadNotifications()">Read</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane fade show active" id="unread">
                    <NotificationList :notifications="unreadNotifications"/>
                </div>
                <div class="tab-pane fade" id="read">
                    <NotificationList :notifications="readNotifications"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {userService} from "@/services";
    import {mappings} from "@/router/mappings";
    import NotificationList from "@/components/NotificationList";
    import {eventBus} from "@/main";

    export default {
        name: "MyNotifications",
        components: {NotificationList},
        data() {
            return {
                unreadNotifications: [],
                readNotifications: null
            }
        },
        mounted() {
            userService.makeRequestToAPI(mappings.NOTIFICATIONS + "?status=UNREAD")
                .then(notifications => {
                    this.unreadNotifications = notifications;
                });
            userService.makeRequestToAPI(mappings.NOTIFICATIONS + "setAllRead", {}, "POST");
            eventBus.$emit("setUnreadNotificationCount", 0);
        },
        methods: {
            getReadNotifications() {
                if (this.readNotifications === null) {
                    userService.makeRequestToAPI(mappings.NOTIFICATIONS + "?status=READ")
                        .then(notifications => {
                            this.readNotifications = notifications;
                        });
                }
            }
        }
    }
</script>

<style scoped>

</style>
