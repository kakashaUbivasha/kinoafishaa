<template>
  <div>
    <div class="mb-5">
      <h1 class="content__title block text-[28px] font-[700] mb-4">Список фильмов</h1>
      <button
          @click="openCreateModal"
          class="bg-gradient-to-r from-[#e84202] via-primary to-[#fc5716] block my-2 mt-4 w-80 p-3 rounded-3xl text-white hover:text-neutral-200 transition-all ease-in-out duration-300 max-[600px]:w-full"
      >
        Добавить фильм
      </button>
    </div>

    <div>
      <div class="users__table relative rounded-xl overflow-auto">
        <div class="shadow-sm my-8">
          <table class="border-collapse w-full text-sm overflow-x-auto">
            <thead>
            <tr class="bg-primary rounded-[4px]">
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">
                №
              </th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">
                Название
              </th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">
                Постер
              </th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">
                Описание
              </th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">
                Возрастные ограничения
              </th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">
                Продолжительность
              </th>
              <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">
                Действия
              </th>
            </tr>
            </thead>
            <tbody>
            <product-item
                v-for="item in getItems.results"
                :key="item.id"
                :item="item"
                @openDeleteModal="openDeleteModal"
                @openEditModal="showEditModal = true; current_product = {...item}; current_product_id = item.id"
                @openImageModal="showImageModal = true; current_image = item.photo_url"
            />
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- BEGIN: Пустая страница -->
    <Transition name="fade">
      <div
          v-if="getItems.count === 0"
          class="flex w-full items-center flex-col justify-center mt-4">
        <img src="/img/sold.svg" alt="пустой каталог" class="w-[200px]">
        <p class="text-[24px] font-semibold mt-2">В каталоге пока нет товаров</p>
        <p class="font-medium text-gray-400 mt-2">Начните с подборок в меню или найдите нужный товар через поиск</p>
      </div>
    </Transition>
    <!-- END: Пустая страница -->

    <!-- BEGIN: Delete Confirmation Modal -->
    <Transition name="fade">
      <form @submit.prevent="deleteItem" v-if="showDeleteModal" class="main__modal" @click.stop="closeDeleteModal">
        <div @click.stop class="main-modal__content">
          <button type="button" @click="closeDeleteModal" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/cancel.svg">
                <div class="text-3xl mt-5">Вы уверены?</div>
                <div class="text-slate-500 mt-2">
                  Вы точно хотите удалить этот фильм?
                  <br>
                  Этот процесс нельзя отменить.
                </div>
              </div>
              <div class="px-5 pb-8 text-center">
                <button @click="closeDeleteModal" type="button" data-tw-dismiss="modal"
                        class="text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">Отмена
                </button>
                <button @click="deleteItem" type="button"
                        class="w-28 p-3 bg-red-600 rounded-3xl text-white hover:bg-red-700 transition-all ease-in-out duration-300">
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Transition>
    <!-- END: Delete Confirmation Modal -->

    <!-- BEGIN: CREATE Confirmation Modal -->
    <Transition name="fade">
      <form @submit.prevent="createCatalogItem" action="#" enctype="multipart/form-data" v-if="showCreateModal"
            class="main__modal" @click.stop="closeCreateModal">
        <div @click.stop class="main-modal__content">
          <button @click="closeCreateModal" type="button" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/create.svg">
                <div class="text-3xl mt-5 mb-3">Создайте новый фильм</div>
                <div class="form__modal">
                  <div class="form-modal__item">
                    <label for="regular-form-1" class="block text-left mb-3 text-slate-400">Название</label>
                    <v-input
                        v-model="product_form.name"
                        id="regular-form-1"
                        type="text"
                        class="form-control"
                        placeholder="Напишите полное название"
                        required
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Описание</label>
                    <textarea
                        v-model="product_form.description"
                        id="regular-form-2"
                        type="textarea"
                        class="block resize-none p-3 w-full h-[150px] border-2 border-solid border-inherit focus:outline-0 focus:border-primary rounded mb-1.5"
                        placeholder="Напишите описание"
                        required
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-3" class="block text-left mb-3 text-slate-400">Возрастное ограничение</label>
                    <v-input
                        v-model="product_form.age_limit"
                        id="regular-form-3"
                        type="number"
                        class="form-control"
                        placeholder="Разрешённый возраст"
                        required
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Продолжительность</label>
                    <input
                        v-model="product_form.duration"
                        class="block p-3 w-full border-2 border-solid border-inherit focus:outline-0 focus:border-primary rounded mb-1.5"
                        type="number"
                        placeholder="Продолжителность в минутах"
                        required
                    >
                  </div>
                  <div class="form-modal__item">
                    <label for="inputFile" class="block text-left mb-3 text-slate-400">Постер</label>
                    <v-input
                        class="input__file"
                        @change="product_form.photo_url = $event.target.files[0]"
                        id="inputFile"
                        type="file"
                        required
                    />
                  </div>
                </div>
              </div>
              <div class="px-5 pb-8 text-center">
                <button @click="closeCreateModal" type="button" data-tw-dismiss="modal"
                        class="btn btn-outline-secondary text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">
                  Отмена
                </button>
                <button type="submit"
                        class="w-28 p-3 bg-sky-600 rounded-3xl text-white hover:bg-sky-700 transition-all ease-in-out duration-300">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Transition>
    <!-- END: CREATE Confirmation Modal -->

    <!-- BEGIN: Edit Confirmation Modal -->
    <Transition name="fade">
      <form @submit.prevent="changeCatalogItem" action="#" enctype="multipart/form-data" v-if="showEditModal"
            class="main__modal" @click.stop="closeEditModal">
        <div @click.stop class="main-modal__content">
          <button @click="closeEditModal" type="button" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/edit.svg">
                <div class="text-3xl mt-5 mb-3">Измените текущий фильм</div>
                <div class="form__modal">
                  <div class="form-modal__item">
                    <label for="regular-form-1" class="block text-left mb-3 text-slate-400">Название</label>
                    <v-input
                        v-model="current_product.name"
                        id="regular-form-1"
                        type="text"
                        class="form-control"
                        placeholder="Напишите полное название"
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Описание</label>
                    <textarea
                        v-model="current_product.description"
                        id="regular-form-2"
                        type="textarea"
                        class="block resize-none p-3 w-full h-[150px] border-2 border-solid border-inherit focus:outline-0 focus:border-primary rounded mb-1.5"
                        placeholder="Напишите описание"
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-3" class="block text-left mb-3 text-slate-400">Возрастное ограничение</label>
                    <v-input
                        v-model="current_product.age_limit"
                        id="regular-form-3"
                        type="number"
                        class="form-control"
                        placeholder="Разрешённый возраст"
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Продолжительность</label>
                    <input
                        v-model="current_product.duration"
                        class="block p-3 w-full border-2 border-solid border-inherit focus:outline-0 focus:border-primary rounded mb-1.5"
                        type="number"
                        placeholder="Продолжительность в минутах"
                    >
                  </div>
                  <div class="form-modal__item">
                    <label for="inputFile" class="block text-left mb-3 text-slate-400">Постер</label>
                    <v-input
                        class="input__file"
                        @change="current_product.photo_url = $event.target.files[0]"
                        id="inputFile"
                        type="file"
                    />
                  </div>
                </div>
              </div>
              <div class="px-5 pb-8 text-center">
                <button @click="closeEditModal" type="button" data-tw-dismiss="modal"
                        class="btn btn-outline-secondary text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">
                  Отмена
                </button>
                <button type="submit"
                        class="w-28 p-3 bg-amber-500 rounded-3xl text-white hover:bg-amber-600 transition-all ease-in-out duration-300">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Transition>
    <!-- END: Edit Confirmation Modal -->

    <!-- BEGIN: Image Confirmation Modal -->
    <Transition name="fade">
      <div v-if="showImageModal" class="main__modal" @click.stop="closeImageModal">
        <div @click.stop class="main-modal__content !p-2">
          <button @click="closeImageModal" type="button" class="modal__icon btn__reset !absolute !right-[10px]">
            <span class="modal-icon__span"></span>
          </button>
          <img
              class="max-w-[500px] w-full"
              :src="getServerDomain + this.current_image"
              alt="фото"
          >
        </div>
      </div>
    </Transition>
    <!-- END: Image Confirmation Modal -->

    <!--    pagination-->
    <div
        v-if="this.getItems.count"
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
import {mapGetters, mapActions} from "vuex";
import Paginate from "vuejs-paginate-next";
import ProductItem from "../../components/template/UI/ProductItem.vue";
import VInput from "../../components/template/UI/vInput.vue";

