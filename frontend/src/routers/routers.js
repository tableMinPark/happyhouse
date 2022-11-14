import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

import mainRouter from "./mainRouter";
import profileRouter from "./profileRouter";

export default new VueRouter({
    mode: 'history',
    routes: [
        ...mainRouter,
        ...profileRouter
    ]
});