<template>
  <div class="catalog__item max-w-[300px] w-full h-full block max-[568px]:max-w-[100%] max-[568px]:block">
    <div
        class="catalog-item__link"
    >
      <div class="w-full">
        <router-link
            :to="{name: 'sessions-catalog-page', params:{id:item.id}}"
            class="cursor-pointer"
        >
          <img :src="getServerDomain + item.movie_photo_url" alt="Text" class="catalog-item__img" :title="item.movie_name">
        </router-link>
        <div class="absolute top-[10px] left-[10px] gap-3">
          <div
              v-if="item.age_limit === 18"
              class="bg-red-500 w-[40px] top-0 rounded-lg"
          >
            <img class="block w-[50px] h-[50px]" src="/img/age-limit.svg" alt="rating">
          </div>
        </div>
      </div>
      <div class="catalog-item__content  relative p-4">
        <div class="flex max-lg:flex-col gap-x-5 ">
          <div class="text-start">
            <router-link
                :to="{name: 'sessions-catalog-page', params:{id:item.id}}"
                class="cursor-pointer"
            >
              <h3 class="catalog-item__title text-xl text-strong h-[31px] !leading-7 inline-block hover:text-green-900 duration-300 ease-in-out capitalize">
                {{ 'Сеанс на фильм "' + item.movie_name + '"' }}
              </h3>
              <p> {{ 'Продолжительность ' + item.movie_duration + " мин" }}</p>
              <p> {{ 'Помещение:  ' + item.hall_name }}</p>
              <p> {{ 'Цена:  ' + formatPrice(item.price) + ' сум'}}</p>
              <p> {{ formatTime(item.time)}}</p>
            </router-link>
            <span class="catalog-item__grade">
              <star-rating :rating="item.rating || 0" :read-only="true" :increment="0.01" :star-size="16" :glow="3"/>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import {mapGetters} from "vuex";
export default {
  name: "SessionsCatalogItem",
  props: {
    item: Object
  },
  components:{
    StarRating
  },
  computed: {
    ...mapGetters(['getServerDomain'])
  },
  methods:{
    formatPrice(data) {
      let numb = data;
      const numbFmt = new Intl.NumberFormat('ru-RU').format(numb);
      return numbFmt;
      },
      formatTime(data){
        let full_data = data;
        let full_data_time = new Date(full_data)
        let options = {year:"numeric", month:'short', day:'numeric', hour:'numeric', minute:'numeric'}

        return full_data_time.toLocaleString('ru', options)
      },
  },
  mounted() {

  }

}
</script>

<style scoped>

</style>