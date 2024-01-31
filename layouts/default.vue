<template>
    <div class="text-base">
        <Header></Header>
        <FullSearch></FullSearch>
        <slot />
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "~/components/common/Header.vue"
import Footer from "~/components/common/Footer.vue"
import FullSearch from "~/components/common/FullSearch.vue"
export default {
    components: {
        Header,
        Footer,
        FullSearch
    }
}
</script>
  