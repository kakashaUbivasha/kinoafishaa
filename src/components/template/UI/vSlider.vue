<template>
  <div>
    <swiper
    :slides-per-view="1"
    :space-between="50"
    :autoplay="{delay: 1500}"
    :loop="{loop: true}"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    
    :navigation="true"
    :modules="modules"
    :pagination="{
      dynamicBullets: true,
    }"
    class="mx-auto text-center rounded-2xl"
  >
    <swiper-slide
        v-for="item in getNews.results"
        :key="item.id"
    >
      <div class="relative rounded-2xl h-[600px] flex items-center overflow-hidden">
        <img
            class="absolute w-full h-full z-[-1] object-cover"
            :src="getServerDomain + item.photo_url"
            alt="img"
        >
        <div class="absolute top-0 left-0 w-full h-full bg-[#15803DCB] rounded-2xl z-10 opacity-25"></div>
        <div v-if="item.title" class="relative w-4/12 max-lg:w-6/12 max-md:w-full mx-auto rounded-2xl py-8 px-8 z-40 before:content-[''] before:absolute before:top-0 before:left-0 before:block before:w-full before:h-full before:bg-[rgb(100%,_100%,_100%,_0.8)] before:z-[-1] before:blur-[8px] before:rounded-[50px]">
          <h3 class="text-3xl font-bold max-md:text-2xl ">{{ item.title }}</h3>
          <p class="text-xl py-4 max-md:text-lg">{{ item.description }}</p>
<!--          <button type="" class="py-4 my-4 max-md:text-base max-md:w-9/12 max-sm:w-full bg-lime-500 px-8 text-xl rounded-2xl text-white font-bold transition-all ease-in hover:bg-lime-400">В каталог</button>-->
        </div>
      </div>
    </swiper-slide>
<!--    <swiper-slide>-->
<!--      <div class="rounded-2xl h-[500px] flex items-center bg-sliderTwo max-md:px-8 max-sm:px-2 bg-no-repeat	bg-cover relative">-->
<!--        <div class="absolute top-0 left-0 w-full h-full bg-[#15803D33] rounded-2xl z-10 opacity-40"></div>-->
<!--        <div class="relative w-4/12 max-lg:w-6/12 max-md:w-full mx-auto rounded-2xl py-8 px-8 z-40 before:content-[''] before:absolute before:top-0 before:left-0 before:block before:w-full before:h-full before:bg-[rgb(100%,_100%,_100%,_0.8)] before:z-[-1] before:blur-[8px] before:rounded-[50px]">-->
<!--          <h3 class="text-3xl font-bold max-md:text-2xl ">Экономьте с нами</h3>-->
<!--          <p class="text-xl py-4 max-md:text-lg">Покупай больше - плати меньше</p>-->
<!--&lt;!&ndash;          <button type="" class="py-4 my-4 max-md:text-base max-md:w-9/12 max-sm:w-full bg-lime-500 px-8 text-xl rounded-2xl text-white font-bold transition-all ease-in hover:bg-lime-400">В каталог</button>&ndash;&gt;-->
<!--        </div>-->
<!--      </div>-->
<!--    </swiper-slide>-->
<!--    <swiper-slide>-->
<!--      <div class="rounded-2xl h-[500px] flex items-center bg-sliderThree max-md:px-8 max-sm:px-2 bg-no-repeat max-md:bg-right-bottom	bg-cover relative">-->
<!--        <div class="absolute bg-[#15803D33] top-0 left-0 w-full h-full rounded-2xl z-10"></div>-->
<!--        <div class="relative w-4/12 max-lg:w-6/12 max-md:w-full ml-40 max-md:ml-0 rounded-2xl py-8 px-8 z-40 before:content-[''] before:absolute before:top-0 before:left-0 before:block before:w-full before:h-full before:bg-[rgb(100%,_100%,_100%,_0.8)] before:z-[-1] before:blur-[8px] before:rounded-[50px]">-->
<!--          <h3 class="text-3xl font-bold max-md:text-2xl ">Огромный выбор</h3>-->
<!--          <p class="text-xl py-4 max-md:text-lg">дает вам качество, которое вы ожидали</p>-->
<!--&lt;!&ndash;          <button type="" class="py-4 my-4 max-md:text-base max-md:w-9/12 max-sm:w-full bg-lime-500 px-8 text-xl rounded-2xl text-white font-bold transition-all ease-in hover:bg-lime-400">Заказать сейчас</button>&ndash;&gt;-->
<!--        </div>-->
<!--      </div>-->
<!--    </swiper-slide>-->
    </swiper>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation , Autoplay } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/autoplay';
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data(){
      return {
        params: {
          page: 1,
          limit:10000,
        }
      }
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Pagination, Navigation, Autoplay]
      };
    },
    computed : {
      ...mapGetters(['getNews', 'getServerDomain'])
    },
    methods: {
      ...mapActions(['loadNews'])
    },
    mounted() {
      let par = {page:this.params.page, limit:this.params.limit}
      this.loadNews(par)
    }
  }
</script>

<style lang="scss" scoped>
.swiper-button-next,
.swiper-button-prev {
    background-color: rgba(255, 255, 255, 0.5);
    right:10px;
    padding: 30px;
    color: #000 !important;
    fill: black !important;
    stroke: black !important;
}
</style>