import request from '@/utils/request'

//获取验证码图片
export function ApiCodeImage() {
  return request({
    url: '/auth/getImgCode',
    method: 'get',
    headers: {
      isToken: false,
    },
  })
}

//获取登录公钥
export async function ApiPublicKey() {
  return await request({
    url: '/auth/getPublicKey',
    method: 'get',
    headers: {
      isToken: false,
    },
  })
}

export function ApiLogin(data:any) {
  return request({
    url: '/auth/login',
    headers: {
      isToken: false,
      isRepeatSubmit: true,
    },
    method: 'post',
    data: data
  })
}

// 登录方法
export function ApiLoginKey(data:any) {
  return request({
    url: '/auth/loginKey',
    headers: {
      isToken: false,
      isRepeatSubmit: true,
    },
    method: 'post',
    data: data
  })
}

// 登录方法
export function ApiLogout() {
  return request({
    url: '/auth/logout',
    method: 'get',
  })
}

export function ApiRegister(data:any) {
  return request({
    url: '/auth/register',
    headers: {
      isToken: false,
      isRepeatSubmit: true,
    },
    method: 'post',
    data: data
  })
}

// 登录方法
export function ApiRegisterKey(data:any) {
  return request({
    url: '/auth/registerKey',
    headers: {
      isToken: false,
      isRepeatSubmit: true,
    },
    method: 'post',
    data: data
  })
}


