<template>
    <div id="ComponentsList">
        <div v-for="(item, index) in dataList" :key="index">
            <component :dataObj="item.data" :is="item.type" />
        </div>
    </div>
</template>


<script>
export default {
    name: 'ComponentsList',
    props: {
        dataList: {
            type: Object
        },
    },
    data() {
        return {
            
        }
    },
    mounted() {
        
    },
    watch: {
        
    },
    methods: {
        
    },
}
</script>

<style lang="scss" scoped>
// 
</style>