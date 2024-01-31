<template>
    <div id="Crumb" v-if="showCrumb">
        <div class="w-fit flex items-center bg-white rounded-full h-7 p-4 pt-1 pb-1 text-xs">
            <NuxtLink to="/">首页</NuxtLink>
            <div class="text-gray-300 mr-1 ml-1">&gt;</div>
            <div v-for="(item, index) in crumbData" :key="index" class="flex">
                <NuxtLink :to="item.route_url">{{ item.name }}</NuxtLink>
                <div class="text-gray-300 mr-1 ml-1" v-if="index < crumbData.length - 1">&gt;</div>
            </div>
        </div>

    </div>
</template>


<script>
export default {
    name: 'Crumb',
    props: {

    },
    data() {
        return {
            menuDatas: GlobalMenuConfig(),
            // showCrumb:false
        }
    },
    computed: {
        crumbData: function () {
            const current_route = this.$router.currentRoute.value
            const full_path = current_route.fullPath
            const routeDatas = []
            if (full_path) {
                const paths = full_path.split("/").slice(1)
                for (let i = 0; i < paths.length; i++) {
                    const page = this.findPageData(paths[i])
                    if(page){
                        routeDatas.push(page)
                    }
                }
                return routeDatas
            }
            return []
        },
        showCrumb:function(){
            const current_route = this.$router.currentRoute.value
            const full_path = current_route.fullPath
            if (full_path) {
                const paths = full_path.split("/")
                if (paths.length > 1) {
                    const page = this.findPageData(paths[paths.length - 1])
                    if(page && page.crumb_config && page.crumb_config.show_crumb==false){
                        return false
                    }
                }
            }
            return true
        }
    },

    mounted() {
        
    },
    
    watch: {

    },
    methods: {
        findPageData: function (route, menuData) {
            // console.log(route, menuData)
            if (!menuData) {
                menuData = this.menuDatas[0].children;
            }

            for (let i = 0; i < menuData.length; i++) {
                const menuItem = menuData[i];
                console.log(menuItem.route_config.partial_name,route)
                if (menuItem.route_config.partial_name === route) {
                    return menuItem;
                } else if (menuItem.children && menuItem.children.length > 0) {
                    const found = this.findPageData(route, menuItem.children);
                    if (found) {
                        return found;
                    }
                }
            }
            return null;
        }

    },
}
</script>

<style lang="scss" scoped>
#Crumb {}
</style>