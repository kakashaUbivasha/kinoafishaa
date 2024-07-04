<template>
  <tr>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.id }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ item.hall_name }}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ formatTime(item.time) }}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ item.movie_name }}</td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{{ formatPrice(item.price)+ ' сум'}}</td>
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
import {toast} from "vue3-toastify";

export default {
  name: "OrderItem",
  props: {
    item: Object,
  },
  methods: {
    formatPrice(data) {
      let numb = data;
      const numbFmt = new Intl.NumberFormat('ru-RU').format(numb);
      return numbFmt;
    },
    formatTime(data){
      if(!data){
        return 'нет'
      }
      let full_data = data;
      let full_data_time = new Date(full_data)
      let d = full_data_time.getDate();
      let m = full_data_time.getMonth() +1;
      let y = full_data_time.getFullYear()
      let hour = full_data_time.getHours();
      let minutes = full_data_time.getMinutes()
      if(minutes < 10){
        minutes = '0' + minutes;
      }
      let result = String(d + '/' + m + '/' + y + ' ' + hour + ':' + minutes)
      return result
    },
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