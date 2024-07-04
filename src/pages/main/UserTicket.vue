<template>
  <div>
    <div class="mb-5">
      <h1 class="content__title block text-[28px] font-[700] mb-4">Мои билеты</h1>
    </div>
<!--    <vue-timepicker></vue-timepicker>-->

    <user-ticket-item
        v-for="item in getMyTicket.results"
        :item="item"
        @cancelTicket="this.showDeleteModal = true; this.delete_id = item.id"
    />

<!--     BEGIN: Пустая страница-->
        <div
            v-if="!this.getMyTicket.count"
            class="block w-[300px] m-auto py-7"
        >
          <img class="w-[200px]" src="/img/empty-box.svg" alt="empty-box">
          <p class="text-[24px] font-semibold mt-2">Билетов пока нет</p>
        </div>
<!--     END: Пустая страница-->

    <!--    pagination-->
    <div
        v-if="this.getMyTicket.count"
        class="flex items-center justify-end w-full"
    >
      <div class="mt-5">
        <paginate
            v-model="params.page"
            @click="loadPage(params.page)"
            :next-text="'>'"
            :prev-text="'<'"
            :page-range="1"
            :margin-pages="1"
            :page-count="pageCount()"
            :container-class="'flex items-center'"
            :page-class="'paginate-link mx-2 font-gilroy rounded border cursor-pointer border-a-border text-a-border w-[34px] h-[34px] hover:bg-[#15803d] hover:text-white duration-300 easy-in-out'"
        />
      </div>


      <!-- BEGIN: Delete Confirmation Modal -->
      <Transition name="fade">
        <div v-if="showDeleteModal" class="main__modal" @click.stop="closeDeleteModal">
          <div @click.stop class="main-modal__content">
            <button @click="closeDeleteModal" class="modal__icon btn__reset">
              <span class="modal-icon__span"></span>
            </button>
            <div class="modal-content">
              <div class="modal-body p-0">
                <div class="p-5 text-center">
                  <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/cancel.svg">
                  <div class="text-3xl mt-5">Вы уверены?</div>
                  <div class="text-slate-500 mt-2">
                    Вы точно хотите отменить эту бронь?
                    <br>
                    Этот процесс нельзя отменить.
                  </div>
                </div>
                <div class="px-5 pb-8 text-center">
                  <button @click="closeDeleteModal" type="button" data-tw-dismiss="modal"
                          class="text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">Нет
                  </button>
                  <button @click="this.deleteTicket({id:this.delete_id, page:this.params.page, limit:this.params.limit})" type="button"
                          class="w-28 p-3 bg-red-600 rounded-3xl text-white hover:bg-red-700 transition-all ease-in-out duration-300">
                    Да
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <!-- END: Delete Confirmation Modal -->

    </div>
    <!--    end pagination-->

  </div>
</template>

<script>
import VueTimepicker from 'vue3-timepicker'
import {ref} from 'vue'


const phoneNumber = ref()
const results = ref()

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

import Paginate from "vuejs-paginate-next";
import {mapActions, mapGetters} from "vuex";
import SessionItem from "../../components/template/catalog/SessionItem.vue";
import UserTicketItem from "../../components/template/catalog/UserTicketItem.vue";


export default {
  name: "UserDelivery",
  components: {
    UserTicketItem,
    SessionItem,
    Paginate,
    FullCalendar,
    VueTimepicker
  },
  data() {
    return {
      order_status: 'all',
      showDeleteModal: false,
      delete_id: '',
      params: {
        page: 1,
        limit: 10,
      },
      phone: '',

    }
  },
  computed: {
    ...mapGetters(['getMyTicket'])
  },
  methods: {
    ...mapActions(['loadMyTicket', 'updateUserCancelOrder', 'deleteTicket']),
    openDeleteModal(id) {
      this.showDeleteModal = true;
      this.delete_id = id;
    },
    closeDeleteModal() {
      this.showDeleteModal = false
    },
    cancelOrder(id) {
      let par = {id: id, status: 'all', page: this.params.page, limit: this.params.limit}
      this.updateUserCancelOrder(par);
      this.showDeleteModal = false;
    },
    pageCount() {
      return Math.ceil(this.getMyTicket.count / this.params.limit);
    },
    loadPage(page) {
      this.loadMyTicket({status: 'all', page: page, limit: this.params.limit})
    }
  },
  mounted() {
    this.loadMyTicket({page: this.params.page, limit: this.params.limit})
    if (!localStorage.getItem('token')) {
      this.$router.push('error')
    }
  }
}
</script>

<style>
.fc .fc-timegrid-slot {
  height: 50px !important;
}

.fc-daygrid-event {
  padding: 5px 0 5px 10px !important;
}

.last .fc-event-main .fc-event-main-frame .fc-event-title-container .fc-event-title {
  font-weight: 500 !important;
  font-size: 15px !important;
  color: #6562F9;
}

.last .fc-event-main .fc-event-main-frame .fc-event-time {
  font-weight: 500 !important;
  font-size: 15px !important;
  color: #6562F9;
}

.last .fc-daygrid-event-dot {
  border-color: #6562F9 !important;
}

.last {
  display: flex !important;
  gap: 12px !important;
  padding: 15px 15px 0 20px;
  background-color: #E6E6FF !important;
  border: transparent !important;
  border-radius: 6px !important;
  overflow: hidden;
  box-shadow: 0 0 0 1px transparent !important;
}

.last::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 7px;
  height: 100%;
  background-color: #6562F9;
  border-radius: 6px 0 0 6px;
}

.future .fc-event-main .fc-event-main-frame .fc-event-title-container .fc-event-title {
  font-weight: 500 !important;
  font-size: 15px !important;
  color: #E18531;
}

.future .fc-event-main .fc-event-main-frame .fc-event-time {
  font-weight: 500 !important;
  font-size: 15px !important;
  color: #E18531;
}

.future .fc-daygrid-event-dot {
  border-color: #E18531 !important;
}

.future {
  display: flex !important;
  gap: 12px !important;
  padding: 15px 15px 0 20px;
  background-color: #FFE9D4 !important;
  border: transparent !important;
  border-radius: 6px !important;
  overflow: hidden;
  box-shadow: 0 0 0 1px transparent !important;
}

.future::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 7px;
  height: 100%;
  background-color: #E18531;
  border-radius: 6px 0 0 6px;
}
</style>


