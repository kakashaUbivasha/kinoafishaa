<template>
  <div class="content">
    <h1 class="content__title block text-[28px] font-[700] mb-4">{{this.$route.params.name}}</h1>
    <div class="flex w-[300px] ml-auto md:flex-row items-center max-[1000px]:ml-0">
      <label for="search-item" class="w-12 flex-none xl:w-auto xl:flex-initial mr-2 max-[540px]:block max-[540px]:mb-[5px]">Поиск</label>
      <input
          @input="searchCatalogItem({category_id:this.$route.params.id, search:search_value})"
          v-model="search_value"
          id="search-item"
          type="text"
          class="border-2 border-primary p-1 focus:outline-0 focus:border-green-800 rounded-[4px] sm:w-40 2xl:w-full sm:mt-0 max-[540px]:block max-[540px]:w-[100%] focus:outline-0 focus:border-primary"
          placeholder="Найдите...">
    </div>
    <div class="grid grid-cols-5 gap-5 mt-[20px] max-[1300px]:grid-cols-4 max-[1060px]:grid-cols-3 max-[676px]:grid-cols-2 max-[676px]:gap-2 max-[568px]:grid-cols-1">
      <catalog-item
        v-for="item in getItems.results"
        :key="item.id"
        :item="item"
        @addToCart="addToCart"
        @deleteItem="openDeleteModal"
        @editItem="this.showEditModal = true; this.current_product = {...item}; this.current_product_id = item.id"
      />
    </div>

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
                <button @click="closeDeleteModal" type="button" data-tw-dismiss="modal" class="text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">Отмена</button>
                <button @click="deleteItem({delete_id:this.delete_id, category_id:this.category_id})" type="button" class="w-28 p-3 bg-red-600 rounded-3xl text-white hover:bg-red-700 transition-all ease-in-out duration-300">Удалить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- END: Delete Confirmation Modal -->

    <!-- BEGIN: Edit Confirmation Modal -->
    <Transition name="fade">
      <form @submit.prevent="changeCatalogItem" action="#" enctype="multipart/form-data" v-if="showEditModal" class="main__modal" @click.stop="closeEditModal">
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
                <button @click="closeEditModal" type="button" data-tw-dismiss="modal" class="btn btn-outline-secondary text-black w-24 mr-1 hover:text-green-600 transition-all ease-in-out duration-300">Отмена</button>
                <button type="submit" class="w-28 p-3 bg-amber-500 rounded-3xl text-white hover:bg-amber-600 transition-all ease-in-out duration-300">Сохранить</button>
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
import Paginate from "vuejs-paginate-next";
import VInput from "../../components/template/UI/vInput.vue";
import {mapActions, mapGetters} from "vuex";
import CatalogItem from "../../components/template/catalog/CatalogItem.vue";
import {toast} from "vue3-toastify";

export default {
  name: "Catalog",
  components: {
    CatalogItem,
    VInput,
    Paginate
  },
  data(){
    return {
      category_id:  this.$route.params.id,
      category_name: '',
      params:{
        page: 1,
        limit: 15,
      },
      showDeleteModal: false,
      delete_id: '',
      showEditModal: false,
      current_product: {},
      current_product_id: -1,
      search_val: ''
    }
  },
  computed:{
    ...mapGetters(['getCurrentUser', 'getItems', 'getCategory'])
  },
  methods:{
    ...mapActions(['loadCurrentUser', 'loadCatalogItems', 'addToBasket', 'deleteCatalogItem', 'loadCategory', 'searchCatalogItem', 'updateCatalogItem']),
    addToCart(item){
      if(item.count > 0) {
        this.addToBasket(item);
      } else {
        toast.warning("Товаров нет!", {
          autoClose: 1000,
        });
      }
    },
    openDeleteModal(id){
      this.showDeleteModal = true;
      this.delete_id = id;
    },
    deleteItem(id){
      this.deleteCatalogItem(id)
      this.showDeleteModal = false
    },
    closeDeleteModal(){
      this.showDeleteModal = false
    },
    closeEditModal() {
      this.showEditModal = false
    },
    changeCatalogItem(){
      let fd = new FormData();
      fd.append('name', this.current_product.name);
      fd.append('description', this.current_product.description);
      fd.append('price', this.current_product.price);
      fd.append('count', this.current_product.count);
      fd.append('photo', this.current_product.photo);
      fd.append('category_id', this.current_product.category_id);
      fd.append('discount', this.current_product.discount);
      this.showEditModal = false;
      let par = {id:this.current_product_id, fd:fd, category_id: this.current_product.category_id, page: this.params.page, limit:this.params.limit}
      this.updateCatalogItem(par)
    },
    pageCount() {
      return Math.ceil(this.getItems.count / this.params.limit);
    },
    loadPage(page){
      let par = {category_id: this.current_product.category_id, page: page, limit:this.params.limit}
      this.loadCatalogItems(par)
    },
  },
  mounted(){
    // console.log(this.category_id)
    // this.category_id = this.$route.params.id;
    let par = {category_id:this.category_id, page:this.params.page, limit:this.params.limit}
    this.loadCatalogItems(par)
    this.loadCategory()
  },
  watch: {
    // getCategory(val){
    //   for(let item = 0; item < this.getCategory.length; item++){
    //     console.log(this.$route.params.id)
    //     if(this.getCategory[item].id === this.$route.params.id){
    //       this.category_name = this.getCategory[item].name;
    //     }
    //   }
    // },
    '$route' (to, from) {
      this.category_id = to.params.id;
    },
  },
}
</script>

<style >
.content__title {
  line-height: 36px;
  vertical-align: baseline;
}

.catalog {
  margin-top: 10px;
  grid-template-columns: repeat(5, 1fr);
}

.catalog-item__link {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
}

.catalog-item__link:hover {
  box-shadow: 0 10px 25px -16px rgb(0 0 0 / 16%);
}

.catalog-item__img {
  display: block;
  max-width: 300px;
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  transition: 0.3s ease-in-out;
}

@media (max-width: 568px){
  .catalog-item__img {
    max-width: 100%;
  }
}

.catalog-item__link:hover
.catalog-item__img {
  transform: scale(1.02);
}

.catalog-item__content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 5px;
}

.catalog-item__title {
  font-family: OpenSans;
  line-height: 15.36px;
}

.catalog-item__price {
  font-family: OpenSans;
  line-height: 120%;
  font-weight: 500;
}

.catalog-item__grade {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 10px;
  margin-top: 10px;
  font-weight: 300;
  color: #8a8d93;
}

@media (max-width: 800px) {
  .catalog-item__grade {
    display: block;
    width: 100%;
  }
}

.catalog-item__basket {
  position: absolute;
  top: -50px;
  display: block;
  background-color: #fff;
  border-radius: 100%;
  border: 1px solid rgba(118, 121, 127, 0.3);
  transition: 0.3s ease-in-out;
}

.catalog-item__basket:hover {
  background-color: #fdd29f;
}

.catalog-item__basket:hover svg {
  fill: white;
}

</style>