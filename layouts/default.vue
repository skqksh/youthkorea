<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav= !displaySidenav"/>
    <TheSidenav
    :show="displaySidenav" 
    @close="displaySidenav=false"
    />
    <nuxt/>
  </div>
</template>
<script>
import TheHeader from '@/components/Navigation/TheHeader.vue'
import TheSidenav from '@/components/Navigation/TheSidenav.vue'
import TheSideNavToggle from '@/components/Navigation/TheSideNavToggle.vue'

export default {
  //미들웨어 추가할 수 있음
  //middleware: 'log',
  components: {
    TheHeader,
    TheSidenav
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
