<script setup>
// 动态获取接口数据
let result = await GetArticleDataPublic('', '/')
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
</script>
<template>
    <div class="page-index">
        <ComponentsList :dataList="result.content"/>
        <div @click="jump()">跳转公司详情</div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            
        }
    },
    layout: 'default',
    mounted: function () {

    },
    methods: {
        jump(){
            this.$router.push({ path: '/company'});
        },
    },
}
</script>