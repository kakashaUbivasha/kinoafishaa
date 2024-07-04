<template>
  <div>
    <h1 class="content__title block text-[28px] font-[700] mb-4">Все залы</h1>

    <div class="users__table relative rounded-xl overflow-auto">
      <div class="shadow-sm my-8">
        <table class="border-collapse w-full text-sm overflow-x-auto">
          <thead>
          <tr class="bg-primary rounded-[4px]">
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">№</th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Название</th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Рядов</th>
            <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pb-3 text-white dark:text-slate-200 text-left">Мест</th>
          </tr>
          </thead>
          <tbody>
          <hall-item
              v-for="item in getAllHalls"
              :id="item.id"
              :item="item"
          />
          </tbody>
        </table>
      </div>
  </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import orderItem from "../../components/template/catalog/OrderItem.vue";
import HallItem from "../../components/template/catalog/HallItem.vue";
export default {
  name: "Halls",
  data(){
    return {
      params: {
        page: 1,
        limit: 15
      }
    }
  },
  components: {
    HallItem,
    orderItem
  },
  computed: {
    ...mapGetters(['getAllHalls'])
  },
  methods: {
    ...mapActions(['loadAllHalls'])
  },
  mounted() {
    this.loadAllHalls(this.params)
  }
}
</script>

<style scoped>

</style>