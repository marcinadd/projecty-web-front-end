<template>
    <div>
        <form @submit.prevent="addTeam">
            <div class="form-group">
                <label for="name">Name</label>
                <input class="form-control" id="name" type="text" v-model="name">
            </div>
            <div class="form-group">
                <label>Add users</label><br>
                <EntryUserList @inputData="updateInputs"></EntryUserList>
            </div>
            <div class="form-actions">
                <button class="btn btn-success" type="submit">Add</button>
            </div>
        </form>
    </div>
</template>

<script>
    import EntryUserList from "@/components/EntryUserList";
    import {userService} from "@/services";
    import {router} from "@/router/router";

    export default {
        name: "AddTeam",
        components: {EntryUserList},
        data() {
            return {
                name: '',
                inputs: [
                    {
                        username: ''
                    }
                ]
            }
        },
        methods: {
            updateInputs(inputs) {
                this.inputs = inputs;
            },
            addTeam() {
                const {name, inputs} = this;
                const usernames = userService.getUsernamesFromInputs(inputs);
                userService.makeRequestToAPI("/team/addTeam", {
                    name: name,
                    usernames: usernames.join(',')
                }, "post");
                router.push('/team/myTeams');
                location.reload();
            }
        }
    }
</script>

<style scoped>

</style>
