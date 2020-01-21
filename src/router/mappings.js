export const mappings = {
    MY_PROJECTS: "/projects",
    ADD_PROJECT: "/projects",

    TASKS: "/tasks",
    TASKS_PROJECT: "/tasks/project/",
    TASK_ASSIGN: "assign",

    MESSAGES: "/messages/",
    RECEIVED_MESSAGES: "receivedMessages",
    SENT_MESSAGES: "sentMessages",
    SEND_MESSAGE: "sendMessage",
    VIEW_MESSAGE: "viewMessage",

    TEAMS: "/teams/",
    TEAM_LEAVE: "leave",
    TEAM_ROLES: "roles",
    TEAM_PROJECTS: "projects",

    TEAMROLES: "/teamRoles/",

    CHAT: "/chat/",
    NOTIFICATIONS: "/notifications/"
};

export const mappingHelper = {
    createProjectMapping,
    createTaskMapping,
    createTeamMapping,
    createTeamRoleMapping
};

function createProjectMapping(projectId) {
    return "/projects/" + projectId + "/"
}

function createTaskMapping(taskId) {
    return "/tasks/" + taskId + "/"
}

function createTeamMapping(teamId) {
    return mappings.TEAMS + teamId + "/";
}

function createTeamRoleMapping(teamRoleId) {
    return mappings.TEAMROLES + teamRoleId + "/";
}
