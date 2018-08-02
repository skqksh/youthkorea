<template>
  <v-app>
    <TheHeader isAdmin/>
    <v-content>
         <nuxt/>
    </v-content>
  </v-app>
</template>
<script>
import TheHeader from '@/components/Navigation/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>
<style>
html {
  font-family: 'Righteous', sans-serif;
}
</style>
