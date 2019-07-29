<template>
    <header class="bg-primary text-white">
        <div class="container text-center">
            <h1>{{title}}</h1>
        </div>
        <button class="btn btn-success" v-on:click="logout">logout</button>
    </header>
</template>

<script>
    import {userService} from "@/services";
    import {router} from "@/router/router";

    export default {
        name: "TheHeader",
        props: {
            title: String
        },
        methods: {
            logout() {
                userService.logout();
                router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>
