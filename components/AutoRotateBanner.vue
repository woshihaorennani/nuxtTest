<template>
    <div id="AutoRotateBanner" >
        <div class=" w-full h-80 md:h-96 lg:h-128 flex flex-col justify-end swiper-holder" :style="{ backgroundImage: 'url(' + dataObj.photo + ')',backgroundPosition: 'center', backgroundSize: 'cover' }">
            <div class="flex justify-center h-full swiper" >
                <Swiper
                    :modules="[ SwiperAutoplay,SwiperNavigation, SwiperEffectCreative,SwiperEffectFade ]"
                    :slides-per-view="1"
                    :autoplay="{
                        delay: delay,
                        disableOnInteraction: true,
                    }"
                    :creative-effect="{
                        prev: {
                            shadow: false,
                            translate: ['-20%', 0, -1],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }"
                    :effect="'fade'"
                    @slideChangeTransitionEnd="handleSwiperSlideChange"
                    @slideChangeTransitionStart="handleSwiperSlideStart"
                    @init="handleSwiperInit"
                    :loop="true"
                    ref="swiperRef"
                    >
                    <SwiperSlide v-for="item in dataObj.photos">
                        <div class="w-full h-full bg-cover bg-center flex flex-col justify-start items-center slide-content" :style="{ 'background-image': 'url(' + item.photo + ')'}">
                                <div class="w-full max-w-inner h-3/5" ></div>
                                <div class="w-full max-w-inner " style="border:1px solid red">
                                    <h2 class="font-bold text-white text-3xl py-4 slide-content-slogan" >{{ item.slogan }}</h2>
                                </div>
                                <div class="w-full max-w-inner "  v-if="item.bLabel" >
                                    <button class="text-white bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded slide-content-bn">
                                        {{ item.bLabel }}
                                    </button>
                                </div>
                                <div class="w-full max-w-inner h-1/5" ></div>
                               
                        </div>
                        
                    </SwiperSlide>
                </Swiper>
                
            </div>
             <div class="w-full h-24 flex justify-center swiper-preloader" >
                
                <div class="w-full max-w-inner flex justify-end" >
                    <div class="w-10 h-10 flex justify-center items-center" v-if="!isSwiperPaused">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                        <circle id="circle" cx="25" cy="25" :r="circleR" ></circle>
                        </svg>
                    </div>
                    
                    <div class="w-10 h-10 flex justify-center items-center cursor-pointer" v-if="isSwiperPaused" @click="playSwiper">
                        <svg fill="white" class="slide-play" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="16" height="16"><path d="M820.053 473.316l-527.929-327.68c-29.582-18.205-68.266 4.55-68.266 38.684v655.36c0 34.133 38.684 56.889 68.266 38.684l525.654-327.68c31.858-15.928 31.858-61.44 2.275-77.368z" ></path></svg>
                    </div>
                    <div class="w-10 h-10 flex justify-center items-center cursor-pointer" v-else @click="pauseSwiper">
                        <svg  class="slide-pause" fill="white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="16" height="16"><path d="M941.9824 109.728l0 804.576q0 14.848-10.848 25.728t-25.728 10.848l-292.576 0q-14.848 0-25.728-10.848t-10.848-25.728l0-804.576q0-14.848 10.848-25.728t25.728-10.848l292.576 0q14.848 0 25.728 10.848t10.848 25.728zM429.9824 109.728l0 804.576q0 14.848-10.848 25.728t-25.728 10.848l-292.576 0q-14.848 0-25.728-10.848t-10.848-25.728l0-804.576q0-14.848 10.848-25.728t25.728-10.848l292.576 0q14.848 0 25.728 10.848t10.848 25.728z" ></path></svg>
                    </div>
                    <div class=" h-10 flex justify-center items-center">
                        <div class="w-10 h-10 flex justify-center items-center cursor-pointer" @click="goToPrevSlide">
                            <svg fill="white" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  width="16" height="16"><path d="M737.9 888.2L361.7 512l376.2-376.2c16.4-16.4 16.4-43.1 0-59.5s-43.1-16.4-59.5 0L295.8 458.9c-14.2 14.2-22 33-22 53.1s7.8 38.9 22 53.1l382.6 382.6c16.4 16.4 43.1 16.4 59.5 0 16.4-16.5 16.4-43.1 0-59.5z" ></path></svg>
                        </div>
                        <div class="w-5 h-10 flex justify-center items-center">
                            {{ swiperIndex }}
                        </div>
                       <div >/</div>
                       <div class="w-5 h-10 flex justify-center items-center">
                        {{ dataObj.photos ? dataObj.photos.length : '' }}
                        </div>
                        <div class="w-10 h-10 flex justify-center items-center cursor-pointer" @click="goToNextSlide">
                            <svg class="icon" fill="white" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M286.1 135.8L662.3 512 286.1 888.2c-16.4 16.4-16.4 43.1 0 59.5s43.1 16.4 59.5 0l382.6-382.6c14.2-14.2 22-33 22-53.1s-7.8-38.9-22-53.1L345.6 76.3c-16.4-16.4-43.1-16.4-59.5 0-16.4 16.5-16.4 43.1 0 59.5z" ></path></svg>
                        </div>
                        
                        
                    </div>
                    

                </div>
            </div>
            <div class="w-full h-20 flex justify-center swiper-title-holder" v-if="title">
                <div class="w-full max-w-inner h-full bg-white flex items-center title" >
                    <div class="text-black w-1/3 font-medium p-5">
                        {{ title }}
                    </div>
                    <div class="text-black border-black border-x border-r-0 p-5">
                        {{subtitle}}
                    </div>
                </div>

            </div>
            
        </div>
        
    </div>
