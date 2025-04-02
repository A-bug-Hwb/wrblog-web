import {defineStore} from 'pinia';
import {getToken, removeSpaceUrl, removeToken, setSpaceUrl, setToken} from "@/utils/auth";
import {ApiLogin, ApiLoginKey, ApiLogout} from "@/api/auth/auth";
import {ApiUserInfo} from "@/api/sys/user";
import defAva from '@/assets/images/logo/wr-logo.jpg'

const authStore = defineStore(
  'auth',
  {
    state: () => ({
      token: getToken(),
      userId: '',
      ak: '',
      uk: '',
      spaceUrl: '',
      avatar: '',
      roles: [''],
      permissions: [''],
    }),
    actions: {
      login(loginForm: any) {
        return new Promise((resolve, reject) => {
          ApiLogin(loginForm).then((res: any) => {
            setToken(res.data.token)
            this.token = res.data.token
            resolve(res)
          }).catch((error: any) => {
            reject(error)
          })
        })
      },
      loginKey(loginForm: any) {
        return new Promise((resolve, reject) => {
          ApiLoginKey(loginForm).then((res: any) => {
            setToken(res.data.token)
            this.token = res.data.token
            this.ak = loginForm.ak
            resolve(res)
          }).catch((error: any) => {
            reject(error)
          })
        })
      },
      // 获取用户信息
      getInfo() {
        return new Promise((resolve, reject) => {
          ApiUserInfo().then(res => {
            const user = res.data.user
            this.userId = user.userId
            this.uk = user.uk
            this.spaceUrl = user.spaceUrl
            setSpaceUrl(user.spaceUrl)
            this.avatar = (user.avatar === "" || user.avatar === null) ? defAva : user.avatar;
            if (res.data.roles && res.data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              this.roles = res.data.roles
              this.permissions = res.data.permissions
            } else {
              this.roles = ['ROLE_DEFAULT'];
            }
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 退出系统
      logout() {
        return new Promise((resolve, reject) => {
          ApiLogout().then((res) => {
            this.token = ''
            this.userId = ''
            this.avatar = ''
            this.uk = ''
            this.spaceUrl = ''
            this.roles = []
            this.permissions = []
            removeToken()
            removeSpaceUrl()
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  }
)

export default authStore
