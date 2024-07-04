<template>
    <div class="flex items-center flex-col gap-5">
      <img class="max-w-[500px] w-full" src="/img/404.svg" alt="404 error">
      <h1 class="text-[24px] font-semibold mt-2">Упс! Этой страницы не существует</h1>
      <router-link
          :to="{name:'home'}"
          class="p-3 bg-green-700 text-white rounded-[4px] max-w-[300px] w-full text-center hover:bg-green-800 duration-300 ease-in-out"
      >
        На главную
      </router-link>
    </div>
</template>

<script>
export default {
  name: "Error"
}
</script>

<style scoped>

</style>