export default {
  name: "ProductsList",
  components: {
    ProductItem,
    Paginate,
    VInput,
  },
  data() {
    return {
      params: {
        page: 1,
        limit: 15
      },
      category_id: -1,
      showCreateModal: false,
      product_form: {
        name: '',
        description: '',
        age_limit: '',
        duration: '',
        photo_url: '',
      },
      showDeleteModal: false,
      delete_id: '',
      delete_category: '',
      showEditModal: false,
      current_product: {},
      current_product_id: -1,
      search_val: '',
      category_status: '',
      showImageModal: false,
      current_image: '',
    }
  },
  computed: {
    ...mapGetters(['getItems', 'getCurrentUser', 'getCategory', 'getServerDomain'])
  },
  methods: {
    ...mapActions(['loadCatalogItems', 'deleteCatalogItem', 'loadCurrentUser', 'loadCategory', 'addCatalogItem', 'updateCatalogItem', 'searchCatalogItem']),
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false
    },
    createCatalogItem() {
      let fd = new FormData();
      fd.append('name', this.product_form.name);
      fd.append('description', this.product_form.description);
      fd.append('age_limit', this.product_form.age_limit);
      fd.append('photo', this.product_form.photo_url);
      fd.append('duration', this.product_form.duration);
      let par = {limit: this.params.limit, page: this.params.page, fd: fd}
      this.addCatalogItem(par);
      this.showCreateModal = false;
    },
    openDeleteModal(data) {
      this.showDeleteModal = true;
      this.delete_id = data.id;
      this.delete_category = data.category_id;
    },
    deleteItem() {
      let par = {
        delete_id: this.delete_id,
        page: this.params.page,
        limit: this.params.limit,
        category_id: this.category_id
      };
      this.deleteCatalogItem(par);
      this.showDeleteModal = false;
    },
    closeDeleteModal() {
      this.showDeleteModal = false
    },
    closeEditModal() {
      this.showEditModal = false
    },
    changeCatalogItem() {
      console.log('hello')
      let fd = new FormData();
      fd.append('name', this.current_product.name);
      fd.append('description', this.current_product.description);
      fd.append('age_limit', this.current_product.age_limit);
      if (typeof this.current_product.photo_url !== "string") {
        fd.append('photo', this.current_product.photo_url);
      }
      fd.append('duration', this.current_product.duration);
      this.showEditModal = false;
      let par = {
        id: this.current_product_id,
        fd: fd,
        page: this.params.page,
        limit: this.params.limit
      }
      this.updateCatalogItem(par)
    },
    closeImageModal() {
      this.showImageModal = false;
    },
    pageCount() {
      return Math.ceil(this.getItems.count / this.params.limit);
    },
    loadPage(page) {
      let par = {category_id: this.category_id, page: page, limit: this.params.limit}
      this.loadCatalogItems(par)
    },
  },
  mounted() {
    let par = {category_id: this.category_id, page: this.params.page, limit: this.params.limit}
    this.loadCatalogItems(par);
    this.loadCategory();
    if (!localStorage.getItem('token')) {
      this.$router.push('error')
    }
  },
  watch: {
    getCurrentUser(val) {
      if (val?.role === 'Покупатель') {
        this.$router.push('error')
      }
    }
  }
}
</script>

<style scoped>

</style>