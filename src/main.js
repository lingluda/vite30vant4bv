import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import axios from './utils/ajax'
import echarts from './utils/echarts'
import { Button,Tabbar, TabbarItem,Uploader,Grid,GridItem,Col,Row,Cell,CellGroup,DatetimePicker,Popup } from 'vant'

const app = createApp(App)
app.use(router)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Uploader)
app.use(Button)
app.use(Grid)
app.use(GridItem)
app.use(Col);
app.use(Row);
app.use(Cell);
app.use(CellGroup);
app.use(DatetimePicker);
app.use(Popup);
app.mount('#app')
app.config.globalProperties.ajax = axios
app.config.globalProperties.echarts = echarts