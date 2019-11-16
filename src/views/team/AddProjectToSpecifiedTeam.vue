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
    import {mappingHelper, mappings} from "@/router/mappings";

    export default {
        name: "AddProjectToSpecifiedTeam",
        data() {
            return {
                teamId: 0,
                teamName: ''
            }
        },
        mounted() {
            this.teamId = this.$route.query.teamId;
            userService.makeRequestToAPI(mappingHelper.createTeamMapping(this.teamId))
                .then((teamName) => {
                    this.teamName = teamName;
                });
        },
        methods: {
            addProjectToSpecifiedTeam() {
                const teamId = this.teamId;
                userService.makeRequestToAPI(mappingHelper.createTeamMapping(teamId) + mappings.TEAM_PROJECTS, {
                    name: this.name
                }, 'post')
                    .then(function () {
                        router.push({path: "/team/projectList", query: {teamId: teamId}});
                        location.reload();
                    })
            }
        }
    }
</script>

<style scoped>

</style>
