<template>
  <div class="header-container">
    <div style="height:60px"></div>
    <!-- 
        네비게이션 참고 url : 
        https://github.com/vuetifyjs/vuetifyjs.com/blob/master/src/examples/layouts/complex.vue
        
       -->
       <span class="hidden-md-and-up">
         <v-navigation-drawer v-model="drawerRight" fixed right clipped app>
      <v-list dense>
        <v-list-tile v-for="(nav, index) in navList" :key="index" @click.stop="moveTo(nav.path)">
          <v-list-tile-content>
            <v-list-tile-title>{{nav.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
      </span>
   
    <v-toolbar color="blue" dark fixed app clipped-right>
      <v-toolbar-title>
        <nuxt-link to="/">한국청소년문화원</nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="hidden-md-and-up">
          <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
      </span>
      <span class="hidden-sm-and-down">
        <v-toolbar-items>
          <v-btn flat v-for="(nav, index) in navList" :key="index">
            <nuxt-link :to="nav.path">{{nav.title}}</nuxt-link>
          </v-btn>
        </v-toolbar-items>
      </span>
    </v-toolbar>

  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  data: () => ({
    drawerRight: false,
    navList: [
      {
        path: '/posts',
        title: '활동'
      },
      {
        path: '/about',
        title: '연혁'
      },
      {
        path: '/admin',
        title: '관리자페이지'
      }
    ]
  }),
  methods: {
    moveTo(path) {
      this.$router.push(path)
    }
  }
}
</script>


<style scoped>
</style>
