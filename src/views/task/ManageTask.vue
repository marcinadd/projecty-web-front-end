<template>
    <div class="container">
        <h2 class="text-center">Manage task</h2>
        <h3>Edit task details</h3>
        <form @submit.prevent="editTaskDetails" method="post">
            <div class="form-group">
                <label for="newName">New Name:</label>
                <input class="form-control" id="newName" type="text" v-model="name">
            </div>
            <div class="form-group">
                <label for="startDate">Start date</label>
                <input class="form-control" id="startDate" type="date" v-model="startDate">
            </div>
            <div class="form-group">
                <label for="startDate">End date</label>
                <input class="form-control" id="endDate" type="date" v-model="endDate">
            </div>
            <div class="form-group">
                <label for="status">Status</label>
                <select class="form-control" id="status" name="status" v-model="status">
                    <option value="TO_DO">To do</option>
                    <option value="IN_PROGRESS">In progress</option>
                    <option value="DONE">Done</option>
                </select>
            </div>
            <button class="btn btn-success" type="submit">Edit</button>
        </form>
        <div class="pt-3">
            <h3>Manage assignments</h3>
        </div>
        <div class="row-my-2">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Remove assignment</th>
                </tr>
                </thead>
                <tbody>
                <tr :key="k" v-for="(user,k) in task.assignedUsers">
                    <td>{{user.username}}</td>
                    <td>
                        <form @submit.prevent="removeAssignment(user.username)">
                            <button class="btn btn-danger" type="submit">Remove assignment</button>
                        </form>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="row my-2">
            <h4>Add assigment</h4>
        </div>
        <div v-if="notAssignedUsernames.length !== 0">
            <div class="alert alert-primary" role="alert">
                Assigned users can change task status.
            </div>
            <form @submit.prevent="assignUser">
                <div class="form-group">
                    <label for="username">Assign user</label>
                    <select class="form-control" id="username" name="username" v-model="toAssignUsername">
                        <option :key="k" :value="username" v-for="(username,k) in notAssignedUsernames">
                            {{username}}
                        </option>
                    </select>
                </div>
                <button class="btn btn-success" type="submit">Assign</button>
            </form>
        </div>
        <div v-else>
            <h5>All project/team users have been already assigned to this task.</h5>
        </div>
        <div class="row my-2">
            <h3>Delete task</h3>
        </div>
        <form @submit.prevent="deleteTask">
            <button class="btn btn-danger" type="submit">Delete task</button>
        </form>
    </div>
</template>

<script>
    import {userService} from "@/services";
    import {router} from "@/router/router";

    export default {
        name: "ManageTask",
        data() {
            return {
                task: [],
                projectId: '',
                notAssignedUsernames: [],
                name: '',
                startDate: '',
                endDate: '',
                status: '',
                toAssignUsername: ''
            }
        },
        mounted() {
            userService.makeRequestToAPI("/project/task/manageTask", {taskId: this.$route.query.taskId})
                .then((data) => {
                    this.task = data.task;
                    this.notAssignedUsernames = data.notAssignedUsernames;
                    this.name = this.task.name;
                    this.startDate = this.task.startDate;
                    this.endDate = this.task.endDate;
                    this.status = this.task.status;
                    this.projectId = data.projectId;
                });
        },
        methods: {
            editTaskDetails() {
                userService.makeRequestToAPI("/project/task/editTaskDetails", {
                    id: this.$route.query.taskId,
                    name: this.name,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    status: this.status
                }, 'post')
                    .then(function () {
                        location.reload();
                    });
            },
            removeAssignment(username) {
                userService.makeRequestToAPI("/project/task/removeAssignment", {
                    taskId: this.$route.query.taskId,
                    username: username
                }, 'post')
                    .then(function () {
                        location.reload();
                    });
            },
            assignUser() {
                userService.makeRequestToAPI("/project/task/assignUser", {
                    taskId: this.$route.query.taskId,
                    username: this.toAssignUsername
                }, 'post')
                    .then(function () {
                        location.reload();
                    });
            },
            deleteTask() {
                const {projectId} = this;
                userService.makeRequestToAPI("/project/task/deleteTask", {
                    taskId: this.$route.query.taskId,
                }, 'post')
                    .then(function () {
                        router.push({path: '/project/task/taskList', query: {projectId: projectId}});
                        location.reload();
                    });
            }
        }
    }
</script>

<style scoped>

</style>
