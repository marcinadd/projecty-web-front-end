<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="registerUser">
            <div :key="k" class="alert alert-danger" v-for="(error,k) in errors">
                {{error}}
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input :class="{ 'is-invalid': submitted && !username }" placeholder="Username" class="form-control" id="username" name="username"
                       type="text" v-model="username"/>
                <div class="invalid-feedback" v-show="submitted && !username">Username is required</div>
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input :class="{ 'is-invalid': submitted && !email }" placeholder="Email" class="form-control" id="email" name="email"
                       type="email" v-model="email"/>
                <div class="invalid-feedback" v-show="submitted && !email">Email is required</div>
                <small class="form-text text-muted" id="emailHelp">We'll never share your email with anyone
                    else.</small>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input :class="{ 'is-invalid': submitted && !password }" placeholder="Password" class="form-control" id="password" name="password"
                       type="password" v-model="password"/>
                <div class="invalid-feedback" v-show="submitted && !password">Password is required</div>
            </div>
            <div class="form-group">
                <label for="passwordRepeat">Repeat Password</label>
                <input :class="{ 'is-invalid': submitted && !passwordRepeat || password !== passwordRepeat}" placeholder="Password Repeat" class="form-control" id="password-repeat" name="password"
                       type="password" v-model="passwordRepeat"/>
                <div class="invalid-feedback" v-show="submitted && !passwordRepeat">Repeated Password is required</div>
                <div class="invalid-feedback" v-show="submitted && password !== passwordRepeat || password !== passwordRepeat">Passwords arn't the same</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" type="submit">Submit</button>
            </div>
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
                submitted: false,
                passwordRepeat: '',
                errors: []
            }
        },
        methods: {
            registerUser() {
                this.submitted = true;

                if(!(this.username && this.email && this.password && this.passwordRepeat)) {
                    return;
                }

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
