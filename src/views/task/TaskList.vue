<template xmlns:th="http://www.w3.org/1999/xhtml">
    <div>
        <h1> Tasks for project: <b>{{project.name}}</b></h1>
        <div class="container">
            <div class="row">
                <div class="col">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">To do</th>
                        </tr>
                        </thead>
                        <tbody :key="k" v-for="(task,k) in toDoTasks">
                        <tr>
                            <td>
                                <div class="container p-3">
                                    <TaskInfo :hasPermissionToEdit="hasPermissionToEdit" :task="task"></TaskInfo>
                                    <div class="row text-center text-success" v-if="getDayCountToStart(task)>=0">
                                        <p>Days to start: </p>
                                        <p class="text-center">{{getDayCountToStart(task)}}</p>
                                    </div>
                                    <div class="row text-center text-danger" v-else>
                                        <p>Delay (days): </p>
                                        <p class="text-center">{{Math.abs(getDayCountToStart(task))}}</p>
                                    </div>
                                    <div v-if="hasPermissionToEditOrIsAssignedToTask(task)">
                                        <div class="row">
                                            <div class="col">
                                                <form @submit.prevent="changeStatus(task.id, 'IN_PROGRESS')">
                                                    <button class="btn btn-info" type="submit">&gt;</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">In progress</th>
                        </tr>
                        </thead>
                        <tbody :key="k" v-for="(task,k) in inProgressTasks">
                        <tr>
                            <td>
                                <div class="container p-3">
                                    <TaskInfo :hasPermissionToEdit="hasPermissionToEdit" :task="task"></TaskInfo>
                                    <div class="row text-center text-success" v-if="getDayCountToEnd(task)>=0">
                                        <p>Days to end: </p>
                                        <p class="text-center">{{getDayCountToEnd(task)}}</p>
                                    </div>
                                    <div class="row text-center text-danger" v-else>
                                        <p>Delay (days): </p>
                                        <p class="text-center">{{Math.abs(getDayCountToEnd(task))}}</p>
                                    </div>
                                    <div v-if="hasPermissionToEditOrIsAssignedToTask(task)">
                                        <div class="row">
                                            <div class="col">
                                                <form @submit.prevent="changeStatus(task.id, 'TO_DO')">
                                                    <button class="btn btn-info" type="submit">&lt;</button>
                                                </form>
                                            </div>
                                            <div class="col">
                                                <form @submit.prevent="changeStatus(task.id, 'DONE')">
                                                    <button class="btn btn-info" type="submit">&gt;</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">Done</th>
                        </tr>
                        </thead>
                        <tbody :key="k" v-for="(task,k) in doneTasks">
                        <tr>
                            <td>
                                <div class="container p-3">
                                    <TaskInfo :hasPermissionToEdit="hasPermissionToEdit" :task="task"></TaskInfo>
                                    <div v-if="hasPermissionToEditOrIsAssignedToTask">
                                        <div class="row">
                                            <div class="col">
                                                <form @submit.prevent="changeStatus(task.id, 'IN_PROGRESS')">
                                                    <button class="btn btn-info" type="submit">&lt;</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {taskService, userService} from "@/services";
    import TaskInfo from "@/components/TaskInfo";

    export default {
        name: "TaskList",
        components: {TaskInfo},
        data() {
            return {
                toDoTasks: [],
                inProgressTasks: [],
                doneTasks: [],
                project: [],
                hasPermissionToEdit: false
            }
        },
        mounted() {
            userService.makeRequestToAPI("/project/task/taskList", {projectId: this.$route.query.projectId}).then(data => {
                this.toDoTasks = data.toDoTasks;
                this.inProgressTasks = data.inProgressTasks;
                this.doneTasks = data.doneTasks;
                this.project = data.project;
                this.hasPermissionToEdit = data.hasPermissionToEdit;
            });
        },
        methods: {
            getDayCountToStart(task) {
                //const parts = task.startDate.split('-');
                return taskService.getDifferenceInDays(new Date(), new Date(task.startDate))
            },
            getDayCountToEnd(task) {
                return taskService.getDifferenceInDays(new Date(), new Date(task.endDate))
            },
            hasPermissionToEditOrIsAssignedToTask(task) {
                const {hasPermissionToEdit} = this;
                return hasPermissionToEdit || taskService.isAssignedToTask(task);
            },
            changeStatus(taskId, status) {
                userService.makeRequestToAPI("/project/task/changeStatus",
                    {taskId: taskId, status: status}, 'post').then(data => {
                    console.log(data);
                    location.reload();
                })
            }
        }
    }
</script>

<style scoped>

</style>
