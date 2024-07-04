<template>
  <div class="flex justify-around max-lg:flex-col">
    <div class="w-3/12 max-lg:w-full max-lg:py-4 max-lg:border-t overflow-y-hidden">
      <p class="text-white font-bold text-xl cursor-pointer" @click="openDropdown = !openDropdown">Пользователям</p>
      <XyzTransition xyz="fade up-1">
        <ul v-if="open(openDropdown)">
        <li class="cursor-pointer font-normal text-[15px] text-gray-200 leading-9 transition-all" v-for="link in links" :key="link.index">
          <router-link :to="{name:link.link}">
            {{ link.name }}
          </router-link>
        </li>
      </ul>
      </XyzTransition>
    </div>
    <div class="w-3/12 max-lg:w-full max-lg:py-4 max-lg:border-t max-lg:border-b">
      <p class="text-white font-bold text-xl cursor-pointer"  @click="openDropdown2 = !openDropdown2">Контакты</p>
      <XyzTransition xyz="fade up-1">
        <ul v-if="open(openDropdown2)">
        <li class=" font-normal text-[15px] text-gray-200 leading-9" v-for="contact in contacts" :key="contact.index">
            {{ contact.name }}
            <a class="text-white font-semibold hover:text-primary duration-300 ease-in-out" :href="`tel:${contact.contact}`">{{ contact.contact }}</a>
            <a class="text-white font-semibold hover:text-primary duration-300 ease-in-out" :href="`mailto:${contact.email}`">{{contact.email}}</a>
        </li>
      </ul>
      </XyzTransition>
    </div>
    <div class="w-6/12 max-lg:w-full max-lg:my-10">
      <p>
        Возникли вопросы?
      </p>
      <router-link
          :to="{name:'technical-support'}"
          class="flex py-2 mt-2 items-center justify-center rounded-[4px] text-white font-semibold max-w-[150px] w-full bg-primary hover:bg-[#bb3501] duration-300 ease-in-out"
      >
        Напишите нам!
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        links: [
          {
            name: 'Связаться с нами',
            link: 'technical-support'
          },
          {
            name: 'На главную',
            link: 'home'
          },
        ],
        contacts: [
          {name: 'Телефон:', contact:'+998907546050'},
          {name: 'Email:', email:'tigran@gmail.com'}
        ],
        openDropdown: false,
        openDropdown2: false
      }
    },
    computed:{
     
    },
    methods: {
      open(par){
        if(window.outerWidth < 1024)
        return par
        return window.outerWidth > 1024
      },
    },
    mounted() {
    },
  }
</script>

<style lang="scss" scoped>

</style>