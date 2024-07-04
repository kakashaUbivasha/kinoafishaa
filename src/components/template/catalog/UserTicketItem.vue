<template>
  <div
      class="border rounded-xl p-4 flex items-center justify-between max-[800px]:flex-col"
      :class="{
        '!border-grey !text-[#bdbdbd]': last,
      }"
  >
    <div class="flex items-center gap-5 max-[1030px]:flex-col">
      <div class="w-[200px] flex items-center gap-3 text-green-600 max-[1030px]:w-auto">
        <svg :class="{'!fill-green-600': future, '!fill-[#bdbdbd]': last, '!fill-blue-600': now}" height="30px" width="30px" >
          <path d="M29.6,3.8c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4c1.1,1.1,1.1,2.8,0,3.9c-1,1-2.8,1-3.9,0l-1.3-1.3c0,0,0,0,0,0
          C20.7,4.9,17.1,3,13,3C5.8,3,0,8.8,0,16s5.8,13,13,13s13-5.8,13-13c0-1.5-0.3-2.9-0.7-4.2c0.3,0.1,0.7,0.1,1,0.1
          c1.3,0,2.5-0.5,3.3-1.4C31.5,8.6,31.5,5.6,29.6,3.8z M5.9,8.9C7,7.7,9,7.7,10.1,8.9c0,0,0,0,0,0s0,0,0,0C10.7,9.4,11,10.2,11,11
          s-0.3,1.6-0.9,2.1C9.6,13.7,8.8,14,8,14s-1.6-0.3-2.1-0.9C5.3,12.6,5,11.8,5,11S5.3,9.4,5.9,8.9z M10.1,23.1C9.6,23.7,8.8,24,8,24
          s-1.6-0.3-2.1-0.9C5.3,22.6,5,21.8,5,21s0.3-1.6,0.9-2.1c0,0,0,0,0,0s0,0,0,0c1.1-1.1,3.1-1.1,4.2,0c0.6,0.6,0.9,1.3,0.9,2.1
          S10.7,22.6,10.1,23.1z M10.9,18.1C10.3,17.6,10,16.8,10,16s0.3-1.6,0.9-2.1c1.1-1.1,3.1-1.1,4.2,0c0,0,0,0,0,0s0,0,0,0
          c0.6,0.6,0.9,1.3,0.9,2.1s-0.3,1.6-0.9,2.1C14.6,18.7,13.8,19,13,19S11.4,18.7,10.9,18.1z M20.1,23.1C19.6,23.7,18.8,24,18,24
          s-1.6-0.3-2.1-0.9c0,0,0,0,0,0s0,0,0,0C15.3,22.6,15,21.8,15,21s0.3-1.6,0.9-2.1c1.1-1.1,3.1-1.1,4.2,0c0.6,0.6,0.9,1.3,0.9,2.1
          S20.7,22.6,20.1,23.1z M20.1,13.1C20.1,13.1,20.1,13.1,20.1,13.1C20.1,13.1,20.1,13.1,20.1,13.1C19.6,13.7,18.8,14,18,14
          s-1.6-0.3-2.1-0.9C15.3,12.6,15,11.8,15,11s0.3-1.6,0.9-2.1c1.1-1.1,3.1-1.1,4.2,0C20.7,9.4,21,10.2,21,11S20.7,12.6,20.1,13.1z"/>
        </svg>
        <p v-if="future" class="text-green-600">
          Запланирован
        </p>
        <p v-if="last" class="text-[#bdbdbd]">
          Прошёл
        </p>
        <p v-if="now" class="text-blue-600">
          Идёт
        </p>
      </div>
      <router-link
          :to="{name: 'sessions-catalog-page', params:{id:item.session_id}}"
          class="cursor-pointer"
      >
        {{ item.movie_name + ', ' + item.hall_name }}
      </router-link>
      <p>{{ formatPrice(item.session_price) + ' сум' }}</p>
    </div>
    <p>{{ formatTime(item.session_time) }}</p>
    <p>{{ 'Ряд ' + item.row }}</p>
    <p>{{ 'Место ' + item.seat }}</p>
    <button
        @click="this.$emit('cancelTicket')"
        class="max-[800px]:mt-5 category-btn__delete border w-36 p-2 pl-4 text-black border-slate-200 rounded-3xl hover:bg-slate-100 transition-all ease-in-out duration-300"
    >
      Отмена
    </button>
  </div>
</template>

<script>
export default {
  name: "UserTicketItem",
  props: {
    item: Object
  },
  data(){
    return {
      now: false,
      last: false,
      future: false
    }
  },
  methods: {
    formatPrice(data) {
      let numb = data;
      const numbFmt = new Intl.NumberFormat('ru-RU').format(numb);
      return numbFmt;
    },
    formatTime(data){
      let full_data = data;
      let full_data_time = new Date(full_data)
      let options = {month:'long', day:'numeric', hour:'numeric', minute:'numeric'}

      return full_data_time.toLocaleString('ru', options)
    },
  },
  mounted() {
    const originalTime = new Date(this.item.session_time);
    const end = new Date(originalTime.getTime() + this.item.movie_duration * 60000).toISOString();

    let today  = new Date().toISOString();
    if (today > end){
      this.last = true
    } else if (today < this.item.session_time){
      this.future = true
    } else if (today >= this.item.session_time && today <= end){
      this.now = true
    }
  }
}
</script>

<style scoped>

</style>