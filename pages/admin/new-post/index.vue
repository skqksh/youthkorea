<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
  <AdminPostForm @submit="onSubmitted"/>
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
      if (!postData.menuId) {
        alert('게시판을 선택해 주세요')
        return false
      }

      this.$store.dispatch('addPost', postData).then(() => {
        this.$router.push('/admin/post-list')
      })
    }
  }
}
</script>

<style scoped>
</style>
