<template>
  <div class="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30  cursor-pointer z-50 max-lg:z-0"
       :class="{'hidden' : !openBurger, 'block max-lg:hidden' : openBurger }"
       @click="$emit('showBurger')"
  />

  <div class="fixed top-0 bg-white w-4/12 max-lg:w-full duration-400 transition-all z-50 max-lg:z-40"
       :class="{'left-0' : openBurger, '-left-[1000%]' : !openBurger}">
    <div class="absolute -right-10 top-5 cursor-pointer z-50 max-lg:hidden" @click="$emit('showBurger')">
      <svg
          class=""
          width="35px"
          height="35px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg">
        <path
            fill="#fff"
            d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"/>
      </svg>
    </div>
    <div class="overflow-y-scroll h-screen  z-50">
      <router-link
          :to="'/'"
          @click="$emit('showBurger')"
      >
        <h2 class="py-4 outline-none uppercase text-3xl font-bold text-center text-primary border-b pb-1 border-primary">
          KINOAFISHA
        </h2>
      </router-link>
      <ul class="my-10 px-4">
        <div
            class="nav__item flex mx-auto items-center fill-[#ccc] hover:fill-white hover:bg-primary w-   rounded-3xl transition-all hover:text-white text-xl">
          <router-link
              v-if="getCurrentUser?.role === 'Администратор'"
              @click="$emit('showBurger')"
              :to="{name: 'users'}"
              class="nav-item__link px-4 py-2 cursor-pointer"
          >
            <div class="w-[50px]">
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="#cccccc" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                <g id="SVGRepo_iconCarrier">
                  <path
                      d="M19 14C21.2091 14 23 16 23 17.5C23 18.3284 22.3284 19 21.5 19H21M17 11C18.6569 11 20 9.65685 20 8C20 6.34315 18.6569 5 17 5M5 14C2.79086 14 1 16 1 17.5C1 18.3284 1.67157 19 2.5 19H3M7 11C5.34315 11 4 9.65685 4 8C4 6.34315 5.34315 5 7 5M16.5 19H7.5C6.67157 19 6 18.3284 6 17.5C6 15 9 14 12 14C15 14 18 15 18 17.5C18 18.3284 17.3284 19 16.5 19ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
                      stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
              </svg>
            </div>
            Пользователи
          </router-link>
        </div>
        <div
            class="nav__item flex mx-auto items-center fill-[#ccc] hover:fill-white hover:bg-primary w-   rounded-3xl transition-all hover:text-white text-xl">
          <router-link
              v-if="getCurrentUser?.role === 'Администратор' || getCurrentUser?.role === 'Продавец'"
              @click="$emit('showBurger')"
              :to="{name: 'admin-products'}"
              class="nav-item__link px-4 py-2 cursor-pointer"
          >
            <div class="w-[50px]">
              <svg width="30px" height="30px" fill="#cccccc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g stroke="none" stroke-width="1">
                  <g fill-rule="nonzero">
                    <path
                        d="M19.7286477,3.91709009 L19.7796475,4.07673953 L20.3309222,5.99926292 C20.4355805,6.36424991 20.2508505,6.74366136 19.9126449,6.89230405 L19.8167039,6.92693721 L9.08979429,10.0020329 L20.2488588,10.0029698 C20.6285546,10.0029698 20.9423498,10.2851237 20.9920122,10.6511993 L20.9988588,10.7529698 L20.9988588,19.2509821 C20.9988588,20.713514 19.8571542,21.9093864 18.4163811,21.9959633 L18.2488588,22.0009821 L5.75,22.0009821 C4.28746816,22.0009821 3.09159572,20.8592775 3.00501879,19.4185045 L3,19.2509821 L2.99979429,10.8590329 L2.47803395,9.03789737 C2.07490554,7.63202154 2.84275532,6.16777873 4.20385145,5.68742476 L4.36350088,5.63642498 L16.3781751,2.19127259 C17.7840509,1.78814418 19.2482937,2.55599396 19.7286477,3.91709009 Z M19.498,11.502 L4.5,11.502 L4.5,19.2509821 C4.5,19.8550436 4.92847749,20.3590287 5.4980814,20.4755866 L5.62219476,20.4945285 L5.75,20.5009821 L18.2488588,20.5009821 C18.8960675,20.5009821 19.4283927,20.0091075 19.4924052,19.3787874 L19.4988588,19.2509821 L19.498,11.502 Z M6.27268011,6.6494258 L4.77695691,7.07831752 C4.15481999,7.25671241 3.7786565,7.8762725 3.89085867,8.49982068 L3.91988247,8.62445396 L4.26421826,9.82529556 L4.55930489,9.74043653 L6.27268011,6.6494258 Z M11.029003,5.28557216 L8.31151617,6.06479896 L6.59814094,9.15580969 L9.31562776,8.37658289 L11.029003,5.28557216 Z M15.7862871,3.92144289 L13.0688003,4.70066969 L11.3554251,7.79168042 L14.0719506,7.01272925 L15.7862871,3.92144289 Z M17.6334765,3.68788446 L16.1127092,6.42755115 L18.6812212,5.6912865 L18.3377549,4.49019556 C18.2305941,4.11648136 17.96425,3.83153666 17.6334765,3.68788446 Z">
                    </path>
                  </g>
                </g>
              </svg>
            </div>
            Фильмы
          </router-link>
        </div>
        <div
            class="nav__item flex mx-auto items-center fill-[#ccc] hover:fill-white hover:bg-primary w-   rounded-3xl transition-all hover:text-white text-xl">
          <router-link
              v-if="getCurrentUser?.role === 'Администратор'"
              @click="$emit('showBurger')"
              :to="{name: 'admin-deliveries'}"
              class="nav-item__link px-4 py-2 cursor-pointer"
          >
            <div class="w-[50px]">
              <svg width="40px" height="40px" fill="#cccccc" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.5,14.1c-0.3-0.2-0.7-0.2-1,0l-4.6,2.3C23.7,15,22.5,14,21,14H7c-1.7,0-3,1.3-3,3v6c0,1.7,1.3,3,3,3h5.1l-3,4.4
                  c-0.3,0.5-0.2,1.1,0.3,1.4c0.5,0.3,1.1,0.2,1.4-0.3l3.2-4.8l3.2,4.8c0.2,0.3,0.5,0.4,0.8,0.4c0.2,0,0.4-0.1,0.6-0.2
                  c0.5-0.3,0.6-0.9,0.3-1.4l-3-4.4H21c1.5,0,2.7-1,2.9-2.4l4.6,2.3C28.7,26,28.8,26,29,26c0.2,0,0.4-0.1,0.5-0.1
                  c0.3-0.2,0.5-0.5,0.5-0.9V15C30,14.7,29.8,14.3,29.5,14.1z"/>
                <path d="M19,1c-2.1,0-3.9,1.1-5,2.7C12.9,2.1,11.1,1,9,1C5.7,1,3,3.7,3,7s2.7,6,6,6c2.1,0,3.9-1.1,5-2.7c1.1,1.6,2.9,2.7,5,2.7
                  c3.3,0,6-2.7,6-6S22.3,1,19,1z M9,9C7.9,9,7,8.1,7,7s0.9-2,2-2s2,0.9,2,2S10.1,9,9,9z M19,9c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2
                  S20.1,9,19,9z"/>
              </svg>
            </div>
            Сеансы
          </router-link>
        </div>
        <div
            class="nav__item flex mx-auto items-center fill-[#ccc] hover:fill-white hover:bg-primary w-   rounded-3xl transition-all hover:text-white text-xl">
          <router-link
              v-if="getCurrentUser?.role === 'Администратор'"
              @click="$emit('showBurger')"
              :to="{name: 'halls'}"
              class="nav-item__link px-4 py-2 cursor-pointer"
          >
            <div class="w-[50px]">
              <svg width="40px" height="40px" fill="#cccccc" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M26,16H6c-1.7,0-3-1.3-3-3s1.3-3,3-3h20c1.7,0,3,1.3,3,3S27.7,16,26,16z"/>
                </g>
                <path d="M26.7,14.3C26.6,14.1,26.3,14,26,14H6c-0.3,0-0.6,0.1-0.7,0.3C5.1,14.6,5,14.8,5,15.1l2,16C7.1,31.6,7.5,32,8,32h5
                  c-0.5,0-1-0.4-1-0.9l-1-14c0-0.6,0.4-1,0.9-1.1c0.6,0,1,0.4,1.1,0.9l1,14c0,0.6-0.4,1-0.9,1.1c0,0,0,0-0.1,0h6c0,0,0,0-0.1,0
                  c-0.6,0-1-0.5-0.9-1.1l1-14c0-0.6,0.5-1,1.1-0.9c0.6,0,1,0.5,0.9,1.1l-1,14c0,0.5-0.5,0.9-1,0.9h5c0.5,0,0.9-0.4,1-0.9l2-16
                  C27,14.8,26.9,14.6,26.7,14.3z"/>
                <g>
                  <path d="M25.8,12L25.8,12L6.2,12c-0.4,0-0.8-0.3-0.9-0.7C5.1,10.9,5,10.5,5,10c0-1.5,0.8-2.8,2-3.5C7,6.4,7,6.2,7,6
                    c0-2.2,1.8-4,4-4c0.5,0,1,0.1,1.4,0.3C13.1,0.9,14.4,0,16,0s2.9,0.9,3.6,2.3C20,2.1,20.5,2,21,2c2.2,0,4,1.8,4,4c0,0.2,0,0.4,0,0.5
                    c1.2,0.7,2,2,2,3.5c0,0.5-0.1,0.9-0.2,1.3C26.6,11.7,26.3,12,25.8,12z M7,10l18,0c0,0,0,0,0,0c0-0.9-0.6-1.7-1.5-1.9
                    C23.2,8,23,7.8,22.9,7.6c-0.1-0.3-0.1-0.6,0-0.8C23,6.5,23,6.2,23,6c0-1.1-0.9-2-2-2c-0.5,0-1,0.2-1.3,0.5c-0.3,0.3-0.7,0.3-1,0.2
                    C18.3,4.6,18,4.2,18,3.9C17.9,2.8,17,2,16,2s-1.9,0.8-2,1.9c0,0.4-0.3,0.7-0.6,0.9c-0.4,0.1-0.8,0.1-1-0.2C12,4.2,11.5,4,11,4
                    C9.9,4,9,4.9,9,6c0,0.2,0,0.5,0.1,0.7c0.1,0.3,0.1,0.6,0,0.8C9,7.8,8.8,8,8.5,8.1C7.6,8.3,7,9.1,7,10L7,10z"/>
                </g>
              </svg>
            </div>
            Залы
          </router-link>
        </div>
        <div
            class="nav__item flex mx-auto items-center fill-[#ccc] hover:fill-white hover:bg-primary w-   rounded-3xl transition-all hover:text-white text-xl">
          <router-link
              v-if="getCurrentUser?.role === 'Администратор'"
              @click="$emit('showBurger')"
              :to="{name: 'admin-support'}"
              class="nav-item__link px-4 py-2 cursor-pointer"
          >
            <div class="w-[50px]">
              <svg width="30px" height="30px" fill="#cccccc" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12,2a8,8,0,0,0-8,8v1.9A2.92,2.92,0,0,0,3,14a2.88,2.88,0,0,0,1.94,2.61C6.24,19.72,8.85,22,12,22h3V20H12c-2.26,0-4.31-1.7-5.34-4.39l-.21-.55L5.86,15A1,1,0,0,1,5,14a1,1,0,0,1,.5-.86l.5-.29V11a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1v5H13.91a1.5,1.5,0,1,0-1.52,2H20a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2V10A8,8,0,0,0,12,2Z"/>
              </svg>
            </div>
            Жалобы
          </router-link>
        </div>
        <div
            class="nav__item flex mx-auto items-center fill-[#ccc] hover:fill-white hover:bg-primary w-   rounded-3xl transition-all hover:text-white text-xl">
          <router-link
              v-if="getCurrentUser?.role === 'Администратор'"
              @click="$emit('showBurger')"
              :to="{name: 'admin-news'}"
              class="nav-item__link px-4 py-2 cursor-pointer"
          >
            <div class="w-[50px]">
              <svg width="30px" height="30px" fill="#cccccc" viewBox="-2 0 19 19" xmlns="http://www.w3.org/2000/svg"
                   class="cf-icon-svg">
                <path
                    d="M2.644 15.26a16.9 16.9 0 0 1-.706-.014l-.11-.025a1.51 1.51 0 0 1-1.14-1.185l-.018-.092c-.005-.106-.01-.406-.01-.667V4.434a.477.477 0 0 1 .476-.475H11.77a.476.476 0 0 1 .475.475v1.529h1.591a.506.506 0 0 1 .504.504v7.192a1.6 1.6 0 0 1-1.6 1.6zm0-1.109h8.572a1.598 1.598 0 0 1-.077-.491v-2.174a2.16 2.16 0 0 1-.003-.109v-6.31H1.769v8.21c0 .218.003.43.006.544l.002.008a.401.401 0 0 0 .3.312l.01.002c.133.004.358.008.557.008zM9.91 6.815H2.95v1.109h6.96zm-4 2.383H2.95v3.532h2.96zm4.002.026H7.033v1.109h2.878zm0 2.41H7.033v1.108h2.878zm2.336-4.563v6.589a.492.492 0 0 0 .984 0V7.07z"/>
              </svg>
            </div>
            Новости
          </router-link>
        </div>
        <div
            class="nav__item flex mx-auto items-center fill-[#ccc] hover:fill-white hover:bg-primary w-   rounded-3xl transition-all hover:text-white text-xl">
          <router-link
              v-if="getCurrentUser?.role === 'Администратор'"
              @click="$emit('showBurger')"
              :to="{name: 'admin-feedbacks'}"
              class="nav-item__link px-4 py-2 cursor-pointer"
          >
            <div class="w-[50px]">
              <svg width="30px" height="30px" fill="#cccccc" version="1.1" baseProfile="tiny" id="Layer_1"
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 42 42" xml:space="preserve">
                <path d="M6.5,25.5v4c0.016,2.812,1.344,2.375,2.328,1.531L14.5,25.91v2.59c0,2.43,0.56,3,3,3h9c0,0,5.209,6.125,5.25,6.084
                  c0.75,0.916,2.781,0.604,2.75-1.084v-5h3c2.45,0,3-0.609,3-3v-15c0-2.4-0.59-3-3-3h-10v-2c0-2.47-0.46-3-3-3h-21c-2.36,0-3,0.51-3,3
                  v13c0,2.439,0.55,4,3,4H6.5z M31.5,28.5v4.721l-4-4.721h-9c-0.75,0-1-0.27-1-1v-13c0-0.67,0.31-1,1-1h18c0.689,0,1,0.37,1,0.94V27.5
                  c0,0.721-0.359,1-1,1H31.5z"/>
              </svg>
            </div>
            Комментарии
          </router-link>
        </div>
        <div
            class="nav__item flex mx-auto items-center fill-[#ccc] hover:fill-white hover:bg-primary w-   rounded-3xl transition-all hover:text-white text-xl">
          <router-link
              @click="$emit('showBurger')"
              :to="{name: 'movies'}"
              class="nav-item__link px-4 py-2 cursor-pointer"
          >
            <div class="w-[50px]">
              <svg width="30px" height="30px" fill="#cccccc" version="1.1" id="Layer_1"
                   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                   viewBox="-271 311.2 256 179.8" xml:space="preserve">
                <path d="M-59.1,311.2h-167.8c0,0-44.1,0-44.1,44.1v91.5c0,0,0,44.1,44.1,44.1h167.8c0,0,44.1,0,44.1-44.1v-91.5
	                C-15,355.3-15,311.2-59.1,311.2z M-177.1,450.3v-98.5l83.8,49.3L-177.1,450.3z"/>
              </svg>
            </div>
            Каталог фильмов
          </router-link>
        </div>
        <div
            class="nav__item flex mx-auto items-center fill-[#ccc] hover:fill-white hover:bg-primary w-   rounded-3xl transition-all hover:text-white text-xl">
          <router-link
              @click="$emit('showBurger')"
              :to="{name: 'sessions-catalog'}"
              class="nav-item__link px-4 py-2 cursor-pointer"
          >
            <div class="w-[50px]">
              <svg width="30px" height="30px" fill="#cccccc" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
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
            </div>
            Каталог сеансов
          </router-link>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import vModalNavItem from '../UI/vModalNavItem.vue'
import NavItem from "./NavItem.vue";

export default {
  components: {
    NavItem,
    vModalNavItem
  },
  props: {
    openBurger: Boolean,
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getCategory'])
  },
  methods: {
    ...mapActions(['loadCurrentUser', 'loadCategory']),
  },
  mounted() {
    this.loadCategory();
  }
};
</script>

<style lang="scss" scoped>
.nav__item svg {
  fill: #cccccc;
}

.nav__item:hover svg {
  fill: #fff;
}

svg {
  margin: 0;
}

.nav-item__link {
  width: 100%;
  display: flex;
  align-items: center;
}

.router-link-active {
  color: #f99929;
}

.router-link-active:hover {
  color: #ffffff;
}

.router-link-active svg {
  fill: #f99929;
}
</style>
