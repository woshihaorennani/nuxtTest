<template>
    <div id="FullSearch" class="sticky top-0 flex w-full justify-center" v-if="showSearch" @mouseleave="hideSearch()">
        <div class="flex flex-col w-full max-w-2xl px-4 py-4 bg-white rounded-lg shadow-md">
            <div class="flex items-center justify-between relative">
                <input v-model="keywords" @keyup.enter="clickSearch()" class="w-full h-10 bg-white border border-gray-200 outline-none focus:outline-none rounded-full pr-32 pl-14" placeholder="请输入需要搜索的关键词"/>
                <div class="absolute left-5">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 9.16667C3.5 6.03705 6.03705 3.5 9.16667 3.5C12.2963 3.5 14.8333 6.03705 14.8333 9.16667C14.8333 10.6891 14.2329 12.0713 13.256 13.0895C13.2255 13.1136 13.1961 13.1397 13.1679 13.1679C13.1397 13.1961 13.1136 13.2255 13.0895 13.256C12.0713 14.2329 10.6891 14.8333 9.16667 14.8333C6.03705 14.8333 3.5 12.2963 3.5 9.16667ZM13.8347 15.2489C12.5419 16.2426 10.9233 16.8333 9.16667 16.8333C4.93248 16.8333 1.5 13.4009 1.5 9.16667C1.5 4.93248 4.93248 1.5 9.16667 1.5C13.4009 1.5 16.8333 4.93248 16.8333 9.16667C16.8333 10.9233 16.2426 12.5419 15.2489 13.8347L18.2071 16.7929C18.5976 17.1834 18.5976 17.8166 18.2071 18.2071C17.8166 18.5976 17.1834 18.5976 16.7929 18.2071L13.8347 15.2489Z"></path></svg>
                </div>
                <button class="absolute right-6 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center" @click="clickSearch()">
                    搜索
                </button>
            </div>
            <div class="flex flex-col w-full mt-2 h-60 overflow-y-auto scrollbar-hidden">
                <div class="flex flex-col w-full bg-gray-200 text-white rounded-md mt-2 p-3 cursor-pointer" v-for="(item, index) in searchResults" :key="index" @click="SearchInfo(item)">
                    <div class="truncate">
                        {{ item.name }}
                    </div>
                    <div class="truncate">
                        {{ item.updatedAt }}
                    </div>
                </div>
                <div class="flex flex-col w-full bg-gray-200 text-white rounded-md mt-2 p-3 text-center" v-if="searchResults.length === 0">
                    暂无数据
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import eventBus from '@/composables/eventBus'
import { MeiliSearch } from 'meilisearch'
export default {
    name: 'FullSearch',
    data() {
        return {
            showSearch: false,
            runtimeConfig: useRuntimeConfig(),
            searchResults: [],
            keywords: '',
        }
    },
    mounted() {
        eventBus.on('showSearch', (data) => {
            this.showSearch = data
            this.keywords = ''
            this.doSearch()
        });
    },
    methods: {
        SearchInfo(item){
            let jump_url = PassThroughIdBackRoute(item.id)
            this.$router.push({ path: jump_url})
        },
        hideSearch(){
            this.showSearch = false
        },
        clickSearch(){
            this.doSearch()
        },
        async doSearch(){
            const client = new MeiliSearch({
                host: `${this.runtimeConfig.public.meilisearchHOST}`, // 从环境变量或配置中获取 MeiliSearch 的地址
                apiKey: `${this.runtimeConfig.public.meilisearchKEY}`, // 可选，如果你的 MeiliSearch 实例设置了 API 密钥
            })
            try {
                // 使用 MeiliSearch 客户端执行搜索
                const index = client.index('article') // 替换为你的索引名称
                const searchResults = await index.search(
                    this.keywords,
                    {
                        filter: ['search_config.can_be_search = true'],
                        limit: 1000
                    }
                ) // 替换为你的搜索词
                console.log('MeiliSearch数据集合', searchResults.hits)
                this.searchResults = searchResults.hits
            } catch (err) {
                console.error(err)
            }
        }
    },
}
</script>

<style lang="scss" scoped>
#FullSearch {
    position: fixed;
    top: 64px;
    left: 0;
    width: 100%;
    z-index: 9999999999
}
.scrollbar-hidden {
    scrollbar-width: none; /* 对于Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    &::-webkit-scrollbar {
        display: none; /* 对于Webkit浏览器（如Chrome, Safari） */
    }
}
</style>