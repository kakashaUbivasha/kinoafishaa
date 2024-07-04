<template>
  <div class="block mt-auto bg-[#e73900] h-full w-full py-10 px-10 max-sm:px-4 text-white mt-10">
    <div class="max-w-container px-10 mx-auto max-[800px]:px-2">
      <v-footer-nav/>
      <div class="text-center text-white opacity-[0.7] mt-[50px] mx-auto w-6/12 text-sm max-lg:my-10">
        <p>{{ new Date().getFullYear() }} © KINOAFISHA — сайт продажи кинобилетов. Все права защищены.</p>
      </div>
    </div>
  </div>
</template>

<script>
import vFooterNav from './UI/vFooterNav.vue';
  export default {
    components: {
      vFooterNav
    }
  }
</script>

<style lang="scss" scoped>

</style>