<template>
  <div class="content">
    <h1 class="content__title block text-[28px] font-[700] mb-4">Список пользователей</h1>
    <button
        @click="openCreateModal"
        class="bg-gradient-to-r from-[#e84202] via-primary to-[#fc5716] block my-2 mt-4 w-80 p-3 rounded-3xl text-white hover:text-neutral-200 transition-all ease-in-out duration-300 max-[540px]:w-[100%]"
    >
      Добавить пользователя
    </button>
    <div class="flex mt-5 md:justify-end max-[640px]:justify-center max-[540px]:block">
      <div class="flex md:flex-row items-center max-[640px]:flex-col mr-3 max-[540px]:block max-[540px]:mb-4">
        <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Роль</label>
        <select
            @change="loadUserList({role_id:role_id, page:this.params.page})"
            v-model="role_id"
            id="select"
            class="p-1 border-2 border-primary rounded-[4px] form-select w-full mt-2 sm:mt-0 sm:w-auto focus:outline-0 focus:border-primary"
        >
          <option v-for="item in getRoles" :key="item.id" :value="item.id">
            {{item.name}}
          </option>
          <option value="-1">все</option>
        </select>
      </div>
      <div class="flex md:flex-row items-center max-[640px]:flex-col max-[540px]:block">
        <label for="search-user" class="w-12 flex-none xl:w-auto xl:flex-initial mr-2 max-[540px]:block max-[540px]:mb-[5px]">Поиск</label>
        <input
            @input="search({role_id:role_id, search:search_value})"
            v-model="search_value"
            id="search-user"
            type="text"
            class="border-2 border-primary p-1 focus:outline-0 focus:border-primary rounded-[4px] sm:w-40 2xl:w-full sm:mt-0 max-[540px]:block max-[540px]:w-[100%] focus:outline-0 focus:border-primary"
            placeholder="Найдите имя">
      </div>
    </div>

    <div class="users__table relative rounded-xl overflow-auto">
      <div class="shadow-sm my-8">
        <table class="border-collapse w-full text-sm overflow-x-auto">
          <thead>
          <tr class="bg-primary rounded-[4px]">
            <th
                @click="sortById"
                class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">
              ID
            </th>
            <th
                @click="sortByName"
                class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">
              Имя
            </th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Почта</th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Номер</th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Роль</th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Фото</th>
            <th class="border-b text-center dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200">Действия</th>
          </tr>
          </thead>
          <tbody>
          <user-item
              v-for="item in getUserList.results"
              :ket="item.id"
              :item="item"
              @openEditModal="showEditModal = true; this.current_user = {...item}; this.current_user_id = item.id"
              @openDeleteModal="openDeleteModal(item.id)"
          />
          </tbody>
        </table>
      </div>

      <!-- BEGIN: Пустая страница -->
      <Transition name="fade">
        <div
            v-if="getUserList.count === 0"
            class="flex w-full items-center flex-col justify-center mt-4">
          <img src="/img/users-null.svg" alt="пустой юзер лист" class="w-[200px]">
          <p class="text-[24px] font-semibold mt-2">Пользователей пока нет</p>
          <p class="font-medium text-gray-400 mt-2">Создайте нового пользователя прямо сейчас!</p>
        </div>
      </Transition>
      <!-- END: Пустая страница -->
    </div>

    <!--    pagination-->
    <div class="flex items-center justify-end w-full mt-5">
      <div class="flex">
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
                <button @click="deleteUser2({delete_id:this.delete_id, role_id:this.role_id, page:this.params.page})" type="button" class="w-28 p-3 bg-red-600 rounded-3xl text-white hover:bg-red-700 transition-all ease-in-out duration-300">Удалить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- END: Delete Confirmation Modal -->

    <!-- BEGIN: Edit Confirmation Modal -->
    <Transition name="fade">
      <form @submit.prevent="updateUser" action="#" enctype="multipart/form-data" v-if="showEditModal" class="main__modal" @click.stop="closeEditModal">
        <div @click.stop class="main-modal__content">
          <button @click="closeEditModal" type="button" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/edit.svg">
                <div class="text-3xl mt-5 mb-3">Измените текущего пользователя</div>
                <div class="form__modal">
                  <div class="form-modal__item">
                    <label for="regular-form-1" class="block text-left mb-3 text-slate-400">Имя</label>
                    <v-input
                        v-model="current_user.name"
                        :value="current_user.name"
                        id="regular-form-1"
                        type="text"
                        class="form-control"
                        placeholder="Напишите полное имя"
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Почта</label>
                    <v-input
                        v-model="current_user.email"
                        :value="current_user.email"
                        id="regular-form-2"
                        type="email"
                        class="form-control"
                        placeholder="Напишите почту"
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Телефон</label>
                    <input
                        v-model="current_user.phone"
                        type="tel"
                        v-mask="'+998 (##)-###-##-##'"
                        class="block p-3 w-full border-2 border-solid border-inherit focus:outline-0 focus:border-primary rounded mb-1.5"
                        placeholder="Напишите номер"
                        maxlength="19"
                    />
