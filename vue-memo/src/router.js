import { createWebHistory, createRouter } from "vue-router";
import vueHome from "./components/vueHome";
import vueAdd from "./components/vueAdd";
const routes = [
    {
        path: "/",
        name: "Home",
        component: vueHome,
    },
    {
        path: "/edit/:id",
        name: "Edit",
        component: () => import("./components/vueEdit.vue"),
        props: true,
    },
    {
        path: "/add",
        name: "Add",
        component: vueAdd,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
