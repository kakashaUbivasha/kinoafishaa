<template>
  <tr>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.id }}
    </td>
    <td class="border-b capitalize border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 hover:text-primary cursor-pointer duration-300 ease-in-out">
      <router-link
          :to="{name:'product', params:{id:item.id}}"
      >
      {{ formatName(item.name) }}
      </router-link>
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      <div class="border w-[30px] h-[30px] m-auto rounded-full bg-white overflow-hidden max-[600px]:block max-[600px]:m-auto cursor-pointer">
        <img
            :src="getServerDomain + item.photo_url"
            class="block mx-auto my-[4px] w-[20px] h-[20px] rounded-full object-cover"
            @click="openImageModal"
        >
      </div>
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.description }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.age_limit }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.duration + ' мин' }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      <div class="category-block__btns flex gap-2 items-center max-[600px]:justify-center">
        <button
            @click="openEditModal"
            class="category-btn__edit border w-36 p-2 pl-4 text-black border-slate-200 rounded-3xl hover:bg-slate-100 transition-all ease-in-out duration-300"
        >
          Изменить
        </button>
        <button
            @click="openDeleteModal(item)"
            class="category-btn__delete border w-36 p-2 pl-4 text-black border-slate-200 rounded-3xl hover:bg-slate-100 transition-all ease-in-out duration-300"
        >
          Удалить
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ProductItem",
  props: {
    item: Object
  },
  computed: {
    ...mapGetters(['getServerDomain'])
  },
  methods: {
    formatName(data) {
      let text = '';
      if (data.length > 30) {
        text = data.slice(0, 29) + '...'
        return text
      } else {
        return data
      }
    },
    formatPrice(data) {
      let numb = data;
      const numbFmt = new Intl.NumberFormat('ru-RU').format(numb);
      return numbFmt;
    },
    openEditModal(data) {
      this.$emit('openEditModal', data)
    },
    openDeleteModal(data) {
      this.$emit('openDeleteModal', data)
    },
    openImageModal(){
      this.$emit('openImageModal')
    }
  }
}
</script>

<style scoped>

</style>