/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import {registerPlugins} from '@/plugins'

import './permission'; // permission control

// Components
import App from './App.vue'
import "./styles/vuetify.css"

// Composables
import {createApp} from 'vue'
import store from './store';

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
// import "./permission"
import { vuetifyProTipTap } from "./components/Tiptap/tiptap"
const app = createApp(App)
app.use(store);
app.use(vuetifyProTipTap);
app.use(Toast,{
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: "top-center",
});
registerPlugins(app)

app.mount('#app')
