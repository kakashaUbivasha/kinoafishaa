<template>
  <tr>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ item.id }}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ item.name }}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ item.email }}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ item.phone }}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ item.role }}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      <div class="border w-[50px] h-[50px] rounded-full bg-white mr-2 overflow-hidden">
        <img :src="item.photo_base64" alt="" class="block mx-auto my-[4px] w-[40px] h-[40px] rounded-full object-cover">
      </div>
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      <div class="flex gap-[10px] items-center justify-center">
        <button
            @click="openEditModal"
            class="category-btn__edit border w-36 p-2 pl-4 text-black border-slate-200 rounded-3xl hover:bg-slate-100 transition-all ease-in-out duration-300"
        >
          Изменить
        </button>
        <button
            @click="openDeleteModal"
            class="category-btn__delete border w-36 p-2 pl-4 text-black border-slate-200 rounded-3xl hover:bg-slate-100 transition-all ease-in-out duration-300"
        >
          Удалить
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "UserItem",
  props: {
    item: Object,
  },
  computed:{
    ...mapGetters(['getServerDomain'])
  },
  methods: {
    openEditModal(){
      this.$emit('openEditModal')
    },
    openDeleteModal(){
      this.$emit('openDeleteModal')
    }
  }
}
</script>

<style scoped>

</style>