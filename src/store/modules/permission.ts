import auth from '@/plugins/auth';
import router, {constantRoutes, dynamicRoutes} from '@/router';
import Layout from '@/layout/index.vue';
import ParentView from '@/components/ParentView/index.vue';
import InnerLink from '@/components/InnerLink/index.vue';
import {defineStore} from 'pinia';
import type {RouteRecordRaw} from 'vue-router';
import {ApiRouters} from "@/api/sys/menu";

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('@/pages/**/*.vue');

const permissionStore = defineStore('permission', {
    state: (): {
        routes: RouteRecordRaw[];
        addRoutes: RouteRecordRaw[];
        navigationBarRoutes: RouteRecordRaw[];
    } => ({
        routes: [],
        addRoutes: [],
        navigationBarRoutes: []
    }),
    actions: {
        setRoutes(routes: RouteRecordRaw[]) {
            this.addRoutes = routes;
            // @ts-ignore
            this.routes = constantRoutes.concat(routes);
        },
        setNavigationBarRoutes(routes: RouteRecordRaw[]) {
            this.navigationBarRoutes = routes;
        },
        generateRoutes(routes?: RouteRecordRaw[]) {
            return new Promise<any[]>(resolve => {
                // 向后端请求路由数据
                ApiRouters().then(res => {
                    const sdata = JSON.parse(JSON.stringify(res.data));
                    const rdata = JSON.parse(JSON.stringify(res.data));
                    const navigationBarRoutes = filterAsyncRouter(sdata);
                    const rewriteRoutes = filterAsyncRouter(rdata, false, true);
                    const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
                    asyncRoutes.forEach(route => {
                        router.addRoute(route);
                    });
                    this.setRoutes(rewriteRoutes);
                    this.setNavigationBarRoutes(constantRoutes.concat(navigationBarRoutes));
                    resolve(rewriteRoutes);
                });
            });
        },
    },
});

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap: any[], lastRouter: any = {}, type = false) {
    return asyncRouterMap.filter(route => {
        if (type && route.children) {
            route.children = filterChildren(route.children);
        }
        if (route.component) {
            // Layout ParentView 组件特殊处理
            if (route.component === 'Layout') {
                route.component = Layout;
            } else if (route.component === 'ParentView') {
                route.component = ParentView;
            } else if (route.component === 'InnerLink') {
                route.component = InnerLink;
            } else {
                route.component = loadView(route.component);
            }
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, route, type);
        } else {
            delete route['children'];
            delete route['redirect'];
        }
        return true;
    });
}

function filterChildren(childrenMap: any[], lastRouter: any = false) {
    let children: any[] = [];
    childrenMap.forEach((el, index) => {
        if (el.children && el.children.length) {
            if (el.component === 'ParentView' && !lastRouter) {
                el.children.forEach((c: any) => {
                    c.path = el.path + '/' + c.path;
                    if (c.children && c.children.length) {
                        children = children.concat(filterChildren(c.children, c));
                        return;
                    }
                    children.push(c);
                });
                return;
            }
        }
        if (lastRouter) {
            el.path = lastRouter.path + '/' + el.path;
        }
        children = children.concat(el);
    });
    return children;
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes: any[]) {
    const res: any[] = [];
    routes.forEach(route => {
        if (route.permissions) {
            if (auth.hasPermiOr(route.permissions)) {
                res.push(route);
            }
        } else if (route.roles) {
            if (auth.hasRoleOr(route.roles)) {
                res.push(route);
            }
        }else {
            res.push(route);
        }
    });
    return res;
}

export const loadView = (view: any) => {
    let res;
    for (const path in modules) {
        const dir = path.split('pages/')[1].split('.vue')[0];
        if (dir === view) {
            res = () => modules[path]();
        }
    }
    return res;
};

export default permissionStore;
