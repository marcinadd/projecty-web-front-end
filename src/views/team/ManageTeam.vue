<template xmlns:th="http://www.w3.org/1999/xhtml">
    <div>
        <div class="row mb-3">
            <h2>Manage team: <b>{{team.name}}</b></h2>
        </div>
        <div class="container">
            <div class="row my-2">
                <h3>Change team name</h3>
            </div>
            <form @submit.prevent="changeName">
                <div class="form-group">
                    <label for="newName">New Name:</label>
                    <input :placeholder="team.name" class="form-control" id="newName" type="text" v-model="name">
                </div>
                <button class="btn btn-success" type="submit">Change</button>
            </form>
            <div class="row my-2">
                <h3>Manage roles</h3>
            </div>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Role Name</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Change role</th>

                </tr>
                </thead>
                <tbody :key="k" v-for="(teamRole, k) in teamRoles">
                <tr>
                    <td>{{teamRole.user.username}}</td>
                    <td>{{teamRole.name}}</td>
                    <td>
                        <form @submit.prevent="deleteTeamRole(teamRole.id)" v-if="teamRole.user.id !== currentUser.id">
                            <button class="btn btn-danger" type="submit">Delete</button>
                        </form>
                    </td>
                    <td>
                        <form @submit.prevent="changeTeamRole(teamRole.id,'MEMBER')"
                              v-if="teamRole.name === 'MANAGER'  && teamRole.user.id !== currentUser.id">
                            <button class="btn btn-danger" type="submit">
                                Disable Manager
                            </button>
                        </form>
                        <form @submit.prevent="changeTeamRole(teamRole.id,'MANAGER')"
                              v-if="teamRole.name === 'MEMBER'  && teamRole.user.id !== currentUser.id">
                            <button class="btn btn-success" type="submit">
                                Enable Manager
                            </button>
                        </form>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="row my-2">
                <h3>Add users</h3>
            </div>
            <form @submit.prevent="addUsers">
                <EntryUserList @inputData="updateInputs"></EntryUserList>
                <div class="form-actions">
                    <button class="btn btn-success" type="submit">Add</button>
                </div>
            </form>
            <div class="row my-2">
                <h3>Delete team</h3>
            </div>
            <form @submit.prevent="deleteTeam">
                <button class="btn btn-danger" type="submit">Delete team</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {userService} from "@/services";
    import EntryUserList from "@/components/EntryUserList";
    import {router} from "@/router/router";
    import {mappingHelper, mappings} from "@/router/mappings";

    export default {
        name: "ManageTeam",
        components: {EntryUserList},
        data() {
            return {
                teamId: 0,
                team: [],
                teamRoles: [],
                currentUser: [],
                name: '',
                inputs: [
                    {
                        username: ''
                    }
                ]
            }
        },
        mounted() {
            this.teamId = this.$route.query.teamId;
            userService.makeRequestToAPI(mappingHelper.createTeamMapping(this.teamId) + "?roles=true")
                .then((data) => {
                    this.team = data.team;
                    this.currentUser = data.currentUser;
                    this.teamRoles = data.teamRoles;
                });
        },
        methods: {
            changeName() {
                userService.makeRequestToAPI(mappingHelper.createTeamMapping(this.teamId), {
                    name: this.name
                }, 'patch')
                    .then(function () {
                        location.reload()
                    })
            },
            deleteTeamRole(teamRoleId) {
                userService.makeRequestToAPI(mappingHelper.createTeamRoleMapping(teamRoleId), [], 'delete')
                    .then(function () {
                        location.reload()
                    })
            },
            updateInputs(inputs) {
                this.inputs = inputs;
            },
            addUsers() {
                const usernames = userService.getUsernamesFromInputs(this.inputs);
                userService.makeRequestToAPI(mappingHelper.createTeamMapping(this.teamId) + mappings.TEAM_ROLES,
                    usernames, 'post')
                    .then(function () {
                        location.reload()
                    })
            },
            changeTeamRole(teamRoleId, newRoleName) {
                userService.makeRequestToAPI(mappingHelper.createTeamRoleMapping(teamRoleId), {
                    name: newRoleName
                }, 'patch')
                    .then(function () {
                        location.reload()
                    })
            },
            deleteTeam() {
                const teamId = this.teamId;
                this.$dialog
                    .confirm("You are going to delete team: " + this.team.name + ". Do you want to continue?")
                    .then(function () {
                        userService.makeRequestToAPI(mappingHelper.createTeamMapping(teamId), [], 'delete')
                            .then(function () {
                                router.push('/team/myTeams');
                                location.reload()
                            })
                    });
            }
        }
    }
</script>

<style scoped>

</style>
