import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App).use(i18n)
console.log(i18n);

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
