<template>
    <div>
        <h1>Add project</h1>
        <form @submit.prevent="submitProject" method="post" name="f">
            <div class="form-group">
                <label for="name">Name</label>
                <input class="form-control" id="name" name="name" placeholder="Enter project name" type="text"
                       v-model="name"/>
            </div>
            <div class="form-group">
                <label>Add users</label><br>
                <EntryUserList @inputData="updateInputs"></EntryUserList>
            </div>
            <div class="form-group" id="users">

            </div>
            <div class="form-actions">
                <button class="btn btn-info" type="submit">Add project</button>
            </div>
        </form>
    </div>
</template>

<script>
    import {userService} from "@/services";
    import {router} from "@/router/router";
    import EntryUserList from "@/components/EntryUserList";
    import {mappings} from "@/router/mappings";

    export default {
        name: "AddProject",
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
            submitProject() {
                const {name, inputs} = this;
                const usernames = userService.getUsernamesFromInputs(inputs);
                userService.makeRequestToAPI(mappings.ADD_PROJECT, {
                    name: name,
                    usernames: usernames
                }, "post");
                router.push('/myProjects');
            }
        }
    }
</script>

<style scoped>

</style>
