<template>
  <v-navigation-drawer :value="drawer" :right="isRight" fixed :app="!isRight" :width="$vuetify.breakpoint.xsOnly? 200:300">
    <v-list dense>
      <template v-for="item in items">
        <v-list-group v-if="item.children&&item.children.length>0" v-model="item.model" :key="item.name">
          <v-list-tile slot="activator" @click="isAdmin?'':clickMenu(item.id)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.name }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <template v-for="subMenu in item.children">
            <v-list-group v-if="subMenu.children&&subMenu.children.length>0" v-model="subMenu.model" sub-group :key="subMenu.name" class="grey lighten-4"
              prepend-icon="" append-icon="">
              <v-list-tile slot="activator" @click="isAdmin?navTo(subMenu.click):clickMenu(subMenu.id)">
                <v-list-tile-action>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ subMenu.name }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile v-if="subMenu.children" v-for="subsubMenu in subMenu.children" :key="subsubMenu.name" class="grey lighten-2" @click="clickMenu(subsubMenu.id)">
                <v-list-tile-action/>
                <v-list-tile-action>

                </v-list-tile-action>
                <v-list-tile-content>
                  {{subsubMenu.name}}
                </v-list-tile-content>

              </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="subMenu.name" @click="isAdmin?navTo(subMenu.click):clickMenu(subMenu.id)">
              <v-list-tile-action/>
              <v-list-tile-action>
                <v-icon>{{ subMenu.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ subMenu.name }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list-group>
        <v-list-tile v-else :key="item.name" @click="isAdmin?navTo(item.click):clickMenu(item.id)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.name }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    drawer: {
      type: Boolean,
      required: true
    },
    isRight: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
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
      let theMenu = this.$store.getters.loadedMenus.find(x => x.id === id)
      if (theMenu.menuType === this.CONST.MENUTYPE.SINGLE) {
        this.$router.push('/menu/page/' + id)
      } else if (theMenu.menuType === this.CONST.MENUTYPE.MULTI) {
        this.$router.push('/menu/board/' + id)
      }
    }
  }
}
</script>

<style scoped>
</style>
