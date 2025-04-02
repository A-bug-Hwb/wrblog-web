import request from '@/utils/request'

// 获取当前登录用户信息
export function ApiRouters() {
  return request({
    url: '/sys/getRouters',
    method: 'get',
  })
}

// 获取菜单树表
export function ApiSysMenuTree(params: any) {
  return request({
    url: '/sys/sysMenu/getTree',
    method: 'get',
    params: params
  })
}

// 获取菜单详情
export function ApiSysMenuById(menuId: number) {
  return request({
    url: '/sys/sysMenu/' + menuId,
    method: 'get',
  })
}


// 添加菜单
export function ApiAddSysMenu(data: any) {
  return request({
    url: '/sys/sysMenu/add',
    method: 'get',
    data: data
  })
}


// 修改菜单信息
export function ApiEditSysMenu(data: any) {
  return request({
    url: '/sys/sysMenu/edit',
    method: 'put',
    data: data
  })
}


// 删除菜单列表
export function ApiRemoveSysMenu(menuId: string) {
  return request({
    url: '/sys/sysMenu/remove',
    method: 'delete',
    params: {menuId: menuId}
  })
}
