<template>
    <div>
        <div :key="k" class="form-group" v-for="(input,k) in inputs">
            <input class="form-control" placeholder="Enter username" type="text" v-model="input.username"
                   v-on:input="dataUpdated">
            <input @click="remove(k)" class="btn btn-danger" type="button"
                   v-show="k || ( !k && inputs.length > 1)" value="-">
            <input @click="add(k)" class="btn btn-success" type="button" v-show="k === inputs.length-1"
                   value="+">
        </div>
    </div>
</template>

<script>
    export default {
        name: "EntryUserList",
        data() {
            return {
                inputs: [
                    {
                        username: ''
                    }
                ]
            }
        },
        methods: {
            add() {
                this.inputs.push({username: ''})
            },
            remove(index) {
                this.inputs.splice(index, 1)
            },
            dataUpdated() {
                this.$emit("inputData", this.inputs);
            }
        }
    }
</script>

<style scoped>

</style>
