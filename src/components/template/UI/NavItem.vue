<template>
  <div class="nav__item flex mx-auto items-center fill-[#ccc] hover:fill-white hover:bg-primary w-   rounded-3xl transition-all hover:text-white text-xl">
    <router-link :to="{name:'catalog', params:{id:item.id, name:item.name}}" @click="clicked(item.id)" class="capitalize nav-item__link flex items-center px-4 py-2 cursor-pointer">
      <div class="border w-[30px] h-[30px] rounded-full bg-white mr-5 overflow-hidden">
        <img :src="getServerDomain + item.photo_url" alt="" class="block mx-auto my-[4px] w-[20px] h-[20px] rounded-full object-cover">
      </div>
      {{ item.name }}
    </router-link>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NavItem",
  props: {
    item: Object
  },
  data(){
    return {
      params :{
        page: 1
      }
    }
  },
  computed:{
    ...mapGetters(['getServerDomain', 'getCurrentUser', 'getItems'])
  },
  methods:{
    ...mapActions(['loadCurrentUser', 'loadCatalogItems']),
    clicked(id){
      let par = {category_id:id, page:this.params.page}
      this.loadCatalogItems(par)
    }
  },
}
</script>

<style scoped>
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