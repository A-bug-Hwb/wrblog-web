import {defineStore} from 'pinia';

const key = "wrblog-settings"
const storageSetting = JSON.parse(localStorage.getItem(key) ?? '{}') || '';
const settingsStore = defineStore(
    'settings',
    {
        state: () => ({
            title: import.meta.env.VITE_APP_TITLE,
            theme: storageSetting.theme || '#409EFF',
            warnTheme: storageSetting.warnTheme || '#fbe49c',
            errTheme: storageSetting.errTheme || '#eb5d4f',
            sideTheme: storageSetting.sideTheme || 'light',
            language: storageSetting.sideTheme || 'ZH_CN',
        }),
        actions: {
            // 修改布局设置
            changeSetting(data: any) {
                localStorage.setItem(key, JSON.stringify(data))
            },
            // 设置网页标题
            setTitle(title: string) {
                this.title = title
                document.title = this.title + ' - ' + import.meta.env.VITE_APP_TITLE;
            },
            switchTheme() {
                this.sideTheme = this.sideTheme === 'light' ? 'dark' : 'light'
                this.changeSetting(this)
            },
        }
    })

export default settingsStore
