<template>
    <div id="Footer" class="pt-10" >
        <div class="hidden lg:block " >
            <!-- sitemap -->
            <div class="flex justify-center pb-10">
                <div class="w-full max-w-inner-s" >
                    <NuxtLink to="/" class="flex"><img class="w-32 mb-10" style="margin-left:-0.8rem" src="/img/metlife-china-logo.png"></NuxtLink>
                    <ul class="flex w-full h-full justify-between"  >
                        <li v-for="item in levelMenus" @mouseenter="showSubMenu(item.id)" class="cursor-pointer" >
                            <div class="flex flex-col w-full" v-if="item && item.menu_config && item.menu_config.cur_page_in_menu">
                                <NuxtLink class="font-medium text-sm" :to="item.route_config&&item.route_config.full_link ? item.route_config.full_link : item.route_url">{{ item.menu_config&&item.menu_config.menu_name  ? item.menu_config.menu_name : item.name  }}</NuxtLink>

                                <!-- 二级菜单 -->
                                <div v-if="item.children" class="w-full flex  " :class="{ 'submenu-show': activeSubMenu === item.id }" @mouseleave="hideSubMenu(item.id)">
                                    <div class="w-full flex max-w-inner">
                                        <div class="flex items-end  w-full " >
                                            <div class="w-full h-full  pt-4 " >
                                                <ul class="flex flex-col " style="border:0px solid red">
                                                    <li v-for="subItem in item.children" :key="subItem.id" class="w-full h-10 flex " @mouseenter="hoverThirdMenu(subItem.id)" >
                                                        <div v-if="subItem.menu_config.cur_page_in_menu">
                                                                <NuxtLink  class="w-full h-full" :class="{'sec-left-menu-active':activeThirdMenu === subItem.id}" :to="subItem.route_config&&subItem.route_config.full_link  ? subItem.route_config.full_link : subItem.route_url">
                                                                <div class="h-full flex items-center text-sm" :class="{'text-white':activeThirdMenu === subItem.id}"> {{ subItem.menu_config&&subItem.menu_config.menu_name  ? subItem.menu_config.menu_name : subItem.name }}
                                                                    
                                                                </div>
                                                            </NuxtLink>
                                                        </div>
                                                        
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>


                            </div>
                           

                        </li>
                    </ul>
                </div>
            </div>

            <!-- info -->
            <div class="w-full flex justify-center bg-gray-100 text-xs pt-8 pb-16">
                <!-- <div class="w-full max-w-screen-xl bg-gray-100" > -->
                
                <div class="w-full max-w-inner-s space-y-4" >
                    <div class="flex items-center font-medium mb-8 " >
                        <svg class="mr-2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="16" height="16"><path d="M289.103444 67.119677c17.175171 0.066515 31.840172 1.620917 41.769312 8.950859 12.68388 9.363252 27.325345 38.59297 40.596604 70.302159 13.659091 32.636305 25.867134 67.898413 32.996508 86.830601 5.055133 13.424754 21.980617 53.651944 16.907065 72.599482-9.543354 35.632545-57.501622 35.68678-71.604828 65.637929-10.822486 22.984481 10.677177 50.925856 19.890003 65.637929 16.591887 26.494421 35.499515 51.071166 55.16746 74.922387 24.531719 29.749558 50.244334 58.371432 74.119091 88.177272 26.134217 32.627095 57.906851 70.828139 94.478791 92.489484 47.960315 28.40698 69.844741-67.99358 122.076336-49.974182 55.4458 19.128663 57.101509 20.399609 100.902084 52.590775 6.176676 4.539386 22.291702 14.119579 38.317701 26.482141 23.192212 17.891486 48.800449 41.494043 53.965076 51.456952 10.253528 19.783579 0.898463 46.990221-6.961552 62.653969-21.88545 43.61331-54.374398 79.173201-95.473445 103.428627-54.018288 31.881105-118.154004 15.858176-174.195368-12.125155-44.597731-22.269189-84.070744-52.111868-109.239983-71.414493-41.297568-31.671327-79.121012-66.965158-114.475218-104.708783-27.854395-29.737278-54.174853-60.994166-79.45461-93.198635-28.646434-36.494169-57.627489-72.115458-84.885296-109.497856-33.17661-45.499263-63.800072-93.607958-88.159876-149.075247-22.437012-51.089585-69.121264-163.648151-29.835516-230.726895 23.802102-40.641629 67.228147-71.433936 113.37414-89.505523C254.649747 73.072249 272.614911 73.751724 289.103444 67.119677z"></path></svg>
                        <div>全国统一服务（投诉）热线：<a href="tel:4008188168">400 818 8168</a></div>
                        <div class="relative" >
                            <svg @click="showHideQR" class="w-6 ml-4 cursor-pointer" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="32" height="32"><path d="M690.1 377.4c5.9 0 11.8 0.2 17.6 0.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6 5.5 3.9 9.1 10.3 9.1 17.6 0 2.4-0.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-0.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-0.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4 0.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-0.1 17.8-0.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8z m-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1z m-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1z" ></path><path d="M866.7 792.7c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-0.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7 2.4 0 4.7-0.9 6.4-2.6 1.7-1.7 2.6-4 2.6-6.4 0-2.2-0.9-4.4-1.4-6.6-0.3-1.2-7.6-28.3-12.2-45.3-0.5-1.9-0.9-3.8-0.9-5.7 0.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9z m179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c-0.1 19.8-16.2 35.9-36 35.9z" ></path></svg>
                            <div @click="showHideQR" class="absolute left-0 w-36 h-40 flex flex-col justify-center items-center p-4 bg-white" style="border:1px solid #ccc;top:-10rem" v-if="showQRCode">
                                <div>大都会人寿官微</div>
                                <img src="/public/img/wechat-qr-code.png"/>
                                <div>打开手机微信APP</div>
                                <div>立刻扫描关注</div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="font-medium space-x-6">
                        <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备06044553号</a>    <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011502013434" target="_blank">沪公网安备 31011502013434号</a>    <NuxtLink to="/privacy-policy" target="_blank">隐私政策</NuxtLink>    <NuxtLink to="/copyright-notice" target="_blank">版权声明</NuxtLink>     <NuxtLink to="/privacy-policy" target="_blank">证照公示</NuxtLink>
                    </div>
                    <div class="font-medium space-x-6">
                        <a href="https://sh.gsxt.gov.cn/index.html" target="_blank">企业信用信息公示</a> 
                        <a href="https://www.iachina.cn/col/col71/index.html" target="_blank">中保协产品库</a> 
                        <a href="https://webcert.cnmstl.net/cert/grade?sn=a6470b36f92511ecb22b00163e068ceb" target="_blank">网站安全认证证书</a> 
                    </div>
                    <div>
                        该网站已支持IPv6
                    </div>
                    
                </div>
            </div>
            
        </div>

        <!-- 在手机端显示的footer -->
        <div class="lg:hidden">
            mobile footer
        </div>
    </div>
</template>


<script>
export default {
    name: 'Footer',
    props: {
        dataObj: {
            type: Object
        },
    },
    data() {
        return {
            menuDatas:GlobalMenuConfig(),
            activeSubMenu:null,
            activeThirdMenu:null,
            showQRCode:false
        }
    },
    computed: {
        levelMenus: function () {
        // 过滤出 menu_config.cur_page_in_menu 为 true 的项
            // return this.menuDatas[0].filter(item => item.menu_config && item.menu_config.cur_page_in_menu === true);
            // 使用 Array.from 转换为数组
            const arrayData = GlobalMenuConfig();
            
            // 或者使用展开运算符
            // const arrayData = [...this.menuDatas[0]];

            // // 使用 filter 进行过滤
            const a = arrayData[0].children.filter(item => item.menu_config && item.menu_config.cur_page_in_menu === true);
            console.log(arrayData[0].children,a)
            return a

        },
    },

    mounted() {

    },
    watch: {
        
    },
    methods: {
        showHideQR(){
            this.showQRCode = !this.showQRCode
        }
    },
}
</script>

<style lang="scss" scoped>
#Footer{
}
</style>