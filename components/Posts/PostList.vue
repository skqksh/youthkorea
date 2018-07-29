<template>
  <v-container fluid>
    <span class="hidden-sm-and-down">
      <v-layout row v-for="i in Math.ceil(posts.length / 2)" :key="i.id">
        <v-flex md2></v-flex>
        <v-flex md4 v-for="post in posts.slice((i - 1) * 2, i * 2)" :key="post.id">
          <PostPreview :id="post.id" :title="post.title" :previewText="post.previewText" :thumbnail="post.thumbnail" :isAdmin="isAdmin"
          />
        </v-flex>
      </v-layout>
    </span>
    <span class="hidden-md-and-up">
      <v-layout row v-for="i in Math.ceil(posts.length)" :key="i.id">
        <v-flex xs12 v-for="post in posts.slice((i - 1) , i )" :key="post.id">
          <PostPreview :id="post.id" :title="post.title" :previewText="post.previewText" :thumbnail="post.thumbnail" :isAdmin="isAdmin"
          />
        </v-flex>
      </v-layout>
    </span>

  </v-container>

</template>
<script>
import PostPreview from '@/components/Posts/PostPreview'
export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>
<style scoped>
</style>
