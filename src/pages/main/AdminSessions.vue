<template>
  <div>
    <div class="mb-5">
      <h1 class="content__title block text-[28px] font-[700] mb-4">Все сеансы</h1>
      <button
          @click="openCreateModal"
          class="bg-gradient-to-r from-[#e84202] via-primary to-[#fc5716] block my-2 mt-4 w-80 p-3 rounded-3xl text-white hover:text-neutral-200 transition-all ease-in-out duration-300 max-[540px]:w-[100%]"
      >
        Добавить сеанс
      </button>
    </div>

    <div>
      <div class="users__table relative rounded-xl overflow-auto">
        <div class="my-8 flex flex-col gap-5">
          <session-item
              v-for="item in getAllSessions.results"
              :item="item"
              @openEditModal="showEditModal = true; this.current_session = {...item}; this.current_session_id = item.id"
              @openDeleteModal="openDeleteModal(item.id)"
          />
          <!-- BEGIN: Пустая страница -->
            <div
                v-if="!this.getAllSessions.count"
                class="block w-[300px] m-auto py-7"
            >
              <img class="w-[200px] m-auto" src="/img/film-camera.svg" alt="empty-box">
              <p class="text-[24px] font-semibold mt-2 ml-7">Сеансов пока нет</p>
            </div>
          <!-- END: Пустая страница -->
      </div>
    </div>

      <!--    pagination-->
    <div
        v-if="this.getAllSessions.count"
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
            :page-class="'paginate-link mx-2 font-gilroy rounded border cursor-pointer border-a-border text-a-border w-[34px] h-[34px] hover:bg-primary hover:text-white duration-300 easy-in-out'"
        />
      </div>
    </div>
      <!--    end pagination-->

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
                    Вы точно хотите удалить этого пользователя?
                    <br>
                    Этот процесс нельзя отменить.
                  </div>
                </div>
                <div class="px-5 pb-8 text-center">
                  <button @click="closeDeleteModal" type="button" data-tw-dismiss="modal" class="text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">Отмена</button>
                  <button @click="deleteSession2({delete_id:this.delete_id, page:this.params.page})" type="button" class="w-28 p-3 bg-red-600 rounded-3xl text-white hover:bg-red-700 transition-all ease-in-out duration-300">Удалить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <!-- END: Delete Confirmation Modal -->

      <!-- BEGIN: Edit Confirmation Modal -->
      <Transition name="fade">
        <form @submit.prevent="updateSession" action="#" enctype="multipart/form-data" v-if="showEditModal" class="main__modal" @click.stop="closeEditModal">
          <div @click.stop class="main-modal__content">
            <button @click="closeEditModal" type="button" class="modal__icon btn__reset">
              <span class="modal-icon__span"></span>
            </button>
            <div class="modal-content">
              <div class="modal-body p-0">
                <div class="p-5 text-center">
                  <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/edit.svg">
                  <div class="text-3xl mt-5 mb-3">Измените текущий сеанс</div>
                  <div class="form__modal">
                    <div class="form-modal__item">
                      <label for="regular-form-1" class="block text-left mb-3 text-slate-400">Фильм</label>
                      <select
                          v-model="current_session.movie_id"
                          :value="current_session.movie_id"
                          class="border-2 border-solid border-inherit rounded-[4px] w-full mt-2">
                        <option
                            v-for="item in getAllMovies.results"
                            :key="item.id"
                            :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                    <div class="form-modal__item">
                      <label class="block mr-3 text-left mb-3 text-slate-400">Зал</label>
                      <select
                          v-model="current_session.hall_id"
                          :value="current_session.hall_id"
                          class="border-2 border-solid border-inherit rounded-[4px] w-full mt-2">
                        <option
                            v-for="item in getAllHalls"
                            :key="item.id"
                            :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                    <div class="form-modal__item">
                      <label for="regular-form-3" class="block text-left mb-3 text-slate-400">Цена</label>
                      <v-input
                          v-model="current_session.price"
                          :value="current_session.price"
                          id="regular-form-3"
                          type="number"
                          class="form-control"
                          placeholder="Оставьте пустым если не хотите менять"
                      />
                    </div>
                  </div>
                </div>
                <div class="px-5 pb-8 text-center">
                  <button @click="closeEditModal" type="button" data-tw-dismiss="modal" class="btn btn-outline-secondary text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">Отмена</button>
                  <button type="submit" class="w-28 p-3 bg-amber-500 rounded-3xl text-white hover:bg-amber-600 transition-all ease-in-out duration-300">Сохранить</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Transition>
      <!-- END: Edit Confirmation Modal -->

      <!-- BEGIN: Create Confirmation Modal -->
      <Transition name="fade">
        <form @submit.prevent="addNewSession" action="#" enctype="multipart/form-data" v-if="showCreateModal"
              class="main__modal" @click.stop="closeCreateModal">
          <div @click.stop class="main-modal__content">
            <button @click="closeCreateModal" type="button" class="modal__icon btn__reset">
              <span class="modal-icon__span"></span>
            </button>
            <div class="modal-content">
              <div class="modal-body p-0">
                <div class="p-5 text-center">
                  <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/create.svg">
                  <div class="text-3xl mt-5 mb-3">Создайте новый сеанс</div>
                  <div class="form__modal">
                    <div class="form-modal__item">
                      <label for="regular-form-1" class="block text-left mb-3 text-slate-400">Фильм</label>
                      <select
                          v-model="session_form.movie_id"
                          :value="session_form.movie_id"
                          class="border-2 border-solid border-inherit rounded-[4px] w-full mt-2">
                        <option
                            v-for="item in getAllMovies.results"
                            :key="item.id"
                            :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                    <div class="form-modal__item">
                      <label class="block mr-3 text-left mb-3 text-slate-400">Зал</label>
                      <select
                          v-model="session_form.hall_id"
                          :value="session_form.hall_id"
                          class="border-2 border-solid border-inherit rounded-[4px] w-full mt-2">
                        <option
                            v-for="item in getAllHalls"
                            :key="item.id"
                            :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                    <div class="form-modal__item">
                      <label for="regular-form-3" class="block text-left mb-3 text-slate-400">Цена</label>
                      <v-input
                          v-model="session_form.price"
                          :value="session_form.price"
                          id="regular-form-3"
                          type="number"
                          class="form-control"
                          placeholder="Стоимость билета"
                      />
                    </div>
                    <div class="form-modal__item">
                      <label for="regular-form-3" class="block text-left mb-3 text-slate-400">Время</label>
                      <v-input
                          v-model="session_form.time"
                          :value="session_form.time"
                          id="regular-form-3"
                          type="datetime-local"
                          class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="px-5 pb-8 text-center">
                  <button @click="closeCreateModal" type="button" data-tw-dismiss="modal"
                          class="btn btn-outline-secondary text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">Отмена
                  </button>
                  <button type="submit" class="w-28 p-3 bg-sky-600 rounded-3xl text-white hover:bg-sky-700 transition-all ease-in-out duration-300">Сохранить</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Transition>
      <!-- END: Create Confirmation Modal -->
  </div>
  </div>
