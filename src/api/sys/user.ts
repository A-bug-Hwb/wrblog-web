import request from '@/utils/request'

// 获取当前登录用户信息
export function ApiUserInfo() {
  return request({
    url: '/sys/getUserInfo',
    method: 'get',
  })
}
