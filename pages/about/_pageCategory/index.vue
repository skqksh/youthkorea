<template>

  <v-layout>
      
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-for="post in loadedPosts" :key="post.title">{{post.title}}</v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts.filter(
        x => x.categoryCodeName === 'orggreeting'
      )
    }
  }
}
</script>

<style scoped>
</style>