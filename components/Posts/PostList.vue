<template>
  <v-container >
    <v-layout row wrap>
      <v-flex xs12 sm4 md3 v-for="post in posts" :key="post.id">
        <PostPreview :id="post.id" :title="post.title" :previewText="post.previewText" :thumbnail="post.thumbnail" :isAdmin="isAdmin"
        />
      </v-flex>
    </v-layout>
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