</template>

<script>
import VInput from "../../components/template/UI/vInput.vue";
import Paginate from "vuejs-paginate-next";
import {mapActions, mapGetters} from "vuex";
import OrderItem from "../../components/template/catalog/OrderItem.vue";
import SessionItem from "../../components/template/catalog/SessionItem.vue";
export default {
  name: "Deliveries",
  components: {
    SessionItem,
    OrderItem,
    Paginate,
    VInput
  },
  data(){
    return {
      search_value: '',
      params: {
        page: 1,
        limit: 10,
      },
      showDeleteModal: false,
      delete_id: '',
      current_session: {},
      current_session_id: -1,
      showEditModal: false,
      session_form: {
        movie_id: '',
        hall_id: '',
        price: '',
        time: ''
      },
      showCreateModal: false,
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getAllSessions', 'getAllHalls', 'getAllMovies'])
  },
  methods: {
    ...mapActions(['deleteSession', 'loadAllSessions', 'searchDelivery', 'loadCurrentUser', 'loadAllHalls', 'loadAllMovies', 'changeSession', 'createSession']),
    openDeleteModal(id){
      this.showDeleteModal = true;
      this.delete_id = id;
    },
    deleteSession2(id){
      this.deleteSession(id);
      this.showDeleteModal = false
    },
    closeDeleteModal(){
      this.showDeleteModal = false
    },
    closeEditModal() {
      this.showEditModal = false
    },
    updateSession(){
      let fd = new FormData();
      fd.append('movie_id', this.current_session.movie_id);
      fd.append('hall_id', this.current_session.hall_id);
      fd.append('price', this.current_session.price);
      this.showEditModal = false;
      let par = {page:this.params.page,limit: this.params.limit, id:this.current_session_id, fd:fd}
      this.changeSession(par)
    },
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false
    },
    addNewSession(){
      let fd = new FormData();
      fd.append('movie_id', this.session_form.movie_id);
      fd.append('hall_id', this.session_form.hall_id);
      fd.append('price', this.session_form.price);
      fd.append('time', this.session_form.time);
      this.showCreateModal = false;
      let par = {page:this.params.page, limit: this.params.limit, fd:fd}
      this.createSession(par)
    },
    pageCount() {
      return Math.ceil(this.getAllSessions.count / this.params.limit);
    },
    loadPage(page){
      this.loadAllSessions({page:page, limit:this.params.limit})
    },
  },
  mounted() {
    this.loadCurrentUser()
    this.loadAllSessions({page: this.params.page, limit: this.params.limit})
    this.loadAllHalls(this.params)
    this.loadAllMovies(this.params)
    // if(!localStorage.getItem('token')){
    //   this.$router.push('error')
    // }
  },
  watch: {
    // getCurrentUser(val){
    //   if(val?.role === 'Администратор' || val?.role === 'Продавец'){
    //     this.$router.push('error')
    //   }
    // }
  }
}
</script>

<style scoped>

</style>