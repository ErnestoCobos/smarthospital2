/**
 * Jquery
 */

window.$ = window.jQuery = require('jquery');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.tokenfrsc = document.head.querySelector('meta[name="csrf-token"]');

if (tokenfrsc) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = tokenfrsc.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

/**
 * Now we are going to mount all our application
 *
 */

import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from 'element-ui/lib/locale/lang/en'


import App from "./main";
import store from './global/store'
import router from './global/router'
Vue.config.productionTip = false;
Vue.use(ElementUI, {locale});

const app = new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router
});