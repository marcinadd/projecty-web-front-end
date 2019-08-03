<template>
    <form @submit.prevent="submitProject" method="post" name="f">
        <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control" id="name" name="name" type="text" v-model="name"/>
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
</template>

<script>
    import {userService} from "@/services";
    import {router} from "@/router/router";
    import EntryUserList from "@/components/EntryUserList";

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
                userService.makeRequestToAPI("/project/addproject", {
                    name: name,
                    usernames: usernames.join(',')
                }, "post")
                router.push('/myProjects');
            }
        }
    }
</script>

<style scoped>

</style>
