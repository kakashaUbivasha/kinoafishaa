<template>
  <div class="flex items-center justify-center">
    <div class="max-w-[500px] w-full p-5 shadow px-10 rounded-lg">
      <h1
          class="font-bold text-center text-2xl mb-3.5"
      >
        Создайте профиль
      </h1>
      <p
          class="text-slate-300 text-base mb-3"
      >
        Уже есть аккаунт?
        <router-link
            :to="{name:'autorization'}"
            class="text-green-600"
        >
          Войдите
        </router-link>
      </p>
      <!--        Autorization-->
      <form
          @submit.prevent="autorization"
          action="#"
          enctype="multipart/form-data">
        <label for="user-email" class="block text-left mt-5 text-slate-400">Имя</label>
        <v-input
            v-model="register_user.name"
            id="user-email"
            type="text"
            class="intro-x login__input form-control py-3 px-4 block mb-3"
            placeholder="Ваше имя"
        />
        <label for="user-email" class="block text-left mt-5 text-slate-400">Email</label>
        <v-input
            v-model="register_user.email"
            id="user-email"
            type="email"
            class="intro-x login__input form-control py-3 px-4 block"
            placeholder="Email"
        />
        <label for="user-phone" class="block mt-5 text-left mb-3 text-slate-400">Телефон</label>
        <v-input
            v-model="register_user.phone"
            v-mask="'+998 (##)-###-##-##'"
            id="user-phone"
            class="max-w-[400px] w-full"
            type="tel"
            placeholder="Напишите номер телефона"
            maxlength="19"
        />
        <label for="user-password" class="block mt-5 text-left mb-3 text-slate-400">Пароль</label>
        <v-input
            v-model="register_user.password"
            id="user-password"
            type="password"
            class="intro-x login__input form-control py-3 px-4 block"
            placeholder="Пароль"
        />
        <button type="submit"
                class="block w-full mt-3.5 p-3 bg-red-600 rounded-3xl text-white hover:bg-red-700 transition-all ease-in-out">
          Создать
        </button>
      </form>
      <!--        End Autorization-->
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import VInput from "../../components/template/UI/vInput.vue";
export default {
  name: "Register",
  components: {VInput},
  data() {
    return {
      register_user: {
        name: '',
        email: '',
        password: '',
        phone: '',
      },
    }
  },
  computed: {
    ...mapGetters['getCurrentUser']
  },
  methods: {
    ...mapActions(['loadCurrentUser', 'register']),
    autorization(){
      this.register(this.register_user);
    }
  },
  mounted() {
    // if(this.getCurrentUser.id) {
    //   this.$router.push({name: 'home'})
    // }
  }
}
</script>

<style scoped>

</style>