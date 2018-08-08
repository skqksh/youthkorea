<template>
  <v-container fluid>
    <v-form @submit.prevent="onSave">

      <div v-if="!editedPost.categoryCodeName">

        <v-checkbox v-model="editedPost.onMainSlide" label="메인슬라이드 게시" ></v-checkbox>

        <v-select v-model="editedPost.menuId" :items="menus" label="게시판"  item-text="familyName" item-value="id"></v-select>

        <v-select v-model="editedPost.category" :items="loadedCategories" label="카테고리" item-text="name" item-value="id"></v-select>

      </div>
      <AppControlInput v-model="editedPost.title" label="제목" required></AppControlInput>

        <AppControlInput v-model="editedPost.previewText" label="부제목"></AppControlInput>

        <AppControlInput v-model="editedPost.thumbnail" label="이미지URL"></AppControlInput>
        <div v-if="editedPost.thumbnail">
          미리보기
          <div>
            <img :src="editedPost.thumbnail" alt="유효하지 않은 이미지">
          </div>
        </div>
      <AppControlInput control-type="textarea" v-model="editedPost.content" label="내용" required></AppControlInput>

      <AppButton type="submit">Save</AppButton>

      <AppButton type="button" style="margin-left: 10px" btn-style="error" @click="onCancel">Cancel</AppButton>
    </v-form>
  </v-container>

</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      menus: [],
      editedPost: this.post
        ? {
            ...this.post
          }
        : {
            author: 'admin',
            title: '',
            thumbnail: '',
            content: '',
            previewText: '',
            onMainSlide: false,
            category: '',
            categoryCodeName: '',
            menuId: '',
            menuType: this.CONST.MENUTYPE.MULTI
          }
    }
  },
  methods: {
    onSave() {
      this.$emit('submit', this.editedPost)
    },
    onCancel() {
      this.$router.push('/admin')
    }
  },
  computed: {
    loadedCategories() {
      return this.$store.getters.loadedCategories
    }
  },
  created() {
    this.menus = this.$store.getters.loadedMenus
      .filter(x => x.menuType === this.CONST.MENUTYPE.MULTI)
      .sort((a, b) => this.CONST.sortFunc(a, b, 'order', true))
  }
}
</script>

<style scoped>
</style>
