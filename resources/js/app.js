/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

// importing Progress Bar
import VueProgressBar from 'vue-progressbar';
import { Form, HasError, AlertError } from 'vform';
import dashboard from './components/DashboardComponent';
import profile from './components/ProfileComponent';
import users from './components/UsersComponent';
import moment from 'moment';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
window.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

window.Toast = Toast;

window.form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

import VueRouter from 'vue-router'
Vue.use(VueRouter);


// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
let routes = [
    { path: '/admin/dashboard', component: dashboard },
    { path: '/admin/profile', component: profile },
    { path: '/users', component: users },
];

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '4px'
});

Vue.filter('upperCase', function(text) {
    return text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);
});

Vue.filter('miniCase', function(text) {
    return text.toLowerCase().slice(0);
});

Vue.filter('moment', function(time) {
    return moment(time).startOf('seconds').fromNow();
});

Vue.filter('type', function(type) {
    if(type === 0) {
        return 'User';
    } else if(type === 1) {
        return 'Editor';
    } else if(type === 7) {
        return 'Administrator'
    }
});

//let Fire = new Vue();
window.Fire = new Vue();


// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */


// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
    router
}).$mount('#app');
