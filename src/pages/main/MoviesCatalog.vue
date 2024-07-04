<template>
  <h1 class="content__title block text-[28px] font-[700] mb-4">Каталог фильмов</h1>
  <div class="grid grid-cols-5 gap-5 mt-[20px] max-[1300px]:grid-cols-4 max-[1060px]:grid-cols-3 max-[676px]:grid-cols-2 max-[676px]:gap-2 max-[568px]:grid-cols-1">
    <catalog-item
        v-for="item in getAllMovies.results"
        :key="item.id"
        :item="item"
    />
  </div>
</template>

<script>
import CatalogItem from "../../components/template/catalog/CatalogItem.vue";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Movies",
  data(){
    return {
      params: {
        page: 1,
        limit: 15
      }
    }
  },
  components: {
    CatalogItem
  },
  computed: {
    ...mapGetters(['getAllMovies'])
  },
  methods: {
    ...mapActions(['loadAllMovies'])
  },
  mounted() {
    this.loadAllMovies(this.params)
  }
}
</script>

<style scoped>

</style>