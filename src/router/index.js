import {createRouter, createWebHashHistory} from "vue-router"

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "ChatPage",
            component: () => import("@/pages/ChatPage.vue"),
            children: [
                {
                    path: "/:userId",
                    name: "UserChatPage",
                    component: () => import("@/pages/UserChatPage.vue"),
                }
            ]
        },
    ],
})
