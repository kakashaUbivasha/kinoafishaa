<template>
  <div class="catalog__item max-w-[300px] w-full h-full block max-[568px]:max-w-[100%] max-[568px]:block">
    <div
        class="catalog-item__link"
    >
      <div class="w-full">
        <router-link
            :to="{name: 'product', params:{id:item.id}}"
            class="cursor-pointer"
        >
          <img :src="getServerDomain + item.photo_url" alt="Text" class="catalog-item__img" :title="item.name">
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
                :to="{name: 'product', params:{id:item.id}}"
                class="cursor-pointer"
            >
              <h3 class="catalog-item__title h-[31px] inline-block hover:text-green-900 duration-300 ease-in-out capitalize">
                {{ formatName(item.name) }}
              </h3>
            </router-link>
            <span class="catalog-item__grade">
              <star-rating :rating="item.rating || 0" :read-only="true" :increment="0.01" :star-size="16" :glow="3"/>
              <span>
                ({{ formatFeedbaks(item.feedback_count)}})
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import {mapGetters} from 'vuex'
import {toast} from "vue3-toastify";

export default {
  name: "CatalogItem",
  props: {
    item: Object
  },
  data() {
    return {
      // count: 0,
      // basket: [],
    }
  },
  components: {
    StarRating
  },
  computed: {
    ...mapGetters(['getCurrentUser','getServerDomain', 'getBasket'])
  },
  methods: {
    formatName(data){
      let text = '';
      if(data.length > 30){
        text = data.slice(0, 29) + '...'
        return text
      } else {
        return data
      }
    },
    formatPrice(data) {
      let numb = data;
      const numbFmt = new Intl.NumberFormat('ru-RU').format(numb);
      return numbFmt;
    },
    addToCart(data) {
      if (this.getBasket.length) {
        for (let i = 0; i < this.getBasket.length; i++) {
          if (this.getBasket[i].id === data.id) {
            if (this.getBasket[i].quantity < data.count) {
              console.log('hello')
              this.$emit('addToCart', data)
              return
            } else {
              toast.warning('Вы добавили все товары!', {autoClose: 2000})
              return
            }
          } else {
            this.$emit('addToCart', data)
            return
          }
        }
      } else {
        this.$emit('addToCart', data)
      }
    },
    editItem(data){
      this.$emit('editItem', data)
    },
    deleteItem(data){
      this.$emit('deleteItem', data)
    },
    formatFeedbaks(data){
      if (data){
        if(data === 1){
          return data + ' отзыв'
        } else if (1 < data < 5) {
          return data + ' отзыва'
        } else {
          return data + ' отзывов'
        }
      } else {
        return '0 отзывов'
      }
    },
    // addElement(item){
    //   if(item.my_count>=1){
    //           if(item.my_count < item.count)
    //           item.my_count = Number(item.my_count) + 1
    //         }
    //         else item.my_count = 1;
    //         for(let i=0; i < this.basket.length; i++){
    //           if(this.basket[i].id === item.id){
    //             this.basket[i].count += 1
    //             console.log(this.basket)
    //             window.localStorage.setItem('basket', JSON.stringify(this.basket))
    //             return
    //           }
    //         }
    //         this.basket.push({id: item.id, count: 1})
    //         console.log(this.basket)
    //         window.localStorage.setItem('basket', JSON.stringify(this.basket))
    // },
    // removeElement(item){
    //   if(item.my_count){
    //           if(Number(item.my_count) > 0){
    //             item.my_count-=1;
    //           }
    //         }else item.my_count = 0
    //   for(let i=0; i < this.basket.length; i++){
    //           if(this.basket[i].id === item.id){
    //             this.basket[i].count -= 1
    //             window.localStorage.setItem('basket', JSON.stringify(this.basket))
    //             return
    //           }
    //         }
    // },
    // formatRating(){
    //   let min = 4;
    //   let max = 5;
    //   return ((Math.random() * (max - min)) + min).toFixed(2);
    // },
    // formatFeedback(){
    //   let min = 5;
    //   let max = 10;
    //   return (Math.floor(Math.random() * (max - min)) + min);
    // }
  }
}
</script>

<style>

</style>