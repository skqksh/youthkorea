<template>

  <v-layout>
      
    <v-flex xs12 sm6 offset-sm3>
      <AdminPostForm @submit="onSubmitted" :post="loadedPost"/>
    </v-flex>
  </v-layout>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'
export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  data() {
    return {
      isNew: false
    }
  },
  asyncData(context) {
    return {
      pageCategory: context.params.pageCategory
    }
  },
  computed: {
    loadedPost() {
      var post = this.$store.getters.loadedPosts.filter(
        x => x.categoryCodeName === this.pageCategory
      )[0]

      if (!post) {
        this.isNew = true
        post = {
          author: 'admin',
          title: '',
          thumbnail: '',
          content: '',
          previewText: '',
          onMainSlide: false,
          category: '',
          categoryCodeName: this.pageCategory
        }
      }
      return post
    }
  },
  methods: {
    onSubmitted(editedPost) {
      debugger
      let dispatch = this.isNew ? 'addPost' : 'editPost'
      this.$store.dispatch(dispatch, editedPost).then(() => {
        this.$router.push('/admin')
      })
    }
  }
}
</script>

<style scoped>
</style>