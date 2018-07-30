<template>
  <v-navigation-drawer :value="drawer" :right="isRight" fixed app :width="$vuetify.breakpoint.xsOnly? 200:300">
    <v-list dense>
      <template v-for="item in items">
        <v-list-group v-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon="">
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(child, i) in item.children" :key="i">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :key="item.text" @click="navTo(item.click)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
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
    }
  }
}
</script>

<style scoped>
</style>
