<template>
  <div class="header-container">
    <!-- 
        네비게이션 참고 url : 
        https://github.com/vuetifyjs/vuetifyjs.com/blob/master/src/examples/layouts/complex.vue
        
       -->

    <Drawer :items="navList" isRight :drawer="drawerRight" v-if="$vuetify.breakpoint.smAndDown" />
    <v-toolbar :clipped-right="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-icon @click.stop="drawer = !drawer" v-if="isAdmin">list</v-icon>
        <nuxt-link to="/"> 한국청소년문화원</nuxt-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight" v-if="$vuetify.breakpoint.smAndDown"></v-toolbar-side-icon>
      <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn flat v-for="(item, index) in navList" :key="index" @click="navTo(item.click)">
          {{item.text}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <Drawer :items="adminNavList" :drawer="drawer" v-if="isAdmin" />
  </div>
</template>

<script>
import Drawer from '@/components/Navigation/Drawer.vue'

export default {
  name: 'TheHeader',
  props: {
    isAdmin: {
      type: Boolean
    }
  },
  components: {
    Drawer
  },
  data: () => ({
    drawerRight: false,
    drawer: true,
    navList: [
      {
        click: '/posts',
        text: '활동'
      },
      {
        click: '/about',
        text: '연혁'
      },
      {
        click: '/admin',
        text: '관리자페이지'
      }
    ],
    adminNavList: [
      {
        icon: 'web',
        click: '/admin',
        text: '관리자메인'
      },
      {
        icon: 'edit',
        click: '/admin/new-post',
        text: '새글 작성'
      },
      {
        icon: 'view_comfy',
        click: '/admin/setting',
        text: '카테고리 설정'
      },
      {
        icon: 'exit_to_app',
        click: 'onLogout',
        text: '로그아웃'
      }
    ]
  }),
  methods: {
    moveTo(path) {
      this.$router.push(path)
    },
    onLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/admin/auth')
    },
    navTo(val) {
      if (val === 'onLogout') {
        if (confirm('로그아웃 하시겠습니까?')) {
          this.onLogout()
        }
      } else {
        this.moveTo(val)
      }
    }
  }
}
</script>


<style scoped>
</style>
