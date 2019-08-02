<template>
    <div class="container">
        <h2 class="text-center">Manage project</h2>
        <h3>Change project name</h3>
        <form class="my-2" method="post" th:action="@{/project/changeName}" th:object="${project}">
            <div class="alert alert-danger" role="alert" th:if="${#fields.hasErrors('*')}">
                <ul>
                    <li th:each="err : ${#fields.errors('*')}" th:text="${err}"></li>
                </ul>
            </div>
            <input name="id" th:value="${project.id}" type="hidden">
            <div class="form-group">
                <label for="newName">New Name:</label>
                <input :value="project.name" class="form-control" id="newName" name="name" type="text">
            </div>
            <button class="btn btn-success" type="submit">Change name</button>
        </form>
        <template v-if="project.team === null">
            <div class="pt-3">
                <h3>Manage users</h3>
            </div>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Role name</th>
                    <th scope="col">Remove</th>
                    <th scope="col">Change project role</th>
                </tr>
                </thead>
                <tbody v-for="projectRole in projectRoles">
                <tr>
                    <td>{{projectRole.user.username}}</td>
                    <td th:text="${projectRole.user.email}">TODO HIDDEN</td>
                    <td>{{projectRole.name}}</td>
                    <td>
                        <button class="btn btn-danger disabled" v-if="projectRole.user.id === currentUser.id">
                            Remove
                        </button>
                        <form @submit.prevent="deleteUser(projectRole.user.id)"
                              method="post"
                              v-else>
                            <button class="btn btn-danger" type="submit">Remove</button>
                        </form>
                    </td>
                    <td>
                        <form @submit.prevent="changeRole(projectRole.id,'USER')"
                              method="post"
                              v-if="projectRole.name === 'ADMIN' && projectRole.user.id !== currentUser.id">
                            <button class="btn btn-success" type="submit">
                                Disable Admin
                            </button>
                        </form>
                        <form @submit.prevent="changeRole(projectRole.id,'ADMIN')"
                              method="post"
                              v-if="projectRole.name === 'USER' && projectRole.user.id !== currentUser.id">
                            <button class="btn btn-danger" type="submit">
                                Enable Admin
                            </button>
                        </form>
                    </td>
                </tr>
                </tbody>
            </table>
            <h3>Add users</h3>
            <form method="post" th:action="@{/project/addUsers(projectId=${project.id})}">
                <div class="form-group">
                    <label>Add users</label><br>
                    <input class="btn btn-success" id="add" type="button" value="+"/>
                    <input class="btn btn-danger" id="remove" type="button" value="-"/>
                </div>
                <div class="form-group" id="users">
                </div>
                <div class="form-actions">
                    <button class="btn btn-success" type="submit">Add</button>
                </div>
            </form>
        </template>
        <template v-if="project.team !== null">
            <div class="alert alert-primary my-4" role="alert">
                This project is visible for all members of team <u th:text="${project.team.name}"></u>. <br>
                All team members have access to project corresponding to their roles.<br>
                You can't set them separately.
            </div>
        </template>
        <h3>Delete project</h3>
        <form @submit.prevent="deleteProject" method="post">
            <button class="btn btn-danger" type="submit">Delete project</button>
        </form>
    </div>
</template>

<script>
    import {userService} from "@/services";
    import {router} from "@/router/router";

    export default {
        name: "ManageProject",
        data() {
            return {
                project: [],
                projectRoles: [],
                currentUser: [],
            }
        },
        mounted() {
            userService.getData("/project/manageProject", {projectId: this.$route.query.projectId})
                .then((data) => {
                    this.project = data.project;
                    this.currentUser = data.currentUser;
                    this.projectRoles = data.projectRoles;
                });
        },
        methods: {
            deleteProject() {
                userService.getData("/project/deleteProject", {projectId: this.$route.query.projectId}, 'post').then((data) => {
                    router.push("/myProjects");
                }).catch(error => {
                    console.log(error);
                })
            },
            changeRole(roleId, newRoleName) {
                userService.getData("/project/changeRole", {
                    projectId: this.$route.query.projectId,
                    roleId: roleId,
                    newRoleName: newRoleName
                }, 'post').then((data) => {
                    location.reload();
                }).catch(error => {
                    console.log(error);
                })
            },
            deleteUser(userId) {
                userService.getData("/project/deleteUser", {
                    projectId: this.$route.query.projectId,
                    userId: userId
                }, 'post').then((data) => {
                    location.reload();
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>

</style>
