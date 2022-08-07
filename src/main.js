import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import axios from './utils/ajax'
import { Button,Tabbar, TabbarItem,Uploader } from 'vant'

const app = createApp(App)
app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Uploader)
app.use(Button)
app.mount('#app')
app.config.globalProperties.axios = axios

