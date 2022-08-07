import { createRouter,createWebHashHistory} from "vue-router"
import Index from '../views/index.vue'
import Tab1 from '../views/tab/tab1.vue'
import Tab2 from '../views/tab/tab2.vue'
import Tab3 from '../views/tab/tab3.vue'
import Tab4 from '../views/tab/tab4.vue'
import Login from '../views/index.vue'
// 路由信息
const routes = [
    {
        path: '/',
        redirect: '/index',
      },
    {
        path: "/index",
        name: "Index",
        component: Index,
        children:[
            {
                path: '/',
                redirect: 'tab1',
            },
            {
            path: "tab1",
            name: "Tab1",
            component: Tab1,
            },
            {
            path: "tab2",
            name: "Tab2",
            component: Tab2,
            },
            {
            path: "tab3",
            name: "Tab3",
            component: Tab3,
            },
            {
            path: "tab4",
            name: "Tab4",
            component: Tab4,
            }
    ]
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
];

// 导出路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
