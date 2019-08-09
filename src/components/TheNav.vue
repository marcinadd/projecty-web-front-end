<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <div class="container">
            <router-link class="navbar-brand" to="/">Projecty Web</router-link>
            <button aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggler"
                    data-target="#navbarResponsive" data-toggle="collapse" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <template v-if="isAuthenticatedUser()">
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" th:href="@{/login}">Sign in</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" th:href="@{/register}">Sign up</a>
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/message/receivedMessages">
                                <template v-if="unreadMessages>0">
                                    <span class="text-warning">({{unreadMessages}})</span>
                                </template>
                                Messages
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/myProjects">
                                Projects
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/team/myTeams">
                                Teams
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" th:href="@{/settings}">
                                <span>{{username}}</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" style="cursor: pointer" v-on:click="logout">Log
                                out</a>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {userService} from "@/services";

    export default {
        name: "TheNav",
        data() {
            return {
                username: '',
                unreadMessages: 0
            }
        },
        mounted() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                this.username = user.username;
            }
            userService.makeRequestToAPI("/message/getUnreadMessageCount")
                .then(unreadMessages => {
                    this.unreadMessages = unreadMessages;
                });
        },
        methods: {
            isAuthenticatedUser() {
                return localStorage.getItem('user') === null;
            },
            logout() {
                userService.logout();
                location.reload();
            }
        }
    }
</script>

<style scoped>

</style>
