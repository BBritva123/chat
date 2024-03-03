import { createApp } from "vue"
import vuetify from "@/vuetify"
import router from "@/router"

import App from "@/App.vue"

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount("#app")
