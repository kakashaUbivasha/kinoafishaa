<template>
  <div class="w-full h-full bg-gradient-to-r gradient max-lg:sticky top-0 z-50">
    <div class="max-w-container px-10 mx-auto max-[800px]:px-2">
      <div class="flex items-center justify-between w-full">
      <div class="flex w-[30%] items-center max-[576px]:w-full">
        <div
            class="bars-logo cursor-pointer select-none active:scale-95 rounded-lg transition-all hover:duration-75 max-lg:hidden"
            @click="openBurger = !openBurger"
        >
          <svg
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 18H10" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 12L16 12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 6L20 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="nav-title font-bold uppercase pl-8 text-white max-[576px]:pl-[10px]">
          <router-link class="text-4xl max-lg:text-2xl cursor-pointer" :to="{name: 'home'}">
            KINOAFISHA
          </router-link>
        </div>
      </div>
        <form @submit.prevent="searchOrderItem({search:this.search_value, category_id:this.category_id}); this.search_send = true" class="flex w-5/12 cursor-pointer relative max-[576px]:w-[100%]">
          <!--       BEGIN: Лупа-->
          <Transition name="fade">
            <div v-if="!search_value" class="absolute right-5 top-3">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 50 50"
                  width="15px"
                  height="15px"
              >
                <circle
                    fill="none"
                    stroke="#000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    cx="21"
                    cy="20"
                    r="16"
                />
                <line
                    fill="none"
                    stroke="#000"
                    stroke-width="4"
                    stroke-miterlimit="10"
                    x1="32.229"
                    y1="32.229"
                    x2="45.5"
                    y2="45.5"
                />
              </svg>
            </div>
          </Transition>
          <!--       END: Лупа-->

          <!--       BEGIN: Очистить-->
          <Transition name="fade">
            <div
                v-if="search_value"
                class="absolute right-5 top-3 z-10"
            >
              <img
                  @click="this.search_value = ''; this.search_send = false"
                  src="/img/clear.svg"
                  class="w-[15px] h-[15px] cursor-pointer">
            </div>
          </Transition>
          <!--       END: Очистить-->
          <input
              class="custom-input w-full h-10 pl-8 pr-10 text-sm rounded-full outline-none duration-300 cursor-pointer"
              :class="{
              'hover:opacity-70': !search_value,
              'opacity-50': !search_value,
              'opacity-100': search_value,
              'rounded-t-[18px]': search_send && search_value,
              'rounded-none': search_send && search_value
            }"
              type="text"
              name=""
              placeholder="Я ищу..."
              v-model="search_value"
              @input="checkSearch"
              @focus="focusInput = true"
          />
          <div
              class="absolute overflow-y-auto p-3 top-10 bg-white shadow-[0_10px_20px_rgba(0,0,0,.2)] border border-opacity-20 border-gray-500 z-40 h-[auto] w-full rounded-b-[18px]"
              v-if="search_send === true && getSearchValue.results && search_value"
          >
            <router-link
                :to="{name: 'product', params:{id:item.id}}"
                v-for="item in getSearchValue.results"
                :key="item.id"
                class="flex items-center gap-2 mb-3 break-all"
                @click="search_send = false; search_value= ''; loadCatalogItem({id:item.id})"
            >
              <img class="w-[15px]" src="/img/search.svg" alt="картинка">
              <p class="pl-1 capitalize">{{ item.name }}</p>
            </router-link>
            <div v-if="getSearchValue.count === 0 && search_send === true" class="pl-1 opacity-[0.8]">
              ничего не нашлось
            </div>
          </div>
        </form>
      <div
          class="flex w-2/12 max-lg:w-full max-lg:flex max-lg:justify-around max-lg:py-4 text-center mx-auto text-white max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:bg-white max-lg:z-50"
          :class="{'border-none' : openBurger, 'max-lg:shadow-footer_shadow max-lg:border max-lg:border-gray-300' : !openBurger}"
      >
        <router-link :to="{name:'autorization'}" v-if="!this.getCurrentUser.id"
                     class="user flex flex-col items-center text-center mx-auto max-lg:mx-0 cursor-pointer text-gray-300 transition-all">
          <div class="max-lg:hidden">
            <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="max-lg:mx-auto"
            >
              <path
                  opacity="0.1"
                  d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                  fill="#FFFFFF"
              />
              <path
                  d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                  stroke="#FFFFFF"
                  stroke-width="2"
              />
              <path
                  d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  stroke-linecap="round"
              />
            </svg>
          </div>
          <div class="hidden max-lg:block max-lg:w-[100px]">
            <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="max-lg:mx-auto"
            >
              <path
                  opacity="0.1"
                  d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                  fill="#f99929"
              />
              <path
                  d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                  stroke="#f99929"
                  stroke-width="2"
              />
              <path
                  d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"
                  stroke="#f99929"
                  stroke-width="2"
                  stroke-linecap="round"
              />
            </svg>
          </div>
          <p class="text-white mt-1 max-lg:hidden">Войти</p>
        </router-link>

        <div v-if="this.getCurrentUser.id" @mouseover="showDropDown = true" @mouseleave="showDropDown = false"
             class="user relative flex flex-col items-center  mx-auto max-lg:mx-0 cursor-pointer text-gray-300  transition-all">
          <div
              class="user relative flex flex-col items-center text-center mx-auto max-lg:mx-0 cursor-pointer text-gray-300  transition-all">
            <div class="max-lg:hidden">
              <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="max-lg:mx-auto"
              >
                <path
                    opacity="0.1"
                    d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                    fill="#FFFFFF"
                />
                <path
                    d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                    stroke="#FFFFFF"
                    stroke-width="2"
                />
                <path
                    d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"
                    stroke="#FFFFFF"
                    stroke-width="2"
                    stroke-linecap="round"
                />
              </svg>
            </div>
              <router-link :to="{name: 'profile'}" class="hidden max-lg:w-[100px] max-lg:block">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="max-lg:mx-auto"
              >
                <path
                    opacity="0.1"
                    d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                    fill="#f99929"
                />
                <path
                    d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                    stroke="#f99929"
                    stroke-width="2"
                />
                <path
                    d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"
                    stroke="#f99929"
                    stroke-width="2"
                    stroke-linecap="round"
                />
              </svg>
              </router-link>
            <p class="text-white mt-1 max-lg:hidden">{{ this.getCurrentUser.name }}</p>
          </div>
          <!--          drop down menu-->
          <Transition name="fade">
            <div class="drop__down absolute bg-primary top-[60px] w-[130px] max-lg:hidden h-[100px] rounded-[18px] z-50 p-5 pt-10"
                 v-if="this.showDropDown">
              <div>
                <router-link :to="{name:'profile'}" class="flex gap-1 justify-center items-center text-white pt-5 hover:text-emerald-100 duration-300 ease-in-out">
                  <img class="block w-[15px] h-[15px]" src="/img/user-square.svg" alt="Профиль">
                  Профиль
                </router-link>
                <router-link :to="{name:'user-delivery'}" class="flex gap-1 justify-start items-center text-white pt-2 hover:text-emerald-100 duration-300 ease-in-out">
                  <svg height="15px" width="15px" fill="white" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                       viewBox="0 0 512 512"  xml:space="preserve">
                    <g>
                      <path class="st0" d="M430.337,231.065H81.674c-29.701,0-53.858,24.16-53.858,53.862v49.884v15.976l15.806,2.262
                        c9.135,1.31,16.03,9.258,16.03,18.483c0,9.225-6.891,17.173-16.022,18.482l-15.814,2.262v15.978v49.892
                        c0,29.693,24.157,53.854,53.858,53.854h348.663c29.701,0,53.862-24.161,53.862-53.854v-49.558V391l-17.571-0.822
                        c-9.982-0.463-17.808-8.655-17.808-18.645c0-9.982,7.826-18.174,17.815-18.646l17.564-0.83v-17.58v-49.55
                        C484.199,255.225,460.038,231.065,430.337,231.065z M465.765,334.477c-19.686,0.936-35.371,17.14-35.371,37.056
                        c0,19.923,15.685,36.135,35.371,37.055v49.558c0,19.565-15.864,35.428-35.428,35.428H81.674c-19.569,0-35.432-15.863-35.432-35.428
                        v-49.892c17.991-2.579,31.836-18.011,31.836-36.722c0-18.703-13.846-34.135-31.836-36.721v-49.884
                        c0-19.573,15.863-35.436,35.432-35.436h348.663c19.564,0,35.428,15.863,35.428,35.436V334.477z"/>
                                          <rect x="133.621" y="439.419" class="st0" width="12.19" height="31.8"/>
                                          <rect x="133.621" y="383.564" class="st0" width="12.19" height="31.792"/>
                                          <rect x="133.621" y="327.7" class="st0" width="12.19" height="31.8"/>
                                          <rect x="133.621" y="271.846" class="st0" width="12.19" height="31.799"/>
                                          <polygon class="st0" points="111.245,180.758 100.592,186.68 116.053,214.461 126.702,208.539 	"/>
                                          <path class="st0" d="M497.524,179.025l-24.095-43.311l-8.558-15.36l-15.749,7.826c-8.948,4.442-19.768,1.09-24.617-7.639
                        c-4.865-8.721-2.001-19.687,6.492-24.95l14.952-9.266l-8.558-15.368l-24.088-43.294C398.863,1.714,366.006-7.658,340.047,6.79
                        L35.374,176.299c-25.955,14.44-35.318,47.305-20.878,73.256l0.875,1.578c3.27-6.394,7.43-12.243,12.324-17.409
                        c-4.803-15.643,1.762-33.044,16.636-41.326l304.681-169.51c17.1-9.518,38.674-3.368,48.192,13.732l24.088,43.302
                        c-16.751,10.38-22.575,32.182-12.895,49.582c9.681,17.401,31.271,23.942,48.925,15.172l24.095,43.312
                        c7.273,13.056,5.337,28.692-3.571,39.601c4.776,3.961,8.989,8.558,12.65,13.569C505.4,224.524,508.979,199.615,497.524,179.025z"/>
                    </g>
                    </svg>
                  Сеансы
                </router-link>
              </div>
            </div>
          </Transition>
          <!--          end of drop down menu-->
        </div>
        <div class="hidden max-lg:flex cart cursor-pointer text-gray-300 hover:text-white transition-all"
             @click="openBurger = !openBurger"
        >
          <div class="max-lg:w-[100px] text-center mx-auto flex justify-center">
            <svg width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                 :class="{'svg-active' : openBurger}"
                 stroke="#CCCCCC"
            >
              <path d="M4 18L20 18" stroke-width="2" stroke-linecap="round"
              />
              <path d="M4 12L20 12" stroke-width="2" stroke-linecap="round"
              />
              <path d="M4 6L20 6" stroke-width="2" stroke-linecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <v-modal-nav @showBurger="Burger" :openBurger="openBurger"></v-modal-nav>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import vModalNav from "./UI/vModalNav.vue";
import CatalogItem from "./catalog/CatalogItem.vue";

export default {
  components: {
    CatalogItem,
    vModalNav,
  },
  props: {
    cart_info: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      params: {
        page: 1
      },
      category_id: -1,
      search_value: '',
      clicked: '',
      search_send: false,
      openBurger: false,
      focusInput: false,
      showDropDown: false,
    };
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getBasket', 'getSearchValue'])
  },
  methods: {
    ...mapActions(['searchOrderItem', 'loadCatalogItems', 'loadCategory', 'loadCatalogItem', 'loadCurrentUser']),
    Burger() {
      this.openBurger = !this.openBurger;
    },
    checkSearch(){
      if(!this.search_value) {
        this.search_send = false;
      }
    }
  },
  mounted() {
    // let par = {category_id: this.category_id, page: this.params.page}
    // this.loadCatalogItems(par)
    this.loadCategory()
    this.loadCurrentUser();
  }

};
</script>

<style lang="scss" scoped>
svg {
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

@media (max-width: '1024px') {

  .svg-active {
    stroke: #f89a29 !important;
  }

}

</style>
