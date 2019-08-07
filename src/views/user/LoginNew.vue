<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="username">Username</label>
                <input :class="{ 'is-invalid': submitted && !username }" class="form-control" name="username"
                       type="text" v-model="username"/>
                <div class="invalid-feedback" v-show="submitted && !username">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input :class="{ 'is-invalid': submitted && !password }" class="form-control" name="password"
                       type="password" v-model="password"/>
                <div class="invalid-feedback" v-show="submitted && !password">Password is required</div>
            </div>
            <div class="form-group">
                <button :disabled="loading" class="btn btn-primary">Login</button>
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                     v-show="loading"/>
            </div>
            <div class="alert alert-danger" v-if="error">{{error}}</div>
        </form>
    </div>
</template>

<script>
    import {userService} from '../../services';
    import {router} from "@/router/router";

    export default {
        data() {
            return {
                username: '',
                password: '',
                submitted: false,
                loading: false,
                returnUrl: '',
                error: ''
            }
        },
        created() {
            // reset login status
            userService.logout();

            // get return url from route parameters or default to '/'
            this.returnUrl = this.$route.query.returnUrl || '/';
        },
        methods: {
            handleSubmit() {
                const {returnUrl} = this;
                this.submitted = true;
                const {username, password} = this;

                // stop here if form is invalid
                if (!(username && password)) {
                    return;
                }

                this.loading = true;
                userService.login(username, password)
                    .then(function () {
                        router.push(returnUrl);
                        location.reload();
                    }).then(
                        error => {
                            this.error = error;
                            this.loading = false;
                        }
                    );
            }
        }
    };
</script>
