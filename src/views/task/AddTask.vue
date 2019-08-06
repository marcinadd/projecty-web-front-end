<template>
    <div>
        <p>Add Task to project <u>{{project.name}}</u>
        <p/>
        <form @submit.prevent="submitTask">
            <div class="form-group">
                <label for="name">Name</label>
                <input class="form-control" id="name" type="text" v-model="name"/>
            </div>
            <div class="form-group" id="users"></div>
            <div>
                <label for="startDate">Start date</label>
                <input class="form-control" id="startDate" type="date" v-model="startDate">
            </div>
            <div>
                <label for="startDate">End date</label>
                <input class="form-control" id="endDate" type="date" v-model="endDate">
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

    export default {
        name: "AddTask",
        data() {
            return {
                project: [],
                name: '',
                startDate: '',
                endDate: ''
            }
        },
        mounted() {
            userService.makeRequestToAPI("/project/task/addTask", {projectId: this.$route.query.projectId})
                .then((project) => {
                    this.project = project;
                });
        },
        methods: {
            submitTask() {
                const projectId = this.$route.query.projectId;
                const {name, startDate, endDate} = this;
                userService.makeRequestToAPI("/project/task/addTask", {
                    projectId: projectId,
                    name: name,
                    startDate: startDate,
                    endDate: endDate
                }, 'post')
                    .then(function () {
                        router.push({path: "/project/task/taskList", query: {projectId: projectId}});
                        location.reload();
                    })
            }
        }
    }
</script>

<style scoped>

</style>