<!--                    <v-input-->
<!--                        v-model="current_user.phone"-->
<!--                        :value="current_user.phone"-->
<!--                        class="block p-3 w-full border-2 border-solid border-inherit focus:outline-0 focus:border-green-600 rounded mb-1.5"-->
<!--                        type="tel"-->
<!--                        placeholder="Напишите номер"-->
<!--                        maxlength="13"-->
<!--                    />-->
                  </div>
                  <div class="form-modal__item">
                    <label for="inputFile" class="block text-left mb-3 text-slate-400">Фотография</label>
                    <v-input
                        class="input__file"
                        @input="current_user.photo_url = $event.target.files[0]"
                        id="inputFile"
                        type="file"/>
                  </div>
                  <div class="form-modal__item sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                    <label class="block mr-3 text-left mb-3 text-slate-400">Роль</label>
                    <select
                        v-model="current_user.role_id"
                        :value="current_user.role_id"
                        id="tabulator-html-filter-type"
                        class="border-2 border-solid border-inherit rounded-[4px] form-select w-full mt-2 sm:mt-0 sm:w-auto">
                      <option
                          v-for="item in getRoles"
                          :key="item.id"
                          :value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-3" class="block text-left mb-3 text-slate-400">Пароль</label>
                    <v-input
                        id="regular-form-3"
                        type="password"
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
      <form @submit.prevent="addNewUser2" action="#" enctype="multipart/form-data" v-if="showCreateModal"
            class="main__modal" @click.stop="closeCreateModal">
        <div @click.stop class="main-modal__content">
          <button @click="closeCreateModal" type="button" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/create.svg">
                <div class="text-3xl mt-5 mb-3">Создайте нового пользователя</div>
                <div class="form__modal">
                  <div class="form-modal__item">
                    <label for="regular-form-1" class="block text-left mb-3 text-slate-400">Имя</label>
                    <v-input
                        v-model="user_form.name"
                        id="regular-form-1"
                        type="text"
                        class="form-control"
                        placeholder="Напишите полное имя"
                        required
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Почта</label>
                    <v-input
                        v-model="user_form.email"
                        id="regular-form-2"
                        type="email"
                        class="form-control"
                        placeholder="Напишите почту"
                        required
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Телефон</label>
                    <input
                        v-model="user_form.phone"
                        type="tel"
                        v-mask="'+998 (##)-###-##-##'"
                        class="block p-3 w-full border-2 border-solid border-inherit focus:outline-0 focus:border-primary rounded mb-1.5"
                        placeholder="Напишите номер"
                        maxlength="19"
                        required
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="inputFile" class="block text-left mb-3 text-slate-400">Фотография</label>
                    <v-input
                        class="input__file"
                        @change="user_form.photo_url = $event.target.files[0]"
                        id="inputFile"
                        type="file"
                        required
                    />
                  </div>
                  <div class="form-modal__item  sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                    <label class="block mr-3 text-left mb-3 text-slate-400">Роль</label>
                    <select
                        v-model="user_form.role_id"
                        id="tabulator-html-filter-type"
                        class="border-2 border-solid border-inherit rounded-[4px] form-select w-full mt-2 sm:mt-0 sm:w-auto"
                        required
                    >
                      <option v-for="item in getRoles" :key="item.id" :value="item.id">
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-3" class="block text-left mb-3 text-slate-400">Пароль</label>
                    <v-input
                        v-model="user_form.password"
                        id="regular-form-3"
                        type="password"
                        class="form-control"
                        placeholder="Придумайте пароль"
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
</template>

