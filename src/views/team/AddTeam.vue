<template>
    <div>
        <form @submit.prevent="addTeam">
            <div :key="k" class="alert alert-danger" v-for="(error,k) in errors">
                {{error}}
            </div>
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
    import {mappings} from "@/router/mappings";

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
                ],
                errors: []
            }
        },
        methods: {
            updateInputs(inputs) {
                this.inputs = inputs;
            },
            addTeam() {
                const {name, inputs} = this;
                const usernames = userService.getUsernamesFromInputs(inputs);
                userService.makeRequestToAPI(mappings.TEAMS, {
                    name: name,
                    usernames: usernames
                }, "post")
                    .then(function () {
                        router.push('/team/myTeams');
                        location.reload();
                    }).catch(errors => {
                    this.errors = errors.response.data.errors;
                });
            }
        }
    }
</script>

<style scoped>

</style>
