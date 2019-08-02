<template xmlns="http://www.w3.org/1999/html">
    <form @submit.prevent="submitProject" method="post" name="f">
        <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control" id="name" name="name" type="text" v-model="name"/>
        </div>
        <div class="form-group">
            <label>Add users</label><br>
            <div :key="k" class="form-group" v-for="(input,k) in inputs">
                <input class="form-control" type="text" v-model="input.username">
                <input @click="remove(k)" class="btn btn-danger" type="button"
                       v-show="k || ( !k && inputs.length > 1)" value="-"/>
                <input @click="add(k)" class="btn btn-success" type="button" v-show="k === inputs.length-1"
                       value="+"/>
            </div>
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

    export default {
        name: "AddProject",
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
            add(index) {
                this.inputs.push({username: ''})
            },
            remove(index) {
                this.inputs.splice(index, 1)
            },
            submitProject() {
                const {name, inputs} = this;
                const usernames = [];
                for (let i = 0; i < inputs.length; i++) {
                    usernames.push(inputs[i].username);
                }
                userService.getData("/project/addproject", {name: name, usernames: usernames.join(',')}, "post")
                    .then(
                        router.push('/myProjects')
                    )
            }
        }
    }
</script>

<style scoped>

</style>
