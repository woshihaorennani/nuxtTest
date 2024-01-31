<script setup>
// 当前页面路由
let route = useRoute()
console.log(route.path)
let keyWord = await ObtainThroughTouting(route.path)
console.log(keyWord)
let result = {}
let content = null
if(typeof keyWord != "undefined" && keyWord){
    // 动态获取接口数据
    result = await GetArticleDataPublic(keyWord)
    content = result.content
    // SEO优化相关设置
    if(result.seo){
        useSeoMeta({
            title: result.seo.metaTitle,
            ogTitle: result.seo.metaTitle,
            keywords: result.seo.keywords,
            description: result.seo.metaDescription,
            ogDescription: result.seo.metaDescription
        })
    }
}
</script>
<template>
    <div class="page-company">
        公司详情页面id
        <ComponentsList :dataList="content"/>
    </div>
</template>