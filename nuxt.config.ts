import { ReturnIgnoreData, ReturnRenderData } from './utils/route'

const IgnoreData = ReturnIgnoreData()
const RenderData = ReturnRenderData()


export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  // SEO和Meta
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'MetLife',
      meta: [
        { name: 'keywords', content: '我是关键词' },
        { name: 'description', content: '我是描述信息' }
      ],
    }
  },
  // 环境变量配置
  runtimeConfig: {
    // 只能在服务端使用
    apiKey: '',
    // public 下的变量可以在客户端和服务端使用
    public: {
      baseHOST: '',
      meilisearchHOST: '',
      meilisearchKEY: '',
    }
  },
  // 配置scss预加载样式，可全局使用
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/variables.scss" as *;'
        }
      }
    }
  },
  // 样式文件全局引用
  css: [
    '~/assets/css/main.scss', // 全局 scss 混合
    '~/assets/css/main.css' // 全局css
  ],
  // 全局注册组件
  components: {
    global: true,
    dirs: ['~/components']
  },
  // 静态化打包配置
  nitro: {
    prerender: {
      ignore: IgnoreData, // 忽略特定路由不进行渲染
      routes: RenderData, // 指定路由进行渲染
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['nuxt-swiper', 'nuxt-aos','@hypernym/nuxt-anime'],
  swiper: {
    // Swiper options
    //----------------------
    // prefix: 'Swiper',
    // styleLang: 'css',
    // modules: ['navigation', 'pagination', 'effect-creative','autoplay'], // all modules are imported by default
  },
  aos: {
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  },
  anime: {
    // Module options
    composables: true,
    provide: true,
    autoImport: true
  }

})
