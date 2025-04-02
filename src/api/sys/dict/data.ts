import request from '@/utils/request'

export function ApiDictDataPageList(params: any) {
    return request({
        url: '/sys/sysDict/data/page',
        method: 'get',
        params: params
    })
}

export function ApiDictDataByType(dictType: string) {
    return request({
        url: '/sys/sysDict/data/list/' + dictType,
        method: 'get',
    })
}

export function ApiDictDataById(dictCode: number) {
    return request({
        url: '/sys/sysDict/data/' + dictCode,
        method: 'get',
    })
}

export function ApiAddDictData(data: any) {
    return request({
        url: '/sys/sysDict/data/add',
        method: 'post',
        data: data
    })
}

export function ApiEditDictData(data: any) {
    return request({
        url: '/sys/sysDict/data/edit',
        method: 'put',
        data: data
    })
}

export function ApiRemoveDictData(dictCodes: string) {
    return request({
        url: '/sys/sysDict/data/removes',
        method: 'delete',
        params: {dictCodes: dictCodes}
    })
}