<script>
import Paginate from "vuejs-paginate-next";
import {mapActions, mapGetters} from "vuex";
import VInput from "../../components/template/UI/vInput.vue";
import UserItem from "../../components/template/users/UserItem.vue";
export default {
  name: "Users",
  components:{
    VInput,
    UserItem,
    Paginate
  },
  data(){
    return {
      params: {
        page: 1,
        limit: 10,
      },
      showDeleteModal: false,
      delete_id: '',
      current_user: {},
      current_user_id: -1,
      showEditModal: false,
      showCreateModal: false,
      user_form: {
        name: "",
        email: "",
        password: "",
        phone: '+998',
        photo_url: "",
        role_id: "",
      },
      search_value: '',
      role_id: -1,
      disablePrev: false,
      disableNext: false,
      totalPages: '',
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getUserList', 'getRoles'])
  },
  methods:{
    ...mapActions(['loadUserList', 'loadRoles', 'addNewUser', 'changeUser', 'deleteUser', 'search']),
    openDeleteModal(id){
      this.showDeleteModal = true;
      this.delete_id = id;
    },
    deleteUser2(id){
      this.deleteUser(id);
      this.showDeleteModal = false
    },
    closeDeleteModal(){
      this.showDeleteModal = false
    },
    closeEditModal() {
      this.showEditModal = false
    },
    updateUser() {
      let fd = new FormData();
      fd.append('name', this.current_user.name);
      fd.append('email', this.current_user.email);
      fd.append('phone', this.current_user.phone);
      fd.append('role_id', this.current_user.role_id);
      if (typeof this.current_user.photo_url !== "string") {
        fd.append('photo', this.current_user.photo_url);
      }
      this.showEditModal = false;
      let par = {role_id:this.role_id, page:this.params.page, id:this.current_user.id, fd:fd}
      this.changeUser(par)
    },
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false
    },
    addNewUser2() {
      let fd = new FormData();
      fd.append('name', this.user_form.name);
      fd.append('email', this.user_form.email);
      fd.append('photo', this.user_form.photo_url);
      fd.append('phone', this.user_form.phone);
      fd.append('password', this.user_form.password);
      fd.append('role_id', this.user_form.role_id);
      this.showCreateModal = false;
      let par = {fd:fd, role_id:this.role_id, page:this.params.page}
      this.
      addNewUser(par);
      document.querySelector('input[type=file]').value = '';
      this.user_form.name = '';
      this.user_form.email = '';
      this.user_form.phone = '+998';
      this.user_form.password = '';
      this.user_form.role_id = '';
    },
    pageCount(){
      return Math.ceil(this.getUserList.count / this.params.limit);
    },
    loadPage(page){
      this.loadUserList({role_id:this.role_id, page:page})
    },
    sortById(){
      this.getUserList.results.sort((a,b) => a.id - b.id)
    },
    sortByName(){
      this.getUserList.results.sort((a,b) => a.name.localeCompare(b.name))
    },
    // sortByDate(){
    //   this.getUserList.sort((a,b) => a.date.localeCompare(b.date))
    // }
  },
  mounted() {
    let par = {role_id:this.role_id, page:this.params.page}
    this.loadUserList(par)
    this.loadRoles();
    if(!localStorage.getItem('token')){
      this.$router.push('error')
    }
  },
  watch: {
    getCurrentUser(val){
      if(val?.role === 'Покупатель' || val?.role === 'Продавец'){
        this.$router.push('error')
      }
    }
  }
}
</script>

<style scoped>

</style>