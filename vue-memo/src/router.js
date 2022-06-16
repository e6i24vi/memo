import { createWebHistory, createRouter } from "vue-router";
import vueHome from "./components/vueHome";
import vueEdit from "./components/vueEdit";
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
        components: {
            default: vueHome,
            sub01: vueEdit,
        },
    },
    {
        path: "/add",
        name: "Add",
        components: {
            default: vueHome,
            sub01: vueAdd,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
