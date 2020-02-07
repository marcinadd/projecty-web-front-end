<template>
    <div>
        <div class="container">
            <h2 class="text-center">Settings</h2>
            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li class="nav-item">
                    <a aria-controls="pills-home" aria-selected="true" class="nav-link active" data-toggle="pill"
                       href="#pills-account" id="pills-home-tab" role="tab">Account</a>
                </li>
                <li class="nav-item">
                    <a aria-controls="pills-profile" aria-selected="false" class="nav-link" data-toggle="pill"
                       href="#pills-avatar" id="pills-profile-tab" role="tab">Profile</a>
                </li>
                <li class="nav-item">
                    <a aria-controls="pills-contact" aria-selected="false" class="nav-link" data-toggle="pill"
                       href="#pills-contact" id="pills-contact-tab" role="tab">Contact</a>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-account" role="tabpanel">
                    <div class="row my-2">
                        <h3>Avatar</h3>
                    </div>
                    <form @submit.prevent="setAvatar">
                        <div class="form-group">
                            <label for="avatarImage">Allowed format: <b>JPG</b>, Max file size: 1 MB</label>
                            <input class="form-control-file" id="avatarImage" ref="file" type="file"
                                   v-on:change="validateFile()">
                            <div class="invalid-feedback">
                                This file cannot be set as avatar!
                            </div>
                            <div class="valid-feedback">
                                Looks good!
                            </div>
                            <button class="btn btn-success" disabled ref="buttonFileSubmit" type="submit">Set avatar
                            </button>
                        </div>
                    </form>
                    <div class="row my-2">
                        <h3>User info</h3>
                    </div>
                    <form>
                        <label for="username">Username</label>
                        <input :placeholder="user.username" class="form-control" disabled id="username" type="text">
                    </form>
                    <div class="row my-2">
                        <h3>Change password</h3>
                    </div>
                    <form @submit.prevent="changePassword">
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
                            <input class="form-control" id="repeatPassword" placeholder="Repeat new password"
                                   type="password"
                                   v-model="repeatPassword">
                        </div>
                        <button class="btn btn-primary" type="submit">Submit</button>
                    </form>
                </div>
                <div aria-labelledby="pills-profile-tab" class="tab-pane fade" id="pills-avatar" role="tabpanel">

                </div>
                <div aria-labelledby="pills-contact-tab" class="tab-pane fade" id="pills-contact" role="tabpanel">...
                </div>
            </div>
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
                repeatPassword: '',
                file: []
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
            },
            validateFile() {
                let fileDOM = this.$refs.file;
                let buttonDOM = this.$refs.buttonFileSubmit;
                this.file = this.$refs.file.files[0];
                let nameSplitted = this.file.name.split(".");
                if (nameSplitted[nameSplitted.length - 1].toUpperCase() !== "JPG" || this.file.size >= 1000000) {
                    fileDOM.className = fileDOM.className.split(" ")[0];
                    fileDOM.className = fileDOM.className.concat(" is-invalid");
                    buttonDOM.disabled = true;
                } else {
                    fileDOM.className = fileDOM.className.split(" ")[0];
                    fileDOM.className = fileDOM.className.concat(" is-valid");
                    buttonDOM.disabled = false;
                }
            },
            setAvatar() {
                let formData = new FormData();
                formData.append("avatar", this.file);
                userService.postFormData("/user/avatar", formData)
                    .then(function () {
                        location.reload();
                    });
            }
        }
    }
</script>

<style scoped>

</style>
