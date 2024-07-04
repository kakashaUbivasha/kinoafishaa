<template>
  <tr>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.id }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.user_name }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.description }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ formatTime(item.created_at) }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.user_phone }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      <div v-if="item.file_url" class="border w-[50px] h-[50px] rounded-full bg-white mr-2 overflow-hidden">
        <a :href="getServerDomain + item.file_url" alt=""
           class="block mx-auto my-[4px] w-[40px] h-[40px] rounded-full object-cover">
          <img class="block w-[40px] h-[40px]" src="/img/file.svg" alt="file">
        </a>
      </div>
      <div v-else>
        нет
      </div>
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ formatSolved(item.solved) }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      <div class="max-w-[400px] rounded-[4px] w-full mt-3">
        <label class="form_radio flex items-center w-full" for="radio-1">
          <div class="bg-white rounded-full overflow-hidden mr-3 p-2">
            решено
          </div>
          <input
              id="radio-1"
              type="checkbox"
              name="radio"
              :checked="item.solved"
              @change="updateSupport(item.id,$event.target.checked)"
          >
        </label>
      </div>
    </td>
  </tr>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SupportItem",
  props: {
    item: Object
  },
  data(){
    return {
      checked: '',
    }
  },
  computed: {
    ...mapGetters(['getServerDomain'])
  },
  methods: {
    formatSolved(data) {
      if (data) {
        return 'решён'
      } else {
        return 'не решён'
      }
    },
    updateSupport(id, data) {
      this.$emit('updateSupport', id , data)
    },
    formatTime(data) {
      let full_data = data;
      let full_data_time = new Date(full_data)
      let d = full_data_time.getDate();
      let m = full_data_time.getMonth() + 1;
      let y = full_data_time.getFullYear();
      let hour = full_data_time.getHours();
      let minutes = full_data_time.getMinutes();
      if(minutes < 10){
        minutes = '0' + minutes;
      }
      let result = String(d + '/' + m + '/' + y + ' ' + hour + ':' + minutes)
      return result
    },
  }
}
</script>

<style scoped>

</style>