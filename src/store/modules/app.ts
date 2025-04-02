import {defineStore} from 'pinia';
import Cookies from 'js-cookie'

const key = "wrblog-settings"
const appStore = defineStore(
    'app',
    {
        state: () => ({
            sidebar: {
                opened: Cookies.get('sidebarStatus') ? !!+(Cookies.get('sidebarStatus') ?? '') : true,
                hide: false,
            },
            device: 'desktop',
            size: Cookies.get('size') || 'default',
        }),
        actions: {
            toggleSideBar() {
                this.sidebar.opened = !this.sidebar.opened;
                if (this.sidebar.opened) {
                    Cookies.set('sidebarStatus', '1');
                } else {
                    Cookies.set('sidebarStatus', '0');
                }
            },
            openSideBar() {
                if (!this.sidebar.opened){
                    this.sidebar.opened = true;
                    Cookies.set('sidebarStatus', '1');
                }
            },
            toggleDevice(device: string) {
                this.device = device;
            },
        }
    })

export default appStore