</template>


<script >
// const { $anime } = useNuxtApp()
import { useAnime } from '#anime'
export default {
    name: 'AutoRotateBanner',
    props: {
        dataObj: {
            type: Object
        },
    },
    data() {
        return {
            delay:3000,
            circleR:10,
            isSwiperPaused:false,
            swiper:null,
            swiperIndex:1,
            title:'',
            subtitle:''
        }
    },
    mounted() {
        
    },
    watch: {
        
    },
    methods: {
        handleSwiperInit(swiper){
            // console.log(swiper)
            this.swiper = swiper
            if(this.dataObj.photos[0]){
                this.title = this.dataObj.photos[0].title
                this.subtitle = this.dataObj.photos[0].subtitle
            }
        },
 
        handleSwiperSlideChange(e) {
            // console.log('Swiper 滚动结束',e);
            const index = e.activeIndex
           
            this.swiperIndex = e.realIndex+1
            const activeSlide = e.slides[index];
            // console.log(index)
            // data-swiper-slide-index
            // $anime({ targets: '.slogan', translateX: 250, duration: 800 })
            // 使用相对于当前轮播项的选择器
            // 使用 :first-child 选择当前活动幻灯片的第一个子元素
            const slogan = activeSlide.querySelector('.slide-content .slide-content-slogan');
            const bn = activeSlide.querySelector('.slide-content .slide-content-bn');
            if (slogan) {
                useAnime({ targets: slogan, translateX: [1000,0],opacity:[0,1], duration: 1000 ,easing:'easeOutExpo'});
            }
            if (bn) {
                useAnime({ targets: bn, translateX: [1000,0],opacity:[0,1], duration: 1100 ,easing:'easeOutExpo'});
            }
            
            // useAnime({ targets: '.slogan', translateX: 250, duration: 800 })
            
            
        },
        handleSwiperSlideStart(e){
            
            if(this.dataObj.photos[e.realIndex]){
                this.title = this.dataObj.photos[e.realIndex].title
                this.subtitle = this.dataObj.photos[e.realIndex].subtitle
            }
            useAnime({
                targets: '#circle',
                // strokeDasharray: [0, 251.2], // 总路径长度（2 * Math.PI * 半径）
                // strokeDasharray: [0, this.circleR * 2 * Math.PI], // 总路径长度（2 * Math.PI * 半径）
                strokeDashoffset: [useAnime.setDashoffset, 0], // 动画路径从起点到终点
                easing: 'easeInOutSine',
                // direction:'reverse',
                duration: this.delay,
                // delay: 500, // 可选，延迟 500 毫秒开始动画
            });
        },
        pauseSwiper(){
            this.isSwiperPaused = true; 
            if(this.swiper){
                this.swiper.autoplay.stop()
            }
            
        },
        playSwiper(){
            this.isSwiperPaused = false; 
            if(this.swiper){
                this.swiper.autoplay.start()
            }
        },
        goToPrevSlide() {
            if (this.swiper) {
                this.swiper.slidePrev();
            }
        },

        goToNextSlide() {
            if (this.swiper) {
                this.swiper.slideNext();
            }
        },
    },
}
</script>

<style lang="scss" scoped>
#AutoRotateBanner{
    .swiper-holder{
        // border:1px solid red;
        position: relative;
        background: red;
        width: 100%;
        z-index: 1;
    }

    .swiper-preloader{
        border:1px solid blue;
        position: absolute;
        z-index: 1;
        color: white;
        bottom:0;

    }
    #circle {
      stroke: white; /* 圆环的颜色 */
      fill: none;
      stroke-width: 4; /* 圆环的宽度 */
      stroke-linecap: round; /* 圆环两端的形状 */
      transform: rotate(-90deg); /* 将圆环旋转使起点位于顶部 */
      transform-origin: 50% 50%; /* 旋转的中心点 */
    }
    .icon-pause{
        color: white;
    }
    .swiper-title-holder{
        border:1px solid green;
        position: absolute;
        z-index: 2;
        color: white;
        bottom:-2.5rem;
    }
    .title{

    }
    .swiper {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%)
    }
}



</style>