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


Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: LoginNew},
        {path: '/myProjects', component: MyProjects},
        {path: '/project/addProject', component: AddProject},
        {path: '/project/manageProject', component: ManageProject},

        {path: '/project/task/taskList', component: TaskList},
        {path: '/project/task/addTask', component: AddTask},
        {path: '/project/task/manageTask', component: ManageTask},

        {path: '/team/myTeams', component: MyTeams},
        {path: '/team/manageTeam', component: ManageTeam},

        // otherwise redirect to home
        {path: '*', redirect: '/'}
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next({
            path: '/login',
            query: {returnUrl: to.path}
        });
    }

    next();
});
