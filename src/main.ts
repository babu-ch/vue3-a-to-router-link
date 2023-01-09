import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router"
import Home from "./components/Home.vue"
import PageA from "./components/PageA.vue"
import PageB from "./components/PageB.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home,
        },
        {
            path: "/a",
            component: PageA,
        },
        {
            path: "/b",
            component: PageB,
        },
    ],
})

createApp(App).use(router).mount('#app')
