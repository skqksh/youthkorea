<template>
  <div>
    <!--
        네비게이션 참고 url :
        https://github.com/vuetifyjs/vuetifyjs.com/blob/master/src/examples/layouts/complex.vue

       -->

    <Drawer :items="loadedMenus" isRight :drawer="drawerRight" class="hidden-md-and-up" />
    <v-toolbar :clipped-right="$vuetify.breakpoint.lgAndUp" color="blue darken-2" dark app fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-icon @click.stop="drawer = !drawer" v-if="isAdmin">list&nbsp;&nbsp;</v-icon>
        <nuxt-link to="/"> 한국청소년문화원</nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight" class="hidden-md-and-up"></v-toolbar-side-icon>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(menu, index) in loadedMenus" :key="index" @click="clickMenu(menu.id);selectedMainMenu=menu.id">
          {{menu.name}}
        </v-btn>

      </v-toolbar-items>
      <v-tabs v-if="subMenuNav.length>0&&$vuetify.breakpoint.mdAndUp" slot="extension" color="transparent" centered slider-color="yellow">
        <template v-for="subMenu in subMenuNav">
          <v-menu v-if="subMenu.children.length>0" class="v-tabs__div" offset-y right :key="subMenu.id">
            <v-btn flat slot="activator" @click="clickMenu(subMenu.id)">
              {{subMenu.name}}
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="subsubMenu in subMenu.children" :key="subsubMenu.id" @click="clickMenu(subsubMenu.id)">
                {{ subsubMenu.name }}
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-tab v-else :key="subMenu.id" @click="clickMenu(subMenu.id)">
            {{subMenu.name}}
          </v-tab>
        </template>

      </v-tabs>
    </v-toolbar>
    <Drawer :items="adminNavList" :drawer="drawer" v-if="isAdmin" isAdmin/>
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
      selectedMainMenu: '',
      menus: [],
      loadedMenus: []

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
      },
      clickMenu(id) {
        let theMenu = this.menus.find(x => x.id === id)
        if (theMenu.menuType === this.CONST.MENUTYPE.SINGLE) {
          this.$router.push('/menu/page/' + id)
        } else if (theMenu.menuType === this.CONST.MENUTYPE.MULTI) {
          this.$router.push('/menu/board/' + id)
        }
      }
    },
    computed: {
      subMenuNav() {
        if (this.selectedMainMenu) {
          return this.menus.filter(x => x.parentId === this.selectedMainMenu)
        }
        return []
      },
      adminNavList() {
        var list = [{
            icon: 'web',
            click: '/admin',
            name: '관리자메인'
          },
          {
            icon: 'vertical_split',
            click: '/admin/setting/menu',
            name: '메뉴 설정'
          },
          {
            icon: 'view_comfy',
            click: '/admin/setting/category',
            name: '카테고리 설정'
          },
          {
            icon: 'fas fa-clipboard-list',
            name: '게시판 관리',
            children: [{
                icon: 'far fa-edit',
                click: '/admin/new-post',
                name: '새글 작성'
              },
              {
                icon: 'fas fa-edit',
                click: '/admin/post-list',
                name: '게시글목록 / 수정'
              }
            ]
          },
          {
            icon: 'far fa-newspaper',
            name: '페이지 관리',
            children: [{
              icon: 'fas fa-edit',
              click: '/admin/page-list',
              name: '페이지목록 / 수정'
            }]
          }
        ]
        if (this.$store.getters.isAuthenticated) {
          list.push({
            icon: 'exit_to_app',
            click: 'onLogout',
            name: '로그아웃'
          })
        }
        return list
      }
    },
    mounted() {},
    created() {
      this.menus = this.$store.getters.loadedMenus.sort((a, b) =>
        this.CONST.sortFunc(a, b, 'order', true)
      )
      this.loadedMenus = this.CONST.unflatten(this.$store.getters.loadedMenus)

    }
  }

</script>


<style scoped>


</style>
