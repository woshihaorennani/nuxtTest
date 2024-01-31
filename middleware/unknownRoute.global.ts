// 访问不存在路由重定向至首页
export default defineNuxtRouteMiddleware((to, from) => {
    // console.log("路由信息",to, from)
    if(!to.matched.length){
        // return navigateTo('/')
    }
})