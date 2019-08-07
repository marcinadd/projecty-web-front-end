<template>
    <div>
        <h2>Add project to team <b>{{teamName}}</b></h2>
        <form @submit.prevent="addProjectToSpecifiedTeam">
            <div class="form-group">
                <label for="name">Project name</label>
                <input class="form-control" id="name" type="text" v-model="name">
            </div>
            <button class="btn btn-success" type="submit">Add</button>
        </form>
    </div>
</template>

<script>
    import {userService} from "@/services";
    import {router} from "@/router/router";

    export default {
        name: "AddProjectToSpecifiedTeam",
        data() {
            return {
                teamName: []
            }
        },
        mounted() {
            userService.makeRequestToAPI("/team/addProjectToTeam", {teamId: this.$route.query.teamId})
                .then((teamName) => {
                    this.teamName = teamName;
                });
        },
        methods: {
            addProjectToSpecifiedTeam() {
                userService.makeRequestToAPI("/team/addProjectToTeam", {
                    teamId: this.$route.query.projectId,
                    name: this.name
                }, 'post')
                    .then(function () {
                        router.push({path: "/team/projectList", query: {teamId: this.teamId}});
                        location.reload();
                    })
            }
        }
    }
</script>

<style scoped>

</style>
