<template>
    <div id="SingleImageBanner" >
        <div class=" w-full h-128 md:h-80 lg:h-96 flex flex-col justify-end" :style="{ backgroundImage: 'url(' + dataObj.photo + ')',backgroundPosition: 'center', backgroundSize: 'cover' }">
            <div class="flex justify-center h-1/3" >
                <div class="w-full max-w-inner" data-aos="fade-up">
                    <div class="" style="border:1px solid red;">
                        <div class="text-white text-4xl">{{ dataObj.name }}</div>
                        <div class="text-white text-2xl">{{ dataObj.description }}</div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'SingleImageBanner',
    props: {
        dataObj: {
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
#SingleImageBanner{
}
</style>