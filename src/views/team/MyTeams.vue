<template>
    <div>
        <h2 class="text-center">My teams</h2>
        <div class="container">
            <a class="my-2" th:href="@{/team/addTeam}">
                <button class="btn btn-success">Add new team</button>
            </a>
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
                            <a th:href="@{/team/projectList(teamId=${teamRole.team.id})}">
                                <button class="btn btn-secondary" id="projectListButton" type="button">Project list
                                </button>
                            </a>
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
                                <a th:href="@{/team/addTeamProject(teamId=${teamRole.team.id})}">
                                    <button class="btn btn-success" id="addProjectButton" type="button">Add project
                                    </button>
                                </a>
                            </div>
                        </template>
                        <div class="p-2">
                            <a th:href="@{/team/leaveTeamConfirm(teamId=${teamRole.team.id})}">
                                <button class="btn btn-danger" id="leaveTeamButton" type="button">Leave team</button>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {userService} from "@/services";

    export default {
        name: "MyTeams",
        data() {
            return {
                teamRoles: []
            }
        },
        mounted() {
            userService.makeRequestToAPI("/team/myTeams").then(teamRoles => {
                this.teamRoles = teamRoles
            });
        },
    }
</script>

<style scoped>

</style>
