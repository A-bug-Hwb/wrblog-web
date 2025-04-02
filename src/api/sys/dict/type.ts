import request from '@/utils/request'

export function ApiDictTypePageList(params: any) {
  return request({
    url: '/sys/sysDict/type/page',
    method: 'get',
    params: params
  })
}

export function ApiDictTypeById(dictId: number) {
  return request({
    url: '/sys/sysDict/type/' + dictId,
    method: 'get',
  })
}

export function ApiAddDictType(data: any) {
  return request({
    url: '/sys/sysDict/type/add',
    method: 'post',
    data: data
  })
}

export function ApiEditDictType(data: any) {
  return request({
    url: '/sys/sysDict/type/edit',
    method: 'put',
    data: data
  })
}

export function ApiRemoveDictType(dictIds: string) {
  return request({
    url: '/sys/sysDict/type/removes',
    method: 'delete',
    params: {dictIds: dictIds}
  })
}

export function ApiRefreshCacheDict() {
  return request({
    url: '/sys/sysDict/type/refreshCache',
    method: 'delete',
  })
}
