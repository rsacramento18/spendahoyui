import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faCheck);
library.add(faXmark);


const app = createApp(App)

app.use(i18n)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
