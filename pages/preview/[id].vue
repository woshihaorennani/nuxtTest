<script setup>
// 环境变量
const runtimeConfig = useRuntimeConfig()
// 当前页面路由
let route = useRoute()
let keyWord = route.params.id
console.log("keyWord", route.params, keyWord)

const result = ref(null)

async function getData() {
    let dataArr = {
        id: keyWord
    }
    const response = await axios.post(`${runtimeConfig.public.baseHOST}/api/article/getArticleList`, dataArr)
    if(response.data.data){
        if(response.data.data.content){
            result.value = JSON.parse(response.data.data.content).blocks
            console.log('result',result)
        }
        if(typeof response.data.data.seo != 'undefined'){
            let seo = response.data.data.seo[0]
            useSeoMeta({
                title: seo.metaTitle,
                ogTitle: seo.metaTitle,
                keywords: seo.keywords,
                description: seo.metaDescription,
                ogDescription: seo.metaDescription
            })
        }
    }
}
getData()
</script>
<template>
    <div class="page-company">
        公司详情页面id
        <ComponentsList :dataList="result"/>
    </div>
</template>
