<template>
  <div class="category-block__item shadow-md py-4 px-2 flex items-center justify-between bord rounded-3xl max-[600px]:block">
    <div class="category-block__name flex items-center gap-0.5 max-[600px]:mb-[10px] max-[600px]:block max-[600px]:text-center">
      <div class="border w-[30px] h-[30px] rounded-full bg-white mr-2 overflow-hidden max-[600px]:block max-[600px]:m-auto">
        <img :src="getServerDomain + item.photo_url" class="block mx-auto my-[4px] w-[20px] h-[20px] rounded-full object-cover">
      </div>
      <h3 class="category-block__title text-lg font-medium capitalize">{{item.name}}</h3>
    </div>
    <div class="category-block__btns flex gap-2 items-center max-[600px]:justify-center">
      <button
          @click="openEditModal"
          class="category-btn__edit border w-36 p-2 pl-4 text-black border-slate-200 rounded-3xl hover:bg-slate-100 transition-all ease-in-out duration-300"
      >
        Изменить
      </button>
      <button
          @click="openDeleteModal(item.id)"
          class="category-btn__delete border w-36 p-2 pl-4 text-black border-slate-200 rounded-3xl hover:bg-slate-100 transition-all ease-in-out duration-300"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CategoryItem",
  props: {
    item: Object
  },
  computed: {
    ...mapGetters(['getServerDomain'])
  },
  methods: {
    openEditModal(){
      this.$emit('openEditModal')
    },
    openDeleteModal(id){
      this.$emit('openDeleteModal', id)
    }
  }
}
</script>

<style scoped>

</style>