import { GlobalMenuConfig } from './menu'


// 获取指定页面数据
export async function GetArticleDataPublic(id = '', keyWord = '') {
    if(!id && !keyWord){
        return null
    }
    let query = {}
    if (keyWord){
        query.keyWord = keyWord
    }
    if (id){
        query.id = id
    }
    // 环境变量
    const runtimeConfig = useRuntimeConfig()
    // 服务端异步接口请求
    let result = await useAsyncData(
        'getlist',
        () => $fetch(`${runtimeConfig.public.baseHOST}/api/article/getArticleList`,{
        method: "post",
            body: query
        }),
    )
    let resData = {
        seo: null,
        content: []
    }
    // 返回数据处理
    if (result.data.value.data){
        if(result.data.value.data.content){
            resData.content = JSON.parse(result.data.value.data.content).blocks
            // console.log('content----',resData.content)
        }
        if(typeof result.data.value.data.seo != 'undefined'){
            resData.seo = result.data.value.data.seo[0]
            // console.log('seo----',resData.seo)
        }
    }
    return resData
}

// 通过路由返回页面特定参数
export function ObtainThroughTouting(keyWord, objData = []) {
    if(objData.length == 0) {
        objData = GlobalMenuConfig()
    }
    for (const item of objData) {
        if (item.route_url === keyWord) {
            return item.id
        }
        
        if (item.children && item.children.length > 0) {
            const foundInChildren = ObtainThroughTouting(keyWord, item.children);
            if (foundInChildren) {
                return foundInChildren
            }
        }
    }

    return null
}

// 通过文章id返回指定路由
export function PassThroughIdBackRoute(keyWord, objData = []) {
    if(objData.length == 0) {
        objData = GlobalMenuConfig()
    }
    for (const item of objData) {
        if (item.id === keyWord) {
            return item.route_url
        }
        
        if (item.children && item.children.length > 0) {
            const foundInChildren = PassThroughIdBackRoute(keyWord, item.children);
            if (foundInChildren) {
                return foundInChildren
            }
        }
    }
    return null
}