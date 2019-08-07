<template>
    <div>
        <h2>Project list for team:<b>{{teamName}}</b></h2>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Task list</th>
                <th scope="col" v-if="isCurrentUserTeamManager">Manage project</th>
            </tr>
            </thead>
            <tr :key="k" v-for="(project, k) in projects">
                <td>{{project.name}}</td>
                <td>
                    <router-link
                            :to="{path: '/project/task/taskList', query: {projectId: project.id}}">
                        <button class="btn btn-primary">Task list</button>
                    </router-link>
                </td>
                <td v-if="isCurrentUserTeamManager">
                    <router-link
                            :to="{path: '/project/manageProject', query: {projectId: project.id}}">
                        <button class="btn btn-warning">Manage project</button>
                    </router-link>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import {userService} from "@/services";

    export default {
        name: "TeamProjectList",
        data() {
            return {
                teamName: '',
                projects: [],
                isCurrentUserTeamManager: false
            }
        },
        mounted() {
            userService.makeRequestToAPI('/team/projectList', {teamId: this.$route.query.teamId})
                .then((data) => {
                    this.teamName = data.teamName;
                    this.projects = data.projects;
                    this.isCurrentUserTeamManager = data.isCurrentUserTeamManager;
                });
        }
    }
</script>

<style scoped>

</style>
