<template>
  <div class="text-3xl font-bold">
    <div
        @click="showNew"
        class="flex items-center text-lime-400  cursor-pointer hover:text-lime-500 duration-300 ease-in-out"
        :class="{ 'underline': showNewContent === true }"
    >
      <img class="block w-[30px] h-[30px] mr-2" src="/img/new.svg" alt="new">
      Новинки
    </div>
  </div>
  <div class="block my-10 w-full">
    <Swiper
        v-if="this.showNewContent"
        :spaceBetween="30"
        :pagination="{
            dynamicBullets: true,
        }"
        :breakpoints="{
      1300: {
        slidesPerView: 5
      },
      1024: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 3
      },
      500: {
        slidesPerView: 2
      }
    }"
        :modules="modules"
    >
      <swiper-slide
          v-for="item in this.new_items"
          :key="item.id"
      >
        <catalog-item
            :item="item"
            @addToCart="addToCart"
            @deleteItem="openDeleteModal"
            @editItem="openEditModal"
        />
      </swiper-slide>
    </Swiper>

    <Transition name="fade">
      <div
          v-if="this.showNewContent && this.new_items.length === 0"
          class="flex w-full items-center flex-col justify-center mt-4">
        <img src="/img/new-page.svg" alt="пустой лист новых товаров" class="w-[200px]">
        <p class="text-[24px] font-semibold mt-2">Новых товаров пока нет</p>
        <p class="font-medium text-gray-400 mt-2">Начните с подборок в меню или найдите нужный товар через поиск</p>
      </div>
    </Transition>

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
                  Вы точно хотите удалить этот товар?
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
      </div>
    </Transition>
    <!-- END: Delete Confirmation Modal -->

    <!-- BEGIN: Edit Confirmation Modal -->
    <Transition name="fade">
      <form @submit.prevent="changeCatalogItem" action="#" enctype="multipart/form-data" v-if="showEditModal"
            class="main__modal" @click.stop="closeEditModal">
        <div @click.stop class="main-modal__content">
          <button @click="closeEditModal" class="modal__icon btn__reset">
            <span class="modal-icon__span"></span>
          </button>
          <div class="modal-content">
            <div class="modal-body p-0">
              <div class="p-5 text-center">
                <img class="w-16 h-16 text-danger mx-auto mt-3" src="/img/edit.svg">
                <div class="text-3xl mt-5 mb-3">Измените текущий продукт</div>
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
                        class="block resize-none p-3 w-full h-[150px] border-2 border-solid border-inherit focus:outline-0 focus:border-green-600 rounded mb-1.5"
                        placeholder="Напишите описание"
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-3" class="block text-left mb-3 text-slate-400">Цена товара</label>
                    <v-input
                        v-model="current_product.price"
                        id="regular-form-3"
                        type="number"
                        class="form-control"
                        placeholder="Напишите цену товара"
                    />
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-2" class="block text-left mb-3 text-slate-400">Количество товара</label>
                    <input
                        v-model="current_product.count"
                        class="block p-3 w-full border-2 border-solid border-inherit focus:outline-0 focus:border-green-600 rounded mb-1.5"
                        type="number"
                        placeholder="Напишите количество"
                        maxlength="13"
                    >
                  </div>
                  <div class="form-modal__item">
                    <label for="inputFile" class="block text-left mb-3 text-slate-400">Фотография товара</label>
                    <v-input
                        class="input__file"
                        @change="current_product.photo = $event.target.files[0]"
                        id="inputFile"
                        type="file"
                        required
                    />
                  </div>
                  <div class="form-modal__item  sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
                    <label class="block mr-3 text-left mb-3 text-slate-400">Категория</label>
                    <select
                        v-model="current_product.category_id"
                        id="tabulator-html-filter-type"
                        class="border-2 border-solid border-inherit rounded-[4px] form-select w-full mt-2 sm:mt-0 sm:w-auto">
                      <option v-for="item in getCategory" :key="item.id" :value="item.id">
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-modal__item">
                    <label for="regular-form-3" class="block text-left mb-3 text-slate-400">Процент скидки</label>
                    <v-input
                        v-model="current_product.discount"
                        id="regular-form-3"
                        type="number"
                        class="form-control"
                        placeholder="Напишите какая скидка будет у товара если она есть"
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

  </div>
