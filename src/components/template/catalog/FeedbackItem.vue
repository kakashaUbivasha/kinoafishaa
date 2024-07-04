<template>
  <tr>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.id }}
    </td>
    <td class="border-b border-slate-100 break-all dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.user_name }}
    </td>
    <td class="border-b border-slate-100 break-all dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.description }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ formatTime(item.created_at) }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.rating }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ item.item_name }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {{ formatPublish(item.publish) }}
    </td>
    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      <div class="max-w-[400px] rounded-[4px] w-full mt-3">
        <label class="form_radio flex items-center w-full" for="radio-1">
          <div class="bg-white rounded-full overflow-hidden mr-3 p-2">
            опубликовать
          </div>
          <input
              id="radio-1"
              type="checkbox"
              name="radio"
              :checked="item.publish"
              @change="updateFeedback(item.id,$event.target.checked)"
          >
        </label>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "FeedbackItem",
  props: {
    item: Object
  },
  methods: {
    formatPublish(data) {
      if (data) {
        return 'опубликован'
      } else {
        return 'не опубликован'
      }
    },
    updateFeedback(id, data) {
      this.$emit('updateFeedback', id , data)
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