<template>
  <div class="content">
    <h1 class="content__title block text-[28px] font-[700] mb-4">Список новостей</h1>

    <button
        @click="openCreateModal"
        class="bg-gradient-to-r from-[#e84202] via-primary to-[#fc5716] block my-2 mt-4 w-80 p-3 rounded-3xl text-white hover:text-neutral-200 transition-all ease-in-out duration-300 max-[600px]:w-full"
    >
      Добавить новость
    </button>

    <div class="category__block mt-2">
      <news-item
          v-for="item in getNews.results"
          :key="item.id"
          :item="item"
          @openEditModal="this.showEditModal = true; this.current_news = {...item}"
          @openDeleteModal="openDeleteModal"
      />
    </div>

    <!--    pagination-->
    <div
        v-if="this.getNews.count"
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


    <!-- BEGIN: Пустая страница -->
    <Transition name="fade">
      <div
          v-if="getNews.length === 0"
          class="flex w-full items-center flex-col justify-center mt-4">
        <img src="/img/news-page.svg" alt="пустой лист новостей" class="w-[200px]">
        <p class="text-[24px] font-semibold mt-2">Новостей пока нет</p>
        <p class="font-medium text-gray-400 mt-2">Создайте новую новость прямо сейчас</p>
      </div>
    </Transition>
    <!-- END: Пустая страница -->

    <!-- BEGIN: Delete Confirmation Modal -->
    <Transition name="fade">
      <div v-if="showDeleteModal" class="main__modal" @click.stop="closeDeleteModal">
        <div @click.stop class="main-modal__content">
          <button @click="closeDeleteModal" type="button" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/cancel.svg">
                <div class="text-3xl mt-5">Вы уверены?</div>
                <div class="text-slate-500 mt-2">
                  Вы точно хотите удалить эту новость?
                  <br>
                  Этот процесс нельзя отменить.
                </div>
              </div>
              <div class="px-5 pb-8 text-center">
                <button @click="closeDeleteModal" type="button" data-tw-dismiss="modal" class="text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">Отмена</button>
                <button @click="deleteNews2({id:this.delete_id, page:this.params.page, limit:this.params.limit})" type="button" class="w-28 p-3 bg-red-600 rounded-3xl text-white hover:bg-red-700 transition-all ease-in-out duration-300">Удалить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- END: Delete Confirmation Modal -->

    <!-- BEGIN: Edit Confirmation Modal -->
    <Transition name="fade">
      <form @submit.prevent="changeNews" action="#" enctype="multipart/form-data" v-if="showEditModal" class="main__modal" @click.stop="closeEditModal">
        <div @click.stop class="main-modal__content">
          <button @click="closeEditModal" type="button" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/edit.svg">
                <div class="text-3xl mt-5 mb-3">Измените текущую новость</div>
                <div class="form__modal">
                  <div class="form-modal__item">
                    <label for="regular-form-1" class="block text-left mb-3 text-slate-400">Заголовок</label>
                    <v-input
                        v-model="current_news.title"
                        :value="current_news.title"
                        id="regular-form-1"
                        type="text"
                        placeholder="Название категории"
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-1" class="block text-left mb-3 text-slate-400">Описание</label>
                    <textarea
                        v-model="current_news.description"
                        id="regular-form-2"
                        type="textarea"
                        class="block resize-none p-3 w-full h-[150px] border-2 border-solid border-inherit focus:outline-0 focus:border-primary rounded mb-1.5"
                        placeholder="Напишите описание новости"
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-1" class="block text-left mb-3 text-slate-400">Если не хотите менять картинку, не загружайте её</label>
                    <v-input
                        class="input__file"
                        @input="current_news.photo_url = $event.target.files[0]"
                        id="inputFile"
                        type="file"
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
      <form @submit.prevent="createNews2" v-if="showCreateModal" action="#" enctype="multipart/form-data" class="main__modal" @click.stop="closeCreateModal">
        <div @click.stop class="main-modal__content">
          <button @click="closeCreateModal" type="button" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/news.svg">
                <div class="text-3xl mt-5 mb-3">Создайте новость</div>
                <div class="form__modal">
                  <div class="form-modal__item">
                    <label for="regular-form-1" class="block text-left mb-3 text-slate-400">Заголовок новости</label>
                    <v-input
                        v-model="news_form.title"
                        id="regular-form-1"
                        type="text"
                        class="form-control"
                        placeholder="Напишите заголовок новости"
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Описание новости</label>
                    <textarea
                        v-model="news_form.description"
                        id="regular-form-2"
                        type="textarea"
                        class="block resize-none p-3 w-full h-[150px] border-2 border-solid border-inherit focus:outline-0 focus:border-primary rounded mb-1.5"
                        placeholder="Напишите описание новости"
                    />
                  </div>
                  <div class="form-modal__item mb-3">
                    <label for="inputFile" class="block text-left mb-3 text-slate-400">Прикрепите картинку</label>
                    <v-input
                        class="input__file"
                        @change="news_form.photo = $event.target.files[0]"
                        id="inputFile"
                        type="file"
                    />
                  </div>
                </div>
                <div class="px-5 pb-8 text-center">
                  <button @click="closeCreateModal" type="button" data-tw-dismiss="modal" class="btn btn-outline-secondary text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">Отмена</button>
                  <button type="submit" class="w-28 p-3 bg-sky-600 rounded-3xl text-white hover:bg-sky-700 transition-all ease-in-out duration-300">Отправить</button>
                </div>
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
import VInput from "../../components/template/UI/vInput.vue";
import NewsItem from "../../components/template/UI/NewsItem.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "News",
  components: {
    VInput,
    NewsItem,
    Paginate
  },
  data(){
    return {
      params: {
        page: 1,
        limit: 5,
      },
      showDeleteModal: false,
      delete_id: '',
      showEditModal: false,
      current_news: '',
      showCreateModal: false,
      news_form: {
        title: '',
        description: '',
        photo: ''
      },
    }
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getNews'])
  },
  methods: {
    ...mapActions(['loadNews', 'createNews', 'updateNews', 'deleteNews']),
    pageCount() {
      return Math.ceil(this.getNews.count / this.params.limit);
    },
    loadPage(page){
      let par = {page:page, limit:this.params.limit}
      this.loadNews(par)
    },
    openDeleteModal(id){
      this.showDeleteModal = true;
      this.delete_id = id;
    },
    closeDeleteModal(){
      this.showDeleteModal = false
    },
    deleteNews2(id){
      this.deleteNews(id);
      this.showDeleteModal = false
    },
    closeEditModal(){
      this.showEditModal = false;
    },
    changeNews(){
      let fd = new FormData();
      fd.append('title', this.current_news.title);
      fd.append('description', this.current_news.description);
      if (typeof this.current_news.photo_url !== "string") {
        fd.append('photo', this.current_news.photo_url);
      }
      this.showEditModal = false;
      let par = {id: this.current_news.id, data: fd, page:this.params.page}
      this.updateNews(par);
    },
    openCreateModal(){
      this.showCreateModal = true;
    },
    closeCreateModal(){
      this.showCreateModal = false
    },
    createNews2(){
      let fd = new FormData();
      fd.append('title', this.news_form.title);
      fd.append('description', this.news_form.description);
      fd.append('photo', this.news_form.photo);
      let par = {page:this.params.page, fd:fd}
      this.createNews(par)
      this.showCreateModal = false;
      this.news_form.title = ''
      this.news_form.description = ''
      document.querySelector('input[type=file]').value = '';
    }
  },
  mounted() {
    let par = {page:this.params.page, limit:this.params.limit}
    this.loadNews(par);
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