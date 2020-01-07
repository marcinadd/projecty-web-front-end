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
                <label for="files">Attachments (optional)</label>
                <input class="form-control-file" id="files" multiple ref="files" type="file" v-on:change="updateFiles">
            </div>
            <div class="form-actions">
                <button class="btn btn-success" type="submit">Send</button>
            </div>
        </form>
    </div>
</template>

<script>

    import {userService} from "@/services/UserService";
    import {router} from "@/router/router";
    import {mappings} from "@/router/mappings";

    export default {
        name: "SendMessage",
        data() {
            return {
                selectedChatUsername: '',
                title: '',
                text: '',
                files: ''
            }
        },
        methods: {
            updateFiles() {
                this.files = this.$refs.files.files;
            },
            sendMessage() {
                let formData = new FormData();
                formData.append('recipientUsername', this.selectedChatUsername);
                formData.append('title', this.title);
                formData.append('text', this.text);
                for (let i = 0; i < this.files.length; i++) {
                    let file = this.files[i];
                    formData.append('multipartFiles', file);
                }
                formData.append('multipartFiles', this.files);
                // FIXME Fix sending message
                userService.postFormData(mappings.MESSAGES + mappings.SEND_MESSAGE, formData)
                    .then(() => {
                        router.push('/message/sentMessages');
                        location.reload();
                    })
            }
        }
    }
</script>

<style scoped>

</style>
