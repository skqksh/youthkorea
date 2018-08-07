<template>
  <v-btn class="button" :color="btnStyle" v-bind="$attrs" v-on="$listeners" :disabled="loading">
    <v-progress-circular v-if="loading" indeterminate color="black"></v-progress-circular>
    <slot v-else />
  </v-btn>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    btnStyle: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean
    }
  }
}
</script>


<style scoped>
</style>
