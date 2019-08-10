<template>
    <div>
        <div class="container">
            <h2 class="text-center">Settings</h2>
            <div class="row border">
                <div class="col">
                    <button class="btn btn-secondary">Account</button>
                </div>
            </div>
            <div class="row my-2">
                <h3>User info</h3>
            </div>
            <form class="form-group">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input :placeholder="user.username" class="form-control" disabled id="username" type="text">
                </div>
                <!--                <div class="form-group">-->
                <!--                    <label for="email">E-mail</label>-->
                <!--                    <input class="form-control" id="email" :placeholder="user.email" type="text">-->
                <!--                </div>-->
            </form>
            <div class="row my-2">
                <h3>Change password</h3>
            </div>
            <form @submit.prevent="changePassword" class="form-group">
                <div class="form-group">
                    <label for="currentPassword">Current Password</label>
                    <input class="form-control" id="currentPassword" placeholder="password" type="password"
                           v-model="currentPassword">
                </div>
                <div class="form-group">
                    <label for="newPassword">New password</label>
                    <input class="form-control" id="newPassword" placeholder="New password" type="password"
                           v-model="newPassword">
                </div>
                <div class="form-group">
                    <label for="repeatPassword">Repeat new password</label>
                    <input class="form-control" id="repeatPassword" placeholder="Repeat new password" type="password"
                           v-model="repeatPassword">
                </div>
                <button class="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {userService} from "@/services";

    export default {
        name: "Settings",
        data() {
            return {
                user: [],
                currentPassword: '',
                newPassword: '',
                repeatPassword: ''
            }
        },
        mounted() {
            userService.makeRequestToAPI("/settings").then(user => {
                this.user = user;
            });
        },
        methods: {
            changePassword() {
                const {newPassword} = this;
                userService.makeRequestToAPI("/changePassword", {
                    currentPassword: this.currentPassword,
                    newPassword: this.newPassword,
                    repeatPassword: this.repeatPassword
                }, 'post')
                    .then(function () {
                        const user = JSON.parse(localStorage.getItem('user'));
                        userService.login(user.username, newPassword);
                        location.reload();
                    });
            }
        }
    }
</script>

<style scoped>

</style>
