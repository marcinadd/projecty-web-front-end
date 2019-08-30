<template>
    <div>
        <h2>Send message</h2>
        <form @submit.prevent="sendMessage">
            <div class="form-group">
                <label for="recipientUsername">To: </label>
                <input class="form-control" id="recipientUsername" placeholder="Enter username" type="text"
                       v-model="recipientUsername"/>
            </div>
            <div class="form-group">
                <label for="title">Title: </label>
                <input class="form-control" id="title" placeholder="Enter title" type="text" v-model="title"/>
            </div>
            <div class="form-group">
                <label for="text">Message</label>
                <textarea class="form-control" id="text" placeholder="Enter message" rows="4" v-model="text"></textarea>
            </div>
            <div class="form-group">
                <label for="file">Attachment (optional)</label>
                <input class="form-control-file" id="file" ref="file" type="file" v-on:change="handleFileUpload()">
            </div>
            <div class="form-actions">
                <button class="btn btn-success" type="submit">Send</button>
            </div>
        </form>
    </div>
</template>

<script>
    import {userService} from "@/services";

    export default {
        name: "SendMessage",
        data() {
            return {
                recipientUsername: '',
                title: '',
                text: '',
                file: ''
            }
        },
        methods: {
            handleFileUpload() {
                this.file = this.$refs.file.files[0];
            },
            sendMessage() {
                let formData = new FormData();
                formData.append('recipientUsername', this.recipientUsername);
                formData.append('title', this.title);
                formData.append('text', this.text);
                formData.append('multipartFile', this.file);
                console.log(formData);
                userService.postFormData('/message/sendMessage', formData)
                    .then(() => {
                        console.log("Data pushed");
                    })
            }
        }
    }
</script>

<style scoped>

</style>
