<template>
    <div>
        <form @submit.prevent="addProjectToTeam">
            <div class="form-group">
                <label for="teamId">Team</label>
                <select class="form-control" id="teamId" v-model="teamId">
                    <option :key="k" :value="teamRole.team.id"
                            v-for="(teamRole,k) in teamRoles">
                        {{teamRole.team.name}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label for="name">Project name</label>
                <input class="form-control" id="name" type="text" v-model="name">
            </div>
            <div class="alert alert-primary">
                Project will be added as team's project. <br>
                All members of selected team will have access to it. <br>
                You can't edit users and project roles without modifying your team.
            </div>
            <div class="form-actions">
                <button class="btn btn-success" type="submit">Add</button>
            </div>
        </form>
    </div>
</template>

<script>
    import {userService} from "@/services";
    import {router} from "@/router/router";
    import {mappingHelper, mappings} from "@/router/mappings";

    export default {
        name: "AddProjectToTeam",
        data() {
            return {
                teamRoles: [],
                teamId: '',
                name: ''
            }
        },
        mounted() {
            userService.makeRequestToAPI(mappings.TEAMS + "?manager=true").then(teamRoles => {
                this.teamRoles = teamRoles
            });
        },
        methods: {
            addProjectToTeam() {
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
