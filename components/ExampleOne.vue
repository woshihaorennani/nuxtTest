<template>
    <div id="ExampleOne" class="FlexCenter">
        <div class="width50">
            {{ dataObj.text1 }}
        </div>
        <div class="width50" >
            {{ dataObj.text2}}
        </div>
    </div>
</template>


<script>
export default {
    name: 'ExampleOne',
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
#ExampleOne{
    background: $globalGreen;
}
</style>