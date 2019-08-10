<template xmlns:th="http://www.w3.org/1999/xhtml">
    <div class="container">
        <h2 class="text-center">My projects</h2>

        <router-link class="my-4" to="/project/addProject">
            <button class="btn btn-success">Add project</button>
        </router-link>
        <router-link to="/team/addProjectToTeam">
            <button class="btn btn-info">Add team project</button>
        </router-link>
        <div class="container my-4">
            <h3>Team's projects</h3>
            <ul :key="k" class="list-group" v-for="(teamRole,k) in teamRoles">
                <li class="list-group-item my-2">
                    <router-link :to="{path: '/team/addTeamProject', query: {teamId: teamRole.team.id}}"
                                 v-if="teamRole.name === 'MANAGER'">
                        <button class="btn btn-success">Add project</button>
                    </router-link>
                    <div class="container">
                        <p class="text-center">{{teamRole.team.name}}</p>
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">Project name</th>
                                <template v-if="teamRole.name === 'MANAGER'">
                                    <th scope="col">Task list</th>
                                    <th scope="col">Add task</th>
                                    <th scope="col">Delete project</th>
                                </template>
                            </tr>
                            </thead>
                            <tbody :key="k" v-for="(project,k) in teamRole.team.projects">
                            <tr>
                                <td>{{project.name}}</td>
                                <td>
                                    <router-link :to="{path: '/project/task/taskList', query: {projectId: project.id}}">
                                        <button class="btn btn-primary" id="taskListButton" type="button">Task list
                                        </button>
                                    </router-link>
                                </td>
                                <template v-if="teamRole.name === 'MANAGER'">
                                    <td>
                                        <router-link
                                                :to="{path: '/project/task/addTask', query: {projectId: project.id}}">
                                            <button class="btn btn-success" id="addTaskTeamButton" type="button">Add
                                                task
                                            </button>
                                        </router-link>
                                    </td>
                                    <td>
                                        <router-link
                                                :to="{path: '/project/manageProject', query: {projectId: project.id}}">
                                            <button class="btn btn-warning" id="manageProjectTeamButton" type="button">
                                                Manage project
                                            </button>
                                        </router-link>
                                    </td>
                                </template>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
            </ul>
        </div>
        <div class="container my-3">
            <h3>Projects</h3>
            <ul :key="k" class="list-group" v-for="(projectRole,k) in projectRoles">
                <li class="list-group-item my-2">
                    <div class="row">
                        <div class="mx-auto">{{projectRole.project.name}}</div>
                    </div>
                    <p> Users </p>
                    <div class="row">
                        <div class="mx-auto">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col">Username</th>
                                    <th scope="col">Role</th>
                                </tr>
                                </thead>
                                <tbody :key="k" v-for="(roleObj,k) in projectRole.project.projectRoles">
                                <tr>
                                    <td v-if="roleObj.user">{{roleObj.user.username}}</td>
                                    <td>{{roleObj.name}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around">
                        <div class="p-2">
                            <router-link
                                    :to="{path: '/project/task/taskList', query: {projectId: projectRole.project.id}}">
                                <button class="btn btn-primary" id="tasksListButton" type="button">Task list</button>
                            </router-link>
                        </div>
                        <template v-if="projectRole.name === 'ADMIN'">
                            <div class="p-2">
                                <router-link
                                        :to="{path: '/project/task/addTask', query: {projectId: projectRole.project.id}}">
                                    <button class="btn btn-success" id="addTaskButton" type="button">Add task</button>
                                </router-link>
                            </div>
                            <div class="p-2">
                                <router-link
                                        :to="{path: '/project/manageProject', query: {projectId: projectRole.project.id}}">
                                    <button class="btn btn-warning" id="manageProjectButton" type="button">Manage
                                        project
                                    </button>
                                </router-link>
                            </div>
                            <div class="p-2">
                                <form method="POST"
                                      @submit.prevent="leaveProject(projectRole.project.id)">
                                    <button class="btn btn-danger" type="submit">Leave project</button>
                                </form>
                            </div>
                        </template>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {userService} from "@/services";

    export default {
        name: "MyProjects",
        data() {
            return {
                teamRoles: [],
                projectRoles: []
            }
        },
        mounted() {
            userService.makeRequestToAPI("/project/myProjects").then(data => {
                this.teamRoles = data.teamRoles;
                this.projectRoles = data.projectRoles;
            });
        },
        methods: {
            leaveProject(projectId) {
                userService.makeRequestToAPI("/project/leaveProject", {
                    projectId: projectId
                }, 'post').then(function () {
                    location.reload();
                })
            }
        }
    }
</script>

<style scoped>

</style>
