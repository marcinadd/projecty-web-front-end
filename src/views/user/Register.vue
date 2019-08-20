<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="registerUser">
            <div :key="k" class="alert alert-danger" v-for="(error,k) in errors">
                {{error}}
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input class="form-control" id="username" placeholder="Username" type="text" v-model="username">
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input class="form-control" id="email" placeholder="Enter email" type="email" v-model="email">
                <small class="form-text text-muted" id="emailHelp">We'll never share your email with anyone
                    else.</small>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input class="form-control" id="password" placeholder="Password" type="password" v-model="password">
            </div>
            <div class="form-group">
                <label for="passwordRepeat">Repeat Password</label>
                <input class="form-control" id="passwordRepeat" placeholder="Password Repeat" type="password"
                       v-model="passwordRepeat">
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
    import {userService} from "@/services";
    import {router} from "@/router/router";

    export default {
        name: "Register",
        data() {
            return {
                username: '',
                email: '',
                password: '',
                passwordRepeat: '',
                errors: []
            }
        },
        methods: {
            registerUser() {
                userService.makeRequestToAPIWithoutAuth('/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    passwordRepeat: this.passwordRepeat
                }, 'post').then(function () {
                    router.push('/login')
                }).catch(error => {
                    this.errors = error.response.data.errors;
                })
            }
        }
    }
</script>

<style scoped>

</style>
