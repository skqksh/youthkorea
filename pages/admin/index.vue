<template>
 <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>관리자페이지 메인</h1>
      </v-flex>
      <v-flex xs12 md6>
        <v-select v-model="selectedCategory" :items="loadedCategories" item-text="name" item-value="id" box chips label="카테고리" multiple></v-select>
      </v-flex>
    </v-layout>
    <PostList isAdmin :posts="loadedPosts" />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: []
    }
  },
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts.filter(
        x =>
          (x.category && this.selectedCategory.length == 0) ||
          this.selectedCategory.includes(x.category)
      )
    },
    loadedCategories() {
      return this.$store.getters.loadedCategories.filter(
        x =>
          x.sysCodeName !== this.CONST.CATEGORY.ORG_GREETING &&
          x.sysCodeName !== this.CONST.CATEGORY.ORG_HISTORY &&
          x.sysCodeName !== this.CONST.CATEGORY.ORG_CHART
      )
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/admin/auth')
    }
  }
}
</script>

<style scoped>
</style>
