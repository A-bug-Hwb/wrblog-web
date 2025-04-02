import Cookies from 'js-cookie'

const TokenKey = 'WrBlog-Token'

const SpaceUrlKey = 'Space-Url'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token:string) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getSpaceUrl() {
    return Cookies.get(SpaceUrlKey)
}

export function setSpaceUrl(spaceUrl:string) {
    return Cookies.set(SpaceUrlKey, spaceUrl)
}

export function removeSpaceUrl() {
    return Cookies.remove(SpaceUrlKey)
}
