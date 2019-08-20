import Vue from 'vue';
import Router from 'vue-router';
import LoginNew from "@/views/user/LoginNew";
import Home from "@/views/Home";
import MyProjects from "@/views/project/MyProjects";
import TaskList from "@/views/task/TaskList";
import AddProject from "@/views/project/AddProject";
import ManageProject from "@/views/project/ManageProject";
import AddTask from "@/views/task/AddTask";
import ManageTask from "@/views/task/ManageTask";
import MyTeams from "@/views/team/MyTeams";
import ManageTeam from "@/views/team/ManageTeam";
import AddTeam from "@/views/team/AddTeam";
import AddProjectToTeam from "@/views/team/AddProjectToTeam";
import AddProjectToSpecifiedTeam from "@/views/team/AddProjectToSpecifiedTeam";
import TeamProjectList from "@/views/team/TeamProjectList";
import ReceivedMessages from "@/views/message/ReceivedMessages";
import SendMessage from "@/views/message/SendMessage";
import ViewMessage from "@/views/message/ViewMessage";
import SentMessages from "@/views/message/SentMessages";
import Register from "@/views/user/Register";
import Settings from "@/views/user/Settings";


Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: LoginNew},
        {path: '/register', component: Register},
        {path: '/settings', component: Settings},
        {path: '/myProjects', component: MyProjects},

        {path: '/project/addProject', component: AddProject},
        {path: '/project/manageProject', component: ManageProject},

        {path: '/project/task/taskList', component: TaskList},
        {path: '/project/task/addTask', component: AddTask},
        {path: '/project/task/manageTask', component: ManageTask},

        {path: '/team/myTeams', component: MyTeams},
        {path: '/team/manageTeam', component: ManageTeam},
        {path: '/team/addTeam', component: AddTeam},
        {path: '/team/addProjectToTeam', component: AddProjectToTeam},
        {path: '/team/addProjectToSpecifiedTeam', component: AddProjectToSpecifiedTeam},
        {path: '/team/projectList', component: TeamProjectList},

        {path: '/message/receivedMessages', component: ReceivedMessages},
        {path: '/message/sentMessages', component: SentMessages},
        {path: '/message/sendMessage', component: SendMessage},
        {path: '/message/viewMessage', component: ViewMessage},

        {path: '*', redirect: '/'}
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (authRequired && !loggedIn) {
        return next({
            path: '/login',
            query: {returnUrl: to.path}
        });
    }

    next();
});
