<template>
  <v-app>
    <TheHeader/>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>
<script>
import TheHeader from '@/components/Navigation/TheHeader.vue'

export default {
  //미들웨어 추가할 수 있음
  //middleware: 'log',
  components: {
    TheHeader
  },
  data() {
    return {
      displaySidenav: false
    }
  }
}
</script>
<style>
html {
  font-family: 'Righteous', sans-serif;
}
</style>
