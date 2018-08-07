<template>
  <div>
    <!-- 
        네비게이션 참고 url : 
        https://github.com/vuetifyjs/vuetifyjs.com/blob/master/src/examples/layouts/complex.vue
        
       -->

    <Drawer :items="navList" isRight :drawer="drawerRight" class="hidden-md-and-up" />
    <v-toolbar :clipped-right="$vuetify.breakpoint.lgAndUp" color="blue darken-2" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-icon @click.stop="drawer = !drawer" v-if="isAdmin">list&nbsp;&nbsp;</v-icon>
        <nuxt-link to="/"> 한국청소년문화원</nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="(item, index) in navList">
          <v-menu v-if="item.children" :key="index">
            <v-btn slot="activator" flat>
              {{item.text}}
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="(child, i) in item.children" :key="i" @click="navTo(child.click)">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-btn v-else flat @click="navTo(item.click)" :key="index">
            {{item.text}}
          </v-btn>
        </template>

      </v-toolbar-items>
    </v-toolbar>
    <Drawer :items="adminNavList" :drawer="drawer" v-if="isAdmin" />   
  </div>
</template>

<script>
import Drawer from '@/components/Navigation/Drawer.vue'
import CONST from '@/plugins/const.js'

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
        icon: 'grade',
        click: '/posts',
        text: '활동'
      },
      {
        text: '소개',
        children: [
          {
            icon: 'pan_tool',
            text: '인사말',
            click: '/about/' + CONST.CATEGORY.ORG_GREETING
          },
          {
            icon: 'group',
            text: '조직도',
            click: '/about/' + CONST.CATEGORY.ORG_CHART
          },
          {
            icon: 'account_balance',
            text: '연혁',
            click: '/about/' + CONST.CATEGORY.ORG_HISTORY
          }
        ]
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
        text: '소개',
        children: [
          {
            icon: 'pan_tool',
            text: '인사말',
            click: '/admin/setting/introduce/' + CONST.CATEGORY.ORG_GREETING
          },
          {
            icon: 'group',
            text: '조직도',
            click: '/admin/setting/introduce/' + CONST.CATEGORY.ORG_CHART
          },
          {
            icon: 'account_balance',
            text: '연혁',
            click: '/admin/setting/introduce/' + CONST.CATEGORY.ORG_HISTORY
          }
        ]
      },
      {
        icon: 'vertical_split',
        click: '/admin/setting/menu',
        text: '메뉴 설정'
      },
      {
        icon: 'view_comfy',
        click: '/admin/setting/category',
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
  },
  mounted() {
    if (process.env.NODE_ENV === this.CONST.DEVELOPMENT) {
      this.navList.push({
        icon: 'vpn_key',
        click: '/admin',
        text: '관리자페이지'
      })
    }
  }
}
</script>


<style scoped>
</style>
