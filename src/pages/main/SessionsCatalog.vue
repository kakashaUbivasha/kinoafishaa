<template>
  <h1 class="content__title block text-[28px] font-[700] mb-4">Каталог сеансов</h1>
  <div class="grid grid-cols-5 gap-5 mt-[20px] max-[1300px]:grid-cols-4 max-[1060px]:grid-cols-3 max-[676px]:grid-cols-2 max-[676px]:gap-2 max-[568px]:grid-cols-1">
    <sessions-catalog-item
        v-for="item in getAllSessions.results"
        :key="item.id"
        :item="item"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import SessionsCatalogItem from "../../components/template/catalog/SessionsCatalogItem.vue";

export default {
  name: "SessionsCatalog",
  data(){
    return {
      params: {
        page: 1,
        limit: 15
      }
    }
  },
  components: {
    SessionsCatalogItem,
  },
  computed: {
    ...mapGetters(['getAllSessions'])
  },
  methods: {
    ...mapActions(['loadAllSessions'])
  },
  mounted() {
    this.loadAllSessions(this.params)
  }
}
</script>

<style scoped>

</style>