<template>
  <v-container>

    <v-layout>
      <v-flex md6 offset-md3>
        <v-form @submit.prevent="onSave">

        <v-select :items="categoryList" label="카테고리" item-text="name" item-value="value"></v-select>
        </v-form>
      </v-flex>


    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      categoryList: [
        {
          name: '일반',
          value: this.CONST.PAGETYPE.BASIC
        },
        {
          name: '메인슬라이드',
          value: this.CONST.PAGETYPE.MAINSLIDE
        }
      ]
    }
  },
  methods: {
    onSave() {}
  }
}
</script>

<style scoped>
</style>