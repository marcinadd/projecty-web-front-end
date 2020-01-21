<template>
    <div v-if="notifications.length >0">
        <ul class="list-group">
            <li :key="k" class="list-group-item" v-for="(notification, k) in notifications">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <span v-html="notification.message"></span>
                        </div>
                        <div class="col">
                            {{notification.date | formatDate}}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <div v-else>
        <h2 class="display">Nothing here!</h2>
    </div>
</template>

<script>
    export default {
        name: "NotificationList",
        props: {
            notifications: {
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
