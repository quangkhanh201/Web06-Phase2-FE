import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/store"
import vClickOutside from "click-outside-vue3"
import BaseIcon from "@/components/base/BaseIcon"
import BaseInput from "@/components/base/BaseInput"
import BaseButton from "@/components/base/BaseButton"
import BaseCombobox from "@/components/base/BaseCombobox"
import BaseDialog from "@/components/base/BaseDialog"
import BaseLoading from "@/components/base/BaseLoading"

const app = createApp(App)

app.component("base-icon", BaseIcon)
.component("base-input", BaseInput)
.component("base-button", BaseButton)
.component("base-combobox", BaseCombobox)
.component("base-dialog", BaseDialog)
.component("base-loading", BaseLoading)
.use(store)
.use(router)
.use(vClickOutside)
.mount('#app')
