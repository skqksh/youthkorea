<template>
  <v-container fluid>
    <v-layout row  v-if="loadedPost">
      <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
        <v-layout>
          <v-flex>
            <img :src="loadedPost.thumbnail" alt="" error="this.style.display='none'">
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <h1>{{loadedPost.title}}</h1>
            {{loadedPost.updatedDate | date}}
            <hr>
            <div>
            </div>
            <p>{{loadedPost.content}}</p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  asyncData(context) {
    return {
      paramId: context.params.menuId
    }
  },
  data() {
    return {
      loadedPost: []
    }
  },
  created() {
    this.loadedPost = this.$store.getters.loadedPosts.filter(
      x => x.menuId === this.paramId
    )[0]
  }
}
</script>

<style scoped>
</style>
