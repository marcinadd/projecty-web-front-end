<template>
    <div class="container">
        <h2 class="text-center">Manage project</h2>
        <h3>Change project name</h3>
        <form @submit.prevent="changeName" class="my-2">
            <div class="form-group">
                <label for="newName">New Name:</label>
                <input :placeholder="project.name" class="form-control" id="newName" name="name" type="text"
                       v-model="name">
            </div>
            <button class="btn btn-success">Change name</button>
        </form>
        <template v-if="project.team === null">
            <div class="pt-3">
                <h3>Manage users</h3>
            </div>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Role name</th>
                    <th scope="col">Remove</th>
                    <th scope="col">Change project role</th>
                </tr>
                </thead>
                <tbody :key="k" v-for="(projectRole,k) in projectRoles">
                <tr>
                    <td>{{projectRole.user.username}}</td>
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
            <form @submit.prevent="addUsers">
                <EntryUserList @inputData="updateInputs"></EntryUserList>
                <div class="form-actions">
                    <button class="btn btn-success" type="submit">Add users</button>
                </div>
            </form>
        </template>
        <template v-if="project.team !== null">
            <div class="alert alert-primary my-4" role="alert">
                This project is visible for all members of team <u>{{project.team.name}}</u>. <br>
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
    import EntryUserList from "@/components/EntryUserList";

    export default {
        name: "ManageProject",
        components: {EntryUserList},
        data() {
            return {
                project: [],
                projectRoles: [],
                currentUser: [],
                name: '',
                inputs: [
                    {
                        username: ''
                    }
                ]
            }
        },
        mounted() {
            userService.makeRequestToAPI("/project/manageProject", {projectId: this.$route.query.projectId})
                .then((data) => {
                    this.project = data.project;
                    this.currentUser = data.currentUser;
                    this.projectRoles = data.projectRoles;
                    this.name = data.name;
                });
        },
        methods: {
            changeName() {
                userService.makeRequestToAPI("/project/changeName",
                    {id: this.$route.query.projectId, name: this.name}, 'post')
                    .then(function () {
                        location.reload();
                    });
            },
            deleteProject() {
                userService.makeRequestToAPI("/project/deleteProject", {projectId: this.$route.query.projectId}, 'post')
                    .then(function () {
                    router.push("/myProjects");
                    });
            },
            changeRole(roleId, newRoleName) {
                userService.makeRequestToAPI("/project/changeRole", {
                    projectId: this.$route.query.projectId,
                    roleId: roleId,
                    newRoleName: newRoleName
                }, 'post').then(function () {
                    location.reload();
                });
            },
            deleteUser(userId) {
                userService.makeRequestToAPI("/project/deleteUser", {
                    projectId: this.$route.query.projectId,
                    userId: userId
                }, 'post').then(function () {
                    location.reload();
                });
            },
            updateInputs(inputs) {
                this.inputs = inputs;
            },
            addUsers() {
                const {inputs} = this;
                const usernames = userService.getUsernamesFromInputs(inputs);
                userService.makeRequestToAPI("/project/addUsers", {
                    projectId: this.$route.query.projectId,
                    usernames: usernames.join(',')
                }, 'post').then(function () {
                    location.reload();
                })
            },
        }
    }
</script>

<style scoped>

</style>
