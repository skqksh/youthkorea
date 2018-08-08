<template>
 <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>게시글 목록 / 수정</h1>
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
      return this.$store.getters.loadedPosts
        .filter(x => x.menuType === this.CONST.MENUTYPE.MULTI)
        .filter(
          x =>
            this.selectedCategory.length == 0 ||
            this.selectedCategory.includes(x.category)
        )
    },
    loadedCategories() {
      return this.$store.getters.loadedCategories
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
