<template>
  <div class="flex flex-col w-full m-auto gap-10">
    <div class="relative flex w-full m-auto gap-10 max-[850px]:flex-col">
      <div class="flex items-center absolute top-[10px] left-[10px] gap-3">

      </div>
      <div class="rounded-[8px] overflow-hidden">
        <inner-image-zoom
            className="w-full h-full"
            :hasSpacer="true"
            :src="getServerDomain + this.getMovieItem.photo_url"
            :zoomSrc="getServerDomain + this.getMovieItem.photo_url"
        />
      </div>
      <div class="block w-full">
        <span class="catalog-item__grade mb-3">
          <star-rating :rating="this.getMovieItem.rating || 0" :read-only="true" :increment="0.01" :star-size="16" :glow="3"/>
          <span>
            ({{ formatFeedbaks(this.getMovieItem.feedback_count)}})
          </span>
        </span>
        <h1 class="text-[22px] font-[400] capitalize">{{ this.getMovieItem.name }}</h1>
        <div class="flex gap-5">
          <p v-for="item in this.getMovieItem.genres"
             class="text-[15px] font-[400] capitalize text-red-400">
            {{ item }}
          </p>
        </div>
        <p class="break-all text-[#62656a] text-[18px] font-[400] mt-3 capitalize">{{ this.getMovieItem.description }}</p>
      </div>
    </div>
    <div>
      <h1 id="feedbacks" class="content__title block text-[28px] font-[700] mb-4">Отзывы</h1>
      <button
          @click="openFeedbackModal"
          class="max-w-[250px] w-full mb-[40px] text-[#333532] bg-[#fc5716] hover:text-white hover:bg-[#d24c16] duration-300 ease-in-out font-semibold block my-2 mt-4 p-3 rounded-3xl text-white hover:text-neutral-200 transition-all ease-in-out duration-300"
      >
        Оставить отзыв
      </button>
      <div
          v-for="item in this.getMovieItem.feedbacks"
          :key="item.id"
      >
        <div class="flex items-start gap-5 p-5 pt-10 border-t">
          <img src="/img/user.svg" alt="user" class="w-[50px] h-[50px] rounded-full">
          <div class="flex flex-col gap-1">
            <div class="flex">
              <p class="text-[#242424] text-[16px] font-semibold mr-3">{{ item.user_name }}</p>
              <p class="text-[#868695] text-[16px]">{{ formatTime(item.created_at) }}</p>
            </div>
            <star-rating :rating="item.rating" :read-only="true" :increment="0.01" :star-size="16" :glow="3"/>
            <p class="break-all text-[16px]">{{ item.description }}</p>
          </div>
        </div>
      </div>


      <!-- BEGIN: Пустая страница -->
      <div
          v-if="!getMovieItem.feedback_count"
          class="flex items-center justify-center flex-col py-5"
      >
        <img class="w-[200px]" src="/img/feedback-null.svg" alt="feedbach-null">
        <p class="text-[24px] font-semibold mt-2">Отзывов пока нет</p>
        <p class="font-medium text-gray-400 mt-2">Напишите свой собственный отзыв прямо сейчас!</p>
      </div>
      <!-- END: Пустая страница -->

    </div>

    <!-- BEGIN: Show Cant Confirmation Modal -->
    <Transition name="fade">
      <div v-if="showCantModal" class="main__modal" @click.stop="closeCantModal">
        <div @click.stop class="main-modal__content">
          <button @click="closeCantModal" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/cancel.svg">
                <div class="text-3xl mt-5">Оставить отзыв нельзя</div>
                <div class="text-slate-500 mt-2">
                  Поделиться мнением о фильме можно
                  <br>
                  только после его просмотра
                </div>
              </div>
              <div class="px-5 pb-8 text-center">
                <button
                    @click="closeCantModal"
                    type="button"
                    class="w-full p-3 bg-red-600 rounded-3xl text-white hover:bg-red-700 transition-all ease-in-out duration-300"
                >
                  Понятно, благодарю
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- END: Show Cant Confirmation Modal -->

    <!-- BEGIN: Show Feedback Confirmation Modal -->
    <Transition name="fade">
      <form @submit.prevent="createFeedback2" v-if="showCanModal" action="#" enctype="multipart/form-data" class="main__modal" @click.stop="closeCanModal">
        <div @click.stop class="main-modal__content max-w-[450px] w-full">
          <button @click="closeCanModal" type="button" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img v-if="feedback_form.rating > 0 && feedback_form.rating < 3" class="w-[150px] h-[150px] text-danger mx-auto mt-3" src="/img/sad.svg">
                <img v-if="feedback_form.rating >= 3 && feedback_form.rating < 4" class="w-[150px] h-[150px] text-danger mx-auto mt-3" src="/img/normal.svg">
                <img v-if="feedback_form.rating >= 4 && feedback_form.rating < 5" class="w-[150px] h-[150px] text-danger mx-auto mt-3" src="/img/happy.svg">
                <img v-if="feedback_form.rating === 5" class="w-[150px] h-[150px] text-danger mx-auto mt-3" src="/img/very-happy.svg">
                <img v-if="!feedback_form.rating" class="w-[150px] h-[150px] text-danger mx-auto mt-3" src="/img/feedback.svg">
                <div class="text-3xl mt-5">Оставьте отзыв</div>
                <div class="mt-3 max-w-[300px] w-full m-auto">
                  <div class="form-modal__item">
                    <label for="regular-form-1" class="block text-left mb-3 text-slate-400">Оцените товар</label>
                    <star-rating
                        v-model:rating="feedback_form.rating"
                        :animate="true"
                        :increment="0.5"
                        :active-on-click="true"
                        :clearable="true"
                        :padding="3"
                        :glow="3"
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Описание отзыва</label>
                    <textarea
                        v-model="feedback_form.description"
                        id="regular-form-2"
                        type="textarea"
                        class="block resize-none p-3 w-full h-[150px] border-2 border-solid border-inherit focus:outline-0 focus:border-primary rounded mb-1.5"
                        placeholder="Напишите описание отзыва"
                        required
                    />
                  </div>
                </div>
                <div class="pb-8 text-center flex items-center justify-center gap-5 mt-[20px]">
                  <button @click="closeCanModal" type="button" data-tw-dismiss="modal" class="btn btn-outline-secondary text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">Отмена</button>
                  <button type="submit" class="w-28 p-3 bg-sky-600 rounded-3xl text-white hover:bg-sky-700 transition-all ease-in-out duration-300">Отправить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Transition>
    <!-- END: Show Feedback Confirmation Modal -->

  </div>
</template>

<script>
import VInput from "../../components/template/UI/vInput.vue";
import StarRating from 'vue-star-rating'
import {toast} from "vue3-toastify"
import {mapActions, mapGetters} from "vuex";
import InnerImageZoom from 'vue-inner-image-zoom';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css'

export default {
  name: "ProductPage",
  components: {
    StarRating,
    VInput,
    'inner-image-zoom': InnerImageZoom,
  },
  data() {
    return {
      item_id: '',
      item: {},
      feedbacks: '',
      showCantModal: false,
      showCanModal: false,
      feedback_form: {
        description: '',
        rating: '',
        item_id: this.$route.params.id,
      }
    }
  },
  computed: {
    ...mapGetters(['getServerDomain', 'getMovieItem', 'getBasket', 'getCheckOrder'])
  },
  methods: {
    ...mapActions(['loadCatalogItem', 'addToBasket', 'loadCheckOrder', 'createFeedback']),
    openFeedbackModal(){
      if(this.getCheckOrder){
        this.showCanModal = true
      } else {
        this.showCantModal = true
      }
    },
    closeCantModal(){
      this.showCantModal = false
    },
    closeCanModal(){
      this.showCanModal = false
    },
    createFeedback2(){
      let fd = new FormData();
      fd.append('item_id', this.feedback_form.item_id);
      fd.append('description', this.feedback_form.description);
      fd.append('rating', this.feedback_form.rating);
      let par = {fd: fd, id: this.item_id}
      this.createFeedback(par);
      this.showCanModal = false;
      this.feedback_form.rating = ''
      this.feedback_form.description = ''
    },
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
    addToCart(item){
      if(item.count > 0){
        if (this.getBasket.length) {
          for (let i = 0; i < this.getBasket.length; i++) {
            if (this.getBasket[i].id === item.id) {
              if (this.getBasket[i].quantity < item.count) {
                console.log('hello')
                this.addToBasket(item);
                return
              } else {
                return
              }
            } else {
              this.addToBasket(item);
              return
            }
          }
        } else {
          this.addToBasket(item);
        }
      } else {
        toast.warning("Товаров нет!", {
          autoClose: 1000,
        });
      }
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
    anchorHashCheck() {
      if (window.location.hash === this.$route.hash) {
        const el = document.getElementById(this.$route.hash.slice(1))
        if (el) {
          window.scrollTo(0, el.offsetTop)
        }
      }
    },
  },
  mounted() {
    this.item = this.getCatalogItem;
    this.item_id = this.$route.params.id;
    this.loadCatalogItem({id:this.$route.params.id});
    this.anchorHashCheck();
    this.loadCheckOrder({id: this.item_id})
  },
  watch: {
    getCatalogItem(val){
      this.item_id = val.id
    }
  }
}
</script>

<style scoped>

</style>