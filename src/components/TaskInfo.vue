<template>
    <div>
        <div v-if="hasPermissionToEdit">
            <router-link :to="{path: '/project/task/manageTask', query: {taskId: task.id}}">
                <div class="row text-center">{{task.name}}</div>
            </router-link>
        </div>
        <div v-else>
            <div class="row text-center">{{task.name}}</div>
        </div>
        <div class="row text-center">{{task.startDate}}</div>
        <div class="row text-center">{{task.endDate}}</div>
    </div>
</template>

<script>
    export default {
        name: "TaskInfo",
        props: {
            task: {
                required: true
            },
            hasPermissionToEdit: {
                type: Boolean,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
