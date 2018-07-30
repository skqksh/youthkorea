<template>
  <v-layout>
    <v-flex xs12>
    <PostList :posts="loadedPosts" />
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>
<style scoped>
</style>
