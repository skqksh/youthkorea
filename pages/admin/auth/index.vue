<template>
  <v-container fluid>

    <v-layout row wrap justify-center>
      <v-flex xs12 sm6 md4>
        <h1>로그인</h1>
        <!-- submit.prevent : 페이지를 다시 호출하지 않도록 함.다시 호출하면 새로고침 됨 -->
        <form @submit.prevent="onSubmit">
          <AppControlInput type="email" v-model="email" label="이메일"></AppControlInput>
          <AppControlInput type="password" v-model="password" label="암호"></AppControlInput>
          <v-alert :value="fail2Login" type="error">로그인정보가 바르지 않습니다.
          </v-alert>
          <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
          <AppButton v-if="isDev" type="button" btn-style="inverted" style="margin-left: 10px" @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>
        </form>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  name: 'AdminAuthPage',
  layout: 'admin',
  middleware: ['check-auth'],
  data() {
    return {
      isDev: false,
      isLogin: true,
      fail2Login: false,
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      this.fail2Login = false
      this.$store
        .dispatch('authenticateUser', {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
        })
        .then(result => {
          if (this.$store.getters.isAuthenticated) {
            this.$router.push('/admin')
          } else {
            this.fail2Login = true
          }
        })
    }
  },
  mounted() {
    if (process.env.NODE_ENV === this.CONST.DEVELOPMENT) {
      this.isDev = true
    }
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>
</style>
