<template>
  <div>
    <div class="mb-5">
      <h1 class="content__title block text-[28px] font-[700] mb-4">Список комментариев</h1>
      <div class="flex mt-5 md:justify-end max-[640px]:justify-center max-[540px]:block">
        <div class="flex md:flex-row items-center max-[640px]:flex-col mr-3 max-[540px]:block max-[540px]:mb-4">
          <label for="order-select" class="w-12 mr-3">Статус</label>
          <select
              id="order-select"
              @change="loadFeedbacks({status:feedback_status, page:this.params.page})"
              v-model="feedback_status"
              class="p-1 border-2 border-primary rounded-[4px] form-select w-full mt-2 sm:mt-0 sm:w-auto focus:outline-0 focus:border-primary"
          >
            <option value="all">все</option>
            <option value="published">опубликованные</option>
            <option value="unpublished">неопубликованные</option>
          </select>
        </div>
        <div class="flex md:flex-row items-center max-[640px]:flex-col max-[540px]:block">
          <label for="search-user" class="w-12 flex-none xl:w-auto xl:flex-initial mr-2 max-[540px]:block max-[540px]:mb-[5px]">Поиск</label>
          <input
              @input="searchFeedbacks({status: this.feedback_status, search: this.search_value})"
              v-model="search_value"
              id="search-user"
              type="text"
              class="border-2 border-primary p-1 focus:outline-0 focus:border-primary rounded-[4px] sm:w-40 2xl:w-full sm:mt-0 max-[540px]:block max-[540px]:w-[100%] focus:outline-0 focus:border-primary"
              placeholder="Найдите описание">
        </div>
      </div>
    </div>

    <div>
      <div class="users__table relative rounded-xl overflow-auto">
        <div class="shadow-sm my-8">
          <table class="border-collapse w-full text-sm overflow-x-auto">
            <thead>
            <tr class="bg-primary rounded-[4px]">
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">№</th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Пользователь</th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Описание</th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Отправлен</th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Рейтинг</th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Название товара</th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Статус</th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Действия</th>
            </tr>
            </thead>
            <tbody>
            <feedback-item
                v-for="item in getFeedbacks.results"
                :key="item.id"
                :item="item"
                @updateFeedback="updateFeedback"
            />
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- BEGIN: Пустая страница -->
    <Transition name="fade">
      <div
          v-if="getFeedbacks.count === 0"
          class="flex w-full items-center flex-col justify-center mt-4">
        <img src="/img/feedback-null.svg" alt="пустой лист жалоб" class="w-[200px]">
        <p class="text-[24px] font-semibold mt-2">Комментариев пока нет</p>
        <p class="font-medium text-gray-400 mt-2">Пользователи не прокоментировали ни один товар</p>
      </div>
    </Transition>
    <!-- END: Пустая страница -->

    <!--    begin pagination-->
    <div
        v-if="this.getFeedbacks.count"
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

  </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";
import {mapActions, mapGetters} from "vuex";
import FeedbackItem from "../../components/template/catalog/FeedbackItem.vue";

export default {
  name: "Feedbacks",
  data(){
    return {
      feedback_status: 'all',
      params: {
        page: 1,
        limit: 10,
      },
      search_value: '',
    }
  },
  components: {
    FeedbackItem,
    Paginate
  },
  computed: {
    ...mapGetters(['getFeedbacks', 'getCurrentUser'])
  },
  methods: {
    ...mapActions(['loadFeedbacks', 'changeFeedback', 'searchFeedbacks']),
    pageCount() {
      return Math.ceil(this.getFeedbacks.count / this.params.limit);
    },
    loadPage(page){
      this.loadFeedbacks({status: this.feedback_status, page:page, limit: this.params.limit})
    },
    updateFeedback(id, publish){
      let par = {status:this.feedback_status, id: id, published: publish, page: this.params.page}
      this.changeFeedback(par)
    }
  },
  mounted() {
    let par = {status: this.feedback_status, page:this.params.page, limit: this.params.limit}
    this.loadFeedbacks(par)
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

<style>

</style>