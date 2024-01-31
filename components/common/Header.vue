<template>
    <div id="Header" class="sticky top-0 flex w-full justify-center items-center h-16 bg-white">
        <!-- 菜单 -->
        <!-- <div id="menus" class="xl:min-w-inner min-w-full" >
            header
        </div> -->
        <!-- 在PC端显示的菜单 -->
        <div class="hidden lg:block w-full h-full max-w-inner">
            <div class="w-full h-full flex justify-between items-center" >
                <!-- <div class="flex items-center"><img class="w-40" src="/img/metlife-china-logo.png"></div> -->
                <NuxtLink to="/" class="flex items-center"><img class="w-40" src="/img/metlife-china-logo.png"></NuxtLink>
                <div class="flex items-center h-full text-sm " >
                    <!-- PC端菜单内容 -->
                    <ul class="flex h-full" >
                        <li v-for="item in menuDatas[0].children" @mouseenter="showSubMenu(item.id)" class="cursor-pointer mr-8 h-full" >
                            <div class="flex h-full items-center" v-if="item.menu_config.cur_page_in_menu">
                                <NuxtLink :to="item.route_config&&item.route_config.full_link ? item.route_config.full_link : item.route_url">{{ item.menu_config&&item.menu_config.menu_name  ? item.menu_config.menu_name : item.name  }}</NuxtLink>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4" v-if="activeSubMenu === item.id">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4" v-if="activeSubMenu !== item.id">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>

                                <!-- 二级菜单 -->
                                <div v-if="item.children" class="w-full flex justify-center  submenu bg-gray-metlife" :class="{ 'submenu-show': activeSubMenu === item.id }" @mouseleave="hideSubMenu(item.id)">
                                    <!-- 二级菜单内容  menu_full_name 有内容-->
                                    <div class="w-full flex max-w-inner " v-if="item.menu_config.menu_full_name">
                                        <div class="flex items-end  w-2/5 " >
                                            <div class="w-1/2 min-h-64 bg-center menu-pic" :style="{backgroundImage: 'url(' + item.menu_config.menu_pic + ')'}" v-if="item.menu_config.menu_pic"></div>
                                            <div class="w-1/2 h-full pl-8 pt-12 pr-8" >
                                                <div class="text-2xl">
                                                    {{ item.menu_config&&item.menu_config.menu_full_name ? item.menu_config.menu_full_name : item.menu_config.menu_name }}
                                                </div>
                                                <div class="pt-4" v-if="item.menu_config.menu_desc">
                                                    {{ item.menu_config ? item.menu_config.menu_desc : "" }}
                                                </div>
                                                <div class="flex items-center text-metlife-blue pt-4">
                                                    <div>了解更多</div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                    </svg>

                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="w-3/5 flex items-end pt-12">
                                            <ul class="w-full h-full flex flex-wrap justify-start border-solid border-x border-r-0 border-gray-300 pl-8">
                                                <li v-for="subItem in item.children" :key="subItem.id" class="min-h-5 pr-4 mb-5 w-1/3" style="border:0px solid red">
                                                    <div v-if="subItem.menu_config.cur_page_in_menu">
                                                        <NuxtLink class="font-medium" :to="subItem.route_config&&subItem.route_config.full_link ? subItem.route_config.full_link : subItem.route_url">{{ subItem.menu_config&&subItem.menu_config.menu_name ? subItem.menu_config.menu_name : subItem.name }}</NuxtLink>

                                                        <ul class="h-full pt-4">
                                                            <li v-for="thirdItem in subItem.children" :key="subItem.id" class="pb-4">
                                                                <NuxtLink class="flex flex-nowrap " :to="thirdItem.route_config&&thirdItem.route_config.full_link ? thirdItem.route_config.full_link : thirdItem.route_url">{{ thirdItem.name }}</NuxtLink>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </div>

                                    <!-- 二级菜单内容  menu_full_name 无内容-->
                                    <div class="w-full flex max-w-inner" v-else>
                                        <div class="flex items-end  w-1/4 " >
                                            <div class="w-full h-full  pt-12 " >
                                                <ul class="flex flex-col  " >
                                                    <li v-for="subItem in item.children" :key="subItem.id" class="w-full h-10 flex items-center" @mouseenter="hoverThirdMenu(subItem.id)" >
                                                        <NuxtLink  class="font-medium w-full h-full" :class="{'sec-left-menu-active':activeThirdMenu === subItem.id}" :to="subItem.route_config ? subItem.route_config.full_link : subItem.route_url">
                                                            <div class="h-full flex items-center pl-4 font-medium " :class="{'text-white':activeThirdMenu === subItem.id}"> {{ subItem.menu_config&&subItem.menu_config.menu_name  ? subItem.menu_config.menu_name : subItem.name }}
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                                </svg>
                                                            </div>
                                                        </NuxtLink>
                                                    </li>
                                                </ul>
                                                <div class="h-5"></div>
                                                
                                            </div>
                                            
                                        </div>
                                        <div class="w-3/4 flex items-end pt-12" >
                                            <ul class="w-full h-full flex justify-around border-solid border-x border-r-0 border-gray-300 pl-8" >
                                                <li v-for="thirdItem in activeThirdMenuData.children" class="">
                                                    <NuxtLink class="font-medium " :to="thirdItem.route_config.full_link || thirdItem.route_url">{{ thirdItem.menu_config ? thirdItem.menu_config.menu_name : thirdItem.name }}</NuxtLink>
                                                    <ul class="h-full pt-4">
                                                        <li v-for="forthItem in thirdItem.children" :key="forthItem.id" >
                                                            <NuxtLink class="flex flex-nowrap" style="border:1px solid red" :to="forthItem.route_config ? forthItem.route_config.full_link : forthItem.route_url">{{ forthItem.name }}</NuxtLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                           
                                        </div>
                                        
                                    </div>
                                    
                                </div>


                            </div>
                           

                        </li>
                    </ul>
                    <div class="border-l h-4/5 mr-4"></div>
                    <NuxtLink class="flex items-center mr-4 " to="/gsvp">
                    <!-- <div class="flex items-center mr-4" > -->
                            <svg class="h-4 pr-1" version="1.1" id="Icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
                                <circle class="st0" cx="8" cy="4.6" r="3.1"/>
                                <path class="st0" d="M11.5,9c0.8,2.3,1.3,4.6,1.5,7H3c0.2-2.4,0.7-4.7,1.5-7H11.5z"/>
                            </svg>
                        <div>客户自助服务平台</div>
                    <!-- </div> -->
                    </NuxtLink>
                    <div class="flex items-center cursor-pointer" @mouseenter="showSearchView()">
                        <svg class="h-4 " id="Icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>utility-1_search_16p</title><path d="M10.03,0A5.966,5.966,0,0,0,5.2,9.466L.849,13.814,2.47,15.435l4.4-4.4A5.969,5.969,0,1,0,10.03,0Zm0,9.648A3.678,3.678,0,1,1,13.708,5.97,3.682,3.682,0,0,1,10.03,9.648Z" fill="#333"/></svg>
                    </div>
                </div>
                
            </div>
            
        </div>
        

        <!-- 在手机端显示的菜单 -->
        <div class="block lg:hidden">
            <!-- 手机端菜单内容 -->
            <ul>
                <li><a href="#">手机菜单项1</a></li>
                <li><a href="#">手机菜单项2</a></li>
                <!-- ... 其他菜单项 ... -->
            </ul>
        </div>
        <div class="Crumb mt-16  flex justify-center items-end w-full " >
            <div class="w-full h-full max-w-inner mt-6" >
                <CommonCrumb/>
            </div>
            
        </div>
        

    </div>
