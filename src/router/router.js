import Vue from 'vue';
import Router from 'vue-router';
import LoginNew from "@/views/user/LoginNew";
import Home from "@/views/Home";
import MyProjects from "@/views/project/MyProjects";
import TaskList from "@/views/task/TaskList";
import AddProject from "@/views/project/AddProject";
import ManageProject from "@/views/project/ManageProject";


Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: LoginNew},
        {path: '/myProjects', component: MyProjects},
        {path: '/project/task/taskList', component: TaskList},
        {path: '/project/addProject', component: AddProject},
        {path: '/project/manageProject', component: ManageProject},

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
