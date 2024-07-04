<template>
  <input
      :value="modelValue"
      :v-model="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="block p-3 w-full border-2 border-solid border-inherit focus:outline-0 focus:border-primary rounded mb-1.5"
      :type="type"
      :placeholder="placeholder">
</template>

<script>
export default {
  name: "vInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>

</style>