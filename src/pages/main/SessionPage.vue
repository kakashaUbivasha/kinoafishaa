<template>
  <div class="flex flex-col w-full m-auto gap-10">
    <div class="relative flex w-full m-auto gap-10 max-[850px]:flex-col">
      <div class="flex items-center absolute top-[10px] left-[10px] gap-3">

      </div>
      <div class="rounded-[8px] overflow-hidden">
        <inner-image-zoom
            className="w-full h-full"
            :hasSpacer="true"
            :src="getServerDomain + this.getSessionDetail.movie_photo_url"
            :zoomSrc="getServerDomain + this.getSessionDetail.movie_photo_url"
        />
      </div>
      <div class="block w-full">
        <h1 class="text-[22px] font-[400] capitalize">{{ this.getSessionDetail.movie_name }}</h1>
        <div class="flex gap-5">
          <p v-for="item in this.getSessionDetail.genres"
             class="text-[15px] font-[400] capitalize text-red-400">
            {{ item }}
          </p>
        </div>
        <p class="break-all text-[#62656a] text-[18px] font-[400] mt-3 capitalize">
          {{ 'Продолжительность ' + this.getSessionDetail.movie_duration + ' мин'}}
        </p>
        <p class="break-all text-[#62656a] text-[18px] font-[400] mt-3 capitalize">
          {{ 'Стоимость ' + formatPrice(this.getSessionDetail.price) + ' сум'}}
        </p>
        <p class="break-all text-[#62656a] text-[18px] font-[400] mt-3 capitalize">
          {{ formatTime(this.getSessionDetail.time)}}
        </p>
      </div>
    </div>

    <div>
      <p class="font-bold text-xl">Описание</p>
      <p class="text-[#62656a] text-[18px] font-[400] mt-3 capitalize">{{ this.getSessionDetail.movie_description }}</p>
    </div>

    <div class="w-full border border-red rounded-xl p-20 max-[800px]:px-3 max-[800px]:pt-5">
      <div class="w-full h-2 bg-primary rounded-xl"></div>
      <p class="w-full text-center mt-10 font-bold text-xl mb-10">Экран</p>
      <div class="flex flex-col gap-5 m-auto max-w-[500px]">
        <div v-for="item in getAllTickets.rows" class="flex w-full">
          <div v-for="jitem in item" class="w-full" @click="this.showTicketModal = true; this.current_seat = {...jitem}; this.current_seat.session_id =item_id">
            <svg :class="{'fill-[#1b7d00] cursor-pointer': jitem.status === 0, 'fill-gray-400': jitem.status === 3, 'fill-[#ff0000]': jitem.status === 1 || jitem.status === 2}" width="20px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- BEGIN: Show Ticket not admin Confirmation Modal -->
    <Transition name="fade">
      <div v-if="showTicketModal && getCurrentUser.role !=='Администратор' && this.current_seat.status === 0" class="main__modal" @click.stop="closeTicketModal">
        <div @click.stop class="main-modal__content">
          <button @click="closeTicketModal" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/ticket.svg">
                <div class="text-3xl mt-5">Вы бронируете</div>
                <div class="text-slate-500 mt-2">
                  {{ this.current_seat.seat }} место в ряду {{this.current_seat.row}}
                </div>
                <div class="mt-5">
                  <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Телефон</label>
                  <input
                      v-model="this.current_seat.phone"
                      type="tel"
                      v-mask="'+998 (##)-###-##-##'"
                      class="w-[400px] max-[500px]:w-full block p-3 w-full border-2 border-solid border-inherit focus:outline-0 focus:border-primary rounded mb-1.5"
                      placeholder="Напишите номер"
                      maxlength="19"
                  />
                </div>
              </div>
              <div class="px-5 pb-8 text-center">
                <button
                    @click="createTicket({fd:this.current_seat, id:item_id}); showTicketModal = false"
                    type="button"
                    class="w-full p-3 bg-green-600 rounded-3xl text-white hover:bg-green-700 transition-all ease-in-out duration-300"
                >
                  Забронировать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- END: Show Ticket not admin Confirmation Modal -->

    <!-- BEGIN: Show Ticket admin Confirmation Modal -->
    <Transition name="fade">
      <div v-if="showTicketModal && getCurrentUser.role ==='Администратор'" class="main__modal" @click.stop="closeTicketModal">
        <div @click.stop class="main-modal__content">
          <button @click="closeTicketModal" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/ticket.svg">
                <div class="text-3xl mt-5">Изменить статус</div>
                <div class="text-slate-500 mt-2 mb-5">
                  {{ this.current_seat.seat }} место в {{this.current_seat.row}} ряду
                </div>
                <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                  <label class="block mr-3 text-left mb-3 text-slate-400">Статус</label>
                  <select
                      v-model="ticket_status"
                      :value="ticket_status"
                      id="tabulator-html-filter-type"
                      class="border-2 border-solid border-inherit rounded-[4px] form-select w-full mt-2 sm:mt-0 sm:w-auto">
                    <option value="2">
                      Куплено
                    </option>
                    <option value="3">
                      Не активно
                    </option>
                  </select>
                </div>
              </div>
              <div class="px-5 pb-8 text-center">
                <button
                    @click="changeTicket({id:item_id ,id_seat:this.current_seat.id, status:ticket_status}); showTicketModal = false"
                    type="button"
                    class="w-full p-3 bg-green-600 rounded-3xl text-white hover:bg-green-700 transition-all ease-in-out duration-300"
                >
                  Забронировать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- END: Show Ticket admin Confirmation Modal -->

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import VInput from "../../components/template/UI/vInput.vue";
import StarRating from 'vue-star-rating'
import InnerImageZoom from 'vue-inner-image-zoom';
import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css'
export default {
  name: "SessionPage",
  data(){
    return {
      item: '',
      item_id: '',
      showTicketModal: false,
      current_seat: {},
      ticket_status: ''
    }
  },
  components: {
    StarRating,
    VInput,
    'inner-image-zoom': InnerImageZoom,
  },
  computed: {
    ...mapGetters(['getSessionDetail', 'getServerDomain', 'getAllTickets', 'getAllTickets', "getAllTickets", 'getCurrentUser'])
  },
  methods: {
    ...mapActions(['loadSessionDetail', 'loadAllTickets', 'createTicket', 'changeTicket']),
    closeTicketModal(){
      this.showTicketModal = false
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
  },
  mounted() {
    this.item = this.getSessionDetail;
    this.item_id = this.$route.params.id;
    this.loadSessionDetail({id:this.$route.params.id});
    this.loadAllTickets({id:this.$route.params.id})
    if (!localStorage.getItem('token')) {
      this.$router.push({name:'register'})
    }
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