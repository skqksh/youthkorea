<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
  <AdminPostForm @submit="onSubmitted" :postType="this.CONST.MENUTYPE.SINGLE"/>
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
  methods: {
    onSubmitted(postData) {
      if (postData.id) {
        this.$store.dispatch('editPost', postData).then(() => {
          alert('수정되었습니다.')
        })
      } else {
        this.$store.dispatch('addPost', postData).then(() => {
          alert('저장되었습니다.')
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