</template>

<script>
import VInput from "../UI/vInput.vue";
import CatalogItem from "../catalog/CatalogItem.vue";
import {mapActions, mapGetters} from "vuex";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Pagination} from 'swiper';
import {toast} from "vue3-toastify";

import 'swiper/css';
import 'swiper/css/pagination';
import axios from "../../../axios/index.js";


export default {
  components: {
    Swiper,
    SwiperSlide,
    CatalogItem,
    VInput
  },

  data() {
    return {
      category_id: -1,
      params: {
        page: 1,
        limit:10000
      },
      showNewContent: true,
      showDiscountContent: false,
      showDeleteModal: false,
      delete_id: '',
      showEditModal: false,
      current_product: {},
      current_product_id: -1,
      discount_items: [],
      new_items: [],
    };
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getItems', 'getServerDomain', 'getCategory'])
  },
  methods: {
    ...mapActions(['loadCurrentUser', 'loadCatalogItems', 'addToBasket', 'deleteCatalogItem', 'loadCategory', 'updateCatalogItem']),
    showNew() {
      this.showNewContent = true;
      this.showDiscountContent = false;
      this.new_items = [];
      this.generateNew();
    },
    showDiscount() {
      this.showNewContent = false;
      this.showDiscountContent = true;
      this.discount_items = [];
      this.generateDiscount();
    },
    addToCart(item) {
      if(item.count > 0) {
        this.addToBasket(item);
      } else {
        toast.warning("Товаров нет!", {
          autoClose: 1000,
        });
      }
    },
    openDeleteModal(id) {
      this.showDeleteModal = true;
      this.delete_id = id;
    },
    deleteItem() {
      let par = {delete_id: this.delete_id, page: this.params.page, limit: this.params.limit, category_id: this.category_id}
      this.deleteCatalogItem(par)
      this.showDeleteModal = false
    },
    closeDeleteModal() {
      this.showDeleteModal = false
    },
    openEditModal(id) {
      this.showEditModal = true;
      this.current_product_id = id
      this.current_product = this.getItems.results.filter(e => {
        return e.id === id;
      })[0]
    },
    closeEditModal() {
      this.showEditModal = false
    },
    changeCatalogItem() {
      let fd = new FormData();
      fd.append('name', this.current_product.name);
      fd.append('description', this.current_product.description);
      fd.append('price', this.current_product.price);
      fd.append('count', this.current_product.count);
      fd.append('photo', this.current_product.photo);
      fd.append('category_id', this.current_product.category_id);
      fd.append('discount', this.current_product.discount);
      this.showEditModal = false;
      let par = {id:this.current_product_id, fd:fd, category_id: this.category_id, page: this.params.page, limit:this.params.limit}
      this.updateCatalogItem(par)
    },
    generateNew(){
      for (let item = 0; item < this.getItems.count; item++) {
        if (this.getItems.results[item].new) {
          this.new_items.push(this.getItems.results[item])
        }
      }
    },
    generateDiscount(){
      for (let item = 0; item < this.getItems.count; item++) {
        if (this.getItems.results[item].discount) {
          this.discount_items.push(this.getItems.results[item])
        }
      }
    },
  },
  mounted() {
    let par = {category_id: this.category_id, page: this.params.page, limit:this.params.limit}
    this.loadCatalogItems(par)
  },
  watch:{
    getItems(val){
      this.showNew();
    }
  }
};
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.swiper-wrapper {
  padding-bottom: 30px;
}
</style>
