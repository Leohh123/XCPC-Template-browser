import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue")
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/Register.vue")
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue")
    },
    {
        path: "/settings",
        name: "Settings",
        component: () => import("../views/Settings.vue")
    },
    {
        path: "/item/:id",
        name: "Item",
        component: () => import("../views/Item.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    routes: routes
});

export default router;
