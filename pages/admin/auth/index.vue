<template>
<v-container fluid>

  <v-layout row wrap justify-center>
    <v-flex xs12 sm6 md4>
      <h1>로그인</h1>
      <!-- submit.prevent : 페이지를 다시 호출하지 않도록 함.다시 호출하면 새로고침 됨 -->
      <form @submit.prevent="onSubmit">
        <AppControlInput type="email" v-model="email" label="이메일"></AppControlInput>
        <AppControlInput type="password" v-model="password" label="암호"></AppControlInput>
        <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton
          v-if="isDev"
          type="button"
          btn-style="inverted"
          style="margin-left: 10px"
          @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>
      </form>
    </v-flex>
  </v-layout>
</v-container>

</template>

<script>
export default {
  name: 'AdminAuthPage',
  layout: 'admin',
  data() {
    return {
      isDev: false,
      isLogin: true,
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch('authenticateUser', {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/admin')
        })
    }
  },
  mounted() {
    if (process.env.NODE_ENV === this.CONST.DEVELOPMENT) {
      this.isDev = true
    }
  }
}
</script>

<style scoped>
</style>

