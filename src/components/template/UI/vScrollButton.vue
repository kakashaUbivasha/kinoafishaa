<template>
  <div>
    <Transition name="fade">
      <div
          v-if="this.scrollPosition < 50"
          class="fixed max-lg:hidden cursor-pointer bottom-5 right-5 rounded-full h-[50px] w-[50px] bg-[#932b01] z-50 hover:bg-[#fc5716] duration-300 ease-in-out"
           @click="toTop"
      >
        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 8L12 16" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15 11L12.087 8.08704V8.08704C12.039 8.03897 11.961 8.03897 11.913 8.08704V8.08704L9 11" stroke="#FFF"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scTimer: 0,
      scY: 0,
      scrollPosition: 0,
    }
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    scrollToTop() {
      return this.scrollPosition < 50
      window.scrollToTop({top: 0, behavior: 'smooth'})
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('scroll', this.updateScroll)
  }
}
</script>

<style>
</style>