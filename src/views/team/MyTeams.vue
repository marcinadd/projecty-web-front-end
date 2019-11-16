<template>
    <div>
        <h2 class="text-center">My teams</h2>
        <div class="container">
            <router-link to="/team/addTeam">
                <button class="btn btn-success">Add new team</button>
            </router-link>
            <ul :key="k" class="list-group" v-for="(teamRole, k ) in teamRoles">
                <li class="list-group-item my-2">
                    <b><p>Team name</p></b>
                    <div class="row">
                        <div class="mx-auto">{{teamRole.team.name}}</div>
                    </div>
                    <p>Users</p>
                    <div class="row">
                        <div class="mx-auto">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">Role</th>
                                </tr>
                                </thead>
                                <tbody :key="k" v-for="(teamRoleObj, k) in teamRole.team.teamRoles">
                                <tr>
                                    <td>{{teamRoleObj.user.username}}</td>
                                    <td>{{teamRoleObj.name}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p>Projects</p>
                    <div class="row">
                        <div class="mx-auto">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                </tr>
                                </thead>
                                <tbody :key="k" v-for="(projectObj,k) in teamRole.team.projects">
                                <tr>
                                    <td>{{projectObj.name}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around">
                        <div class="p-2">
                            <router-link
                                    :to="{path: '/team/projectList', query: {teamId: teamRole.team.id}}">
                                <button class="btn btn-secondary" id="projectListButton" type="button">Project list
                                </button>
                            </router-link>
                        </div>
                        <template v-if="teamRole.name === 'MANAGER'">
                            <div class="p-2">
                                <router-link
                                        :to="{path: '/team/manageTeam', query: {teamId: teamRole.team.id}}">
                                    <button class="btn btn-warning" id="addTaskButton" type="button">Manage team
                                    </button>
                                </router-link>
                            </div>
                            <div class="p-2">
                                <router-link
                                        :to="{path: '/team/addProjectToSpecifiedTeam', query: {teamId: teamRole.team.id}}">
                                    <button class="btn btn-success" id="addProjectButton" type="button">Add project
                                    </button>
                                </router-link>
                            </div>
                        </template>
                        <div class="p-2">
                            <form @submit.prevent="leaveTeam(teamRole.team)">
                                <button class="btn btn-danger" id="leaveTeamButton" type="submit">Leave team</button>
                            </form>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {userService} from "@/services";
    import {router} from "@/router/router";
    import {mappingHelper, mappings} from "@/router/mappings";

    export default {
        name: "MyTeams",
        data() {
            return {
                teamRoles: []
            }
        },
        mounted() {
            userService.makeRequestToAPI(mappings.TEAMS).then(teamRoles => {
                this.teamRoles = teamRoles
            });
        },
        methods: {
            leaveTeam(team) {
                this.$dialog
                    .confirm("You are going to leave team: " + team.name + ". Do you want to continue?")
                    .then(function () {
                        userService.makeRequestToAPI(mappingHelper.createTeamMapping(team.id) + mappings.TEAM_LEAVE, {
                            teamId: team.id,
                        }, 'post')
                            .then(function () {
                                router.push('/team/myTeams');
                                location.reload()
                            })
                    });
            }
        }
    }
</script>

<style scoped>

</style>