</template>


<script>
import eventBus from '@/composables/eventBus'
export default {
    name: 'Header',
    props: {
       
    },
    data() {
        return {
            menuDatas:GlobalMenuConfig(),
            activeSubMenu:null,
            activeSubMenuData:[],
            activeThirdMenu:null,
            activeThirdMenuData:[],
            showSearch: false,
            // showCrumb:false
        }
    },
    mounted() {
        console.log(GlobalMenuConfig())
    },
    watch: {

    },
    methods: {
        showSearchView(){
            this.showSearch = true
            this.activeSubMenu = null
            eventBus.emit('showSearch', true);
        },
        showSubMenu(menuId) {
            this.activeSubMenu = menuId;
            // console.log(menuId)
            for(let i=0;i<this.menuDatas[0].children.length;i++){
                if(this.menuDatas[0].children[i].id === menuId && this.menuDatas[0].children[i].children){
                    this.activeThirdMenu = this.menuDatas[0].children[i].children[0].id
                    // console.log(this.activeThirdMenu)
                    this.activeSubMenuData = this.menuDatas[0].children[i]
                    this.activeThirdMenuData = this.menuDatas[0].children[i].children[0]
                    break
                }else{
                }
            }
            // console.log(this.activeThirdMenuData)
            // this.menuDatas[0].children
        },

        hideSubMenu(menuId) {
            this.activeSubMenu = null;
        },

        hoverThirdMenu(menuId){
            // console.log(menuId)
            this.activeThirdMenu = menuId;
            for(let i=0;i<this.activeSubMenuData.children.length;i++){
                if(this.activeSubMenuData.children[i].id === menuId && this.activeSubMenuData.children[i].children){
                    this.activeThirdMenuData = this.activeSubMenuData.children[i]
                    break
                }
            }
            // console.log(this.activeThirdMenuData )
        }
    },
}
</script>

<style lang="scss" scoped>
#Header {
    // border: 1px solid black;
    // box-shadow: 0px 2px 1px 1px 0 rgb(0 0 0 / 0.05);
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, .05);
    // position: absolute;
    z-index: 10;
    // position: fixed;
    
}

#menus {
    border: 1px solid red;
}

.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
//   box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);
  z-index: 20;

  ul {
    list-style: none;
    // padding: 0;

    li {
    //   padding: 8px;
    //   border-bottom: 1px solid #e0e0e0;
    // padding-right: 1rem;
    // margin-left:1rem;
      &:last-child {
        border-bottom: none;
      }

      a {
        color: #333;
        text-decoration: none;
        display: block;
      }
    }
  }
}

.submenu-show {
  display: flex;
}
.menu-pic{
    background-repeat: no-repeat;
    background-size: cover;
}
.sec-left-menu{
    // background: linear-gradient(to right, #0061A0, #007ABC);

}
.sec-left-menu:hover{
    background: linear-gradient(to right, #0061A0, #007ABC);
    color: white;
}
.sec-left-menu-active{
    background: linear-gradient(to right, #0061A0, #007ABC);
    color: white;
}
/* 在全局样式表中 */
.nuxt-link-default {
  color: black;
}

.nuxt-link-default:hover {
  color: white;
}

.Crumb{
    position: absolute;
    z-index: 3;
    top:0;
    left:0;
    // border: 1px solid red;
}

</style>