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
                    <template v-if="!isAuthenticated">
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" th:href="@{/login}">Sign in</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" th:href="@{/register}">Sign up</a>
                        </li>
                    </template>
                    <template th:remove="tag" v-if="isAuthenticated">
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" th:href="@{/messages/messageList}">
                                <div th:if="${@messageService.getMessageCountForCurrentUser()>0}" th:remove="tag">
                                <span class="text-warning"
                                      th:text="${'('+@messageService.getMessageCountForCurrentUser()}+')'"></span>
                                </div>
                                Messages
                            </a>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/myProjects">
                                Projects
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" th:href="@{/team/myTeams}">
                                Teams
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" th:href="@{/settings}">
                                <span sec:authentication="name">Name</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" th:href="@{/logout}">Log out</a>
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
        methods: {
            isAuthenticated() {
                return userService.isAuthenticated();
            }
        }
    }
</script>

<style scoped>

</style>
