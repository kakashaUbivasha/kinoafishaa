<template>
  <Transition name="fade">
    <div v-if="show"
         class="preloader flex items-center flex-col justify-center fixed top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] z-[9999] gradient">
      <img class="home-top absolute w-[200px] ml-[95px] mb-[-40px]" src="/img/movie-top.svg" alt="home">
      <img class="home w-[200px] -ml-[10px]" src="/img/movie-boottom.svg" alt="home">
      <h1 class="home text-white text-4xl font-bold mt-[-9px]">KINOAFISHA</h1>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "Preloader",
  data() {
    return {
      show: true
    }
  },
  methods: {
    showPreloader() {
      setTimeout(() => {
        this.show = false;
      }, 700)
    }
  },
  mounted() {
    this.showPreloader();
  }
}
</script>

<style>
.home {
  /*transform: translate(0, -200%);*/
  animation: fromTop 0.5s linear;
}

.home-top {
  margin-left: -30px;
  transform: translateY(-5px) rotate(11deg);
  animation: fromBottom 0.1s linear;
  margin-bottom: -16px;
  transition: 0.3s ease-in-out;
}

.gradient {
  /*background: linear-gradient(90deg, rgba(154,0,0,1) 0%, rgba(89,0,0,1) 0%, rgba(181,0,0,1) 0%, rgba(255,119,0,1) 49%, rgba(168,3,3,1) 100%, rgba(98,0,0,1) 100%);*/
  background: radial-gradient(circle, rgba(255,122,32,1) 0%, rgba(190,0,0,1) 100%);
}

@keyframes fromBottom {
  0% {
    margin-left: 20px;
    transform: translateY(-150px) rotate(-73deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

</style>