<template>
  <div class="flex flex-col justify-between min-h-[100vh] w-full">
    <v-header
        :cart_info="getBasket"
        class="px-10 py-8 max-lg:py-2 max-lg:px-2"
    />
    <div class="block max-w-container w-full px-10 max-sm:px-4 py-10 mx-auto max-[800px]:px-2">
      <router-view></router-view>
    </div>
    <v-footer/>
    <v-scroll-button/>
    <Preloader></Preloader>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import vHeader from '../components/template/vHeader.vue'
import vFooter from '../components/template/vFooter.vue'
import vScrollButton from '../components/template/UI/vScrollButton.vue';
import Preloader from "../components/template/UI/Preloader.vue";

export default {
  components: {
    Preloader,
    vHeader,
    vFooter,
    vScrollButton
  },
  computed: {
    ...mapGetters(['getBasket'])
  },
  methods: {
    ...mapActions(['addToBasket2', 'addAllBasket' , 'loadCurrentUser'])
  },
  mounted() {
    if(localStorage.getItem('cart')){
      let data = JSON.parse(localStorage.getItem('cart'))
      this.addAllBasket(data)
      // for (let item of data){
      //   console.log(item)
      //   this.addToBasket2(item)
      // }
    }
    // this.loadCurrentUser();
  },
}
</script>

<style lang="scss" scoped>

</style>