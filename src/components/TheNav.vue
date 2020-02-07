<template>
    <nav class="navbar navbar-inverse navbar-expand-xl navbar-dark fixed-top">
        <div class="navbar-header d-flex col">
            <a class="navbar-brand" href="#"><i class="fas fa-cube"></i>Projecty</a>
            <button class="navbar-toggle navbar-toggler ml-auto" data-target="#navbarCollapse" data-toggle="collapse"
                    type="button">
                <span class="navbar-toggler-icon"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="collapse navbar-collapse justify-content-start" id="navbarCollapse">
            <ul class="nav navbar-nav navbar-right ml-auto">
                <template v-if="!isAuthenticatedUser()">
                    <li class="nav-item" v-if="this.$route.path !== '/login'">
                        <i class="fass fa-sign-in-alt"></i>
                        <router-link class="nav-link" to="/login">
                            Sign in
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="this.$route.path !== '/register'">
                        <i class="fas fa-sign-in-alt"></i>
                        <router-link class="nav-link" to="/register">
                            Sign up
                        </router-link>
                    </li>
                </template>
                <template v-else>
                    <li class="nav-item"><a class="nav-link" href="/"><i class="fas fa-home"></i><span>Home</span></a>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/myProjects">
                            <i class="fas fa-project-diagram"></i>
                            <span>Projects</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/team/myTeams">
                            <i class="fas fa-users"></i>
                            <span>Teams</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/chat">
                            <i class="fas fa-comments"></i>
                            <span>Chat&nbsp;</span>
                            <template v-if="unreadChatMessageCount>0">
                                <span class="badge badge-warning">{{unreadChatMessageCount}}</span>
                            </template>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/message/receivedMessages">
                            <i class="fas fa-envelope"></i>
                            <span>Messages</span>
                            <template v-if="unreadMessageCount>0">
                                <span class="text-warning">({{unreadMessageCount}})</span>
                            </template>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/notifications">
                            <i class="fas fa-bell"></i>
                            <span>Notifications</span>
                            <template v-if="unreadNotificationCount>0">
                                <span class="badge badge-warning">{{unreadNotificationCount}}</span>
                            </template>
                        </router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle user-action" data-toggle="dropdown" href="#">
                            <img class="avatar" id="avatar"/>
                            {{username}} <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <!--                            TODO Add profile-->
                            <li><a class="dropdown-item" href="#"><i class="fa fa-user-o"></i> Profile</a></li>
                            <li>
                                <router-link class="dropdown-item" to="/settings">
                                    <i class="fa fa-sliders"></i>
                                    Settings
                                </router-link>
                            </li>
                            <li class="divider dropdown-divider"></li>
                            <li v-on:click="logout"><a class="dropdown-item" href="#"><i
                                    class="material-icons">&#xE8AC;</i> Logout</a></li>
                        </ul>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<script>
    import {userService} from "@/services";
    import {mappings} from "@/router/mappings";
    import {eventBus} from "@/main";

    export default {
        name: "TheNav",
        data() {
            return {
                username: '',
                unreadMessageCount: 0,
                unreadChatMessageCount: 0,
                unreadNotificationCount: 0,
                avatar: ''
            }
        },
        created() {
            eventBus.$on("setUnreadNotificationCount", this.setUnreadNotificationCount);
            eventBus.$on("changeUnreadNotificationCount", this.changeUnreadNotificationCount);
            eventBus.$on("setUnreadChatMessageCount", this.setUnreadChatMessageCount);
            eventBus.$on("changeUnreadChatMessageCount", this.changeUnreadChatMessageCount);

        },
        mounted() {
            if (userService.isAuthenticatedUser()) {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user) {
                    this.username = user.username;
                }
                //TODO Pack this request to one
                userService.makeRequestToAPI(mappings.NOTIFICATIONS + "getUnreadNotificationCount")
                    .then(unreadNotificationCount => {
                        this.unreadNotificationCount = unreadNotificationCount;
                    });
                userService.makeRequestToAPI("/messages/getUnreadMessageCount")
                    .then(unreadMessageCount => {
                        this.unreadMessageCount = unreadMessageCount;
                    });
                userService.makeRequestToAPI(mappings.CHAT + "unreadChatMessageCount")
                    .then(unreadChatMessageCount => {
                        this.unreadChatMessageCount = unreadChatMessageCount;
                    });

                userService.getImage("/user/" + userService.getCurrentUserUsername() + "/avatar")
                    .then(avatar => {
                        let avatarDom = document.getElementById("avatar");
                        avatarDom.src = " data:image/jpeg;charset=utf-8;base64, "
                            + Buffer.from(avatar, "base64").toString("base64");
                    });
            }
        },
        methods: {
            isAuthenticatedUser() {
                return userService.isAuthenticatedUser();
            },
            logout() {
                userService.logout();
                location.reload();
            },

            setUnreadNotificationCount(value) {
                this.unreadNotificationCount = value;
            },
            changeUnreadNotificationCount(step) {
                this.unreadNotificationCount += step;
            },
            setUnreadChatMessageCount(value) {
                this.unreadChatMessageCount = value;
            },
            changeUnreadChatMessageCount(step) {
                this.unreadChatMessageCount += step;
            }
        }
    }
</script>

<style scoped>

</style>
