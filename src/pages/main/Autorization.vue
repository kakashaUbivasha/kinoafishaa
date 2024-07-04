<template>
  <div class="flex items-center justify-center">
    <div class="max-w-[500px] w-full p-5 shadow px-10 rounded-lg">
      <h1
          class="font-bold text-center text-2xl mb-3.5"
      >
        Войти
      </h1>
      <p
          class="text-slate-300 text-base mb-3"
      >
        У вас нет аккаунта?
        <router-link
            class="text-green-600"
            :to="{name:'register'}"
        >
          Создайте
        </router-link>
      </p>


      <!--        Login-->
      <form
          @submit.prevent="auth"
          action="#"
          enctype="multipart/form-data">
        <label for="user-email" class="block text-left mb-3 text-slate-400">Email</label>
        <v-input
            v-model="user.phone"
            id="user-email"
            type="text"
            class="intro-x login__input form-control py-3 px-4 block"
            placeholder="Email"
        />
        <label for="user-password" class="block mt-5 text-left mb-3 text-slate-400">Пароль</label>
        <v-input
            v-model="user.password"
            id="user-password"
            type="password"
            class="intro-x login__input form-control py-3 px-4 block"
            placeholder="Пароль"
        />
        <button type="submit" class="block w-full mt-3.5 p-3 bg-red-600 rounded-3xl text-white hover:bg-red-700 transition-all ease-in-out">
          Войти
        </button>
      </form>
      <!--        End login-->

    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import VInput from "../../components/template/UI/vInput.vue";

export default {
  name: "Autorization",
  components: {
    VInput,
  },
  data(){
    return {
      user:{
        phone: '',
        password: '',
      },
      register_user: {
        name: '',
        email: '',
        password: '',
        phone: '',
      },
    }
  },
  computed:{
    ...mapGetters(['getAuth', 'getCurrentUser'])
  },
  methods:{
    ...mapActions(['login', 'loadCurrentUser']),
    auth(){
      this.login(this.user);
    },
  },
  mounted() {
    if(this.getCurrentUser.id){
      this.$router.push({name:'home'})
    }
  }
}
</script>

<style scoped>

</style>