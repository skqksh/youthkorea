<template>
  <v-app>
    <TheHeader/>
    <v-content>
      <nuxt/>
    </v-content>
    <v-footer dark height="auto">
      <v-card flat tile class="white--text text-xs-center"  color="blue darken-1" style="width:100%">

        <v-card-text>
          <v-layout row wrap>
            <v-spacer/>
            <v-flex md6 text-md-left>
              <b>(사)한국청소년문화원</b> 
              <br>
              <v-icon size="20px">fas fa-map-marker-alt</v-icon> 경남 양산시 덕명로 322, 상가 4층
              <v-icon size="20px">fas fa-phone</v-icon> 055-387-6824
            </v-flex>
            <v-flex md4>
              <v-btn v-for="icon in footerIcons" :key="icon.name" class="mx-3 white--text" icon>
                <a :href="icon.link" target="_blank">
                  <v-icon size="24px">{{ icon.name }}</v-icon>
                </a>
              </v-btn>
            </v-flex>
          </v-layout>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="grey darken-3 justify-center">
          &copy;{{ new Date().getFullYear() }} Copyright
          <strong>Blue</strong>
        </v-card-text>
      </v-card>
    </v-footer>
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
      displaySidenav: false,
      footerIcons: [
        {
          name: 'fab fa-facebook',
          link: 'https://www.facebook.com/koreyouth'
        },
        {
          name: 'fas fa-bold',
          link: 'https://blog.naver.com/youthlem'
        }
      ]
    }
  }
}
</script>
<style>
html {
  font-family: 'Righteous', sans-serif;
}
</style>
