import Vue from 'vue';
import Router from 'vue-router';
import LoginNew from "@/views/user/LoginNew";
import Home from "@/views/Home";


Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: LoginNew},

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
