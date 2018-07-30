<template>
  <v-layout>
    <v-flex xs12>
      <section class="existing-post">
        <h1>게시글 목록</h1>
        <PostList isAdmin :posts="loadedPosts" />
      </section>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
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
