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
                        <tbody th:each="task : ${toDoTasks}">
                        <tr>
                            <td>
                                <div th:replace="fragments/task/task-menu :: task-menu-to-do"></div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">
                                In progress
                            </th>
                        </tr>
                        </thead>
                        <tbody th:each="task : ${inProgressTasks}">
                        <tr>
                            <td>
                                <div th:replace="fragments/task/task-menu :: task-menu-in-progress"></div>
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
                        <tbody th:each="task : ${doneTasks}">
                        <tr>
                            <td>
                                <div th:replace="fragments/task/task-menu :: task-menu-done"></div>
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
    import {userService} from "@/services";

    export default {
        name: "TaskList",
        data() {
            return {
                toDoTasks: [],
                inProgressTasks: [],
                doneTasks: [],
                project: [],
                hasPermissionToEdit: []
            }
        },
        mounted() {
            userService.getData("/project/task/taskList", {projectId: this.$route.query.projectId}).then(data => {
                this.toDoTasks = data.toDoTasks;
                this.inProgressTasks = data.inProgressTasks;
                this.doneTasks = data.doneTasks;
                this.project = data.project;
                this.hasPermissionToEdit = data.hasPermissionToEdit;
            });
        }
    }
</script>

<style scoped>

</style>
