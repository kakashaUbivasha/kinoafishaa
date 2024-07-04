<template>
  <div class="flex items-start p-5 rounded-[18px] shadow-[0_0_20px_rgba(0,0,0,.1)] max-[560px]:flex-col">
    <img
        class="rounded-full w-[220px] h-[210px] shadow-[0_0_20px_rgba(0,0,0,.1)] max-[560px]:m-auto"
        :src="getCurrentUser.photo" alt="фотография пользователя"
    >
    <div class="ml-6 max-[560px]:m-auto max-[560px]:mt-5">
      <h1 class="content__title block text-[28px] font-[700] mb-4">{{ getCurrentUser.name}}</h1>
      <p class="flex items-center mt-2">
        <span class="text-[#868695] mr-2">Email: </span>
        {{ getCurrentUser.email}}
      </p>
      <p class="flex items-center mt-2">
        <span class="text-[#868695] mr-2">Телефон: </span>
        {{ getCurrentUser.phone}}
      </p>
      <p class="flex items-center text-[#868695] mt-2">
        {{ getCurrentUser.role}}
      </p>
      <div class="flex items-center gap-5 max-[560px]:flex-col w-full">
        <button
            class="max-w-[100px] w-full p-2 bg-red-500 text-white mt-3 rounded-[4px] hover:bg-red-600 duration-300 ease-in-out max-[560px]:w-full max-[560px]:max-w-full"
            @click="logout"
        >
          Выйти
        </button>
        <router-link
            :to="{name:'user-delivery'}"
            class="hidden max-lg:block text-center max-w-[100px] w-full p-2 bg-green-500 text-white mt-3 rounded-[4px] hover:bg-green-600 duration-300 ease-in-out max-[560px]:w-full max-[560px]:max-w-full"
        >
          Сеансы
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters(['getCurrentUser', 'getServerDomain'])
  },
  methods: {
    ...mapActions(['loadCurrentUser']),
    logout(){
      localStorage.removeItem('token');
      window.location.reload()
      // this.$router.push('autorization')
    }
  },
  mounted() {
    this.loadCurrentUser()
    if(!localStorage.getItem('token')){
      this.$router.push('autorization')
    }
  }
}
</script>

<style scoped>

</style>