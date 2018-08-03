<template>
<v-container fluid>
  <v-layout row wrap justify-center>      
    <v-flex v-if="loadedPost" xs12 sm8 md6>
      <h1>{{loadedPost.title}}</h1>
      <h3>{{loadedPost.previewText}}</h3>
      <div>
        <img :src="loadedPost.thumbnail" alt="">
      </div>
      <div>
         {{loadedPost.content}}
      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  asyncData(context) {
    return {
      pageCategory: context.params.pageCategory
    }
  },
  computed: {
    loadedPost() {
      return this.$store.getters.loadedPosts.filter(
        x => x.categoryCodeName === this.pageCategory
      )[0]
    }
  }
}
</script>

<style scoped>
</style>