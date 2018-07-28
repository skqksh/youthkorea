<template>
    <div>
            <v-form @submit.prevent="onSave">

        <AppControlInput v-model="editedPost.author">작성자</AppControlInput>
        게시글유형
         <v-select
          :items="postTypeList"
          label="선택하세요"
          item-text="name"
          item-value="value"
          solo
        ></v-select>
        <AppControlInput v-model="editedPost.title">제목</AppControlInput>

        <AppControlInput v-model="editedPost.previewText">부제목</AppControlInput>

        <AppControlInput v-model="editedPost.thumbnail">이미지URL</AppControlInput>
        <div>
          미리보기 
          <div>
            <img :src="editedPost.thumbnail" alt="유효하지 않은 이미지">
          </div>
        </div>
        <AppControlInput control-type="textarea" v-model="editedPost.content">내용</AppControlInput>

        <AppButton type="submit">Save</AppButton>

        <AppButton type="button" style="margin-left: 10px" btn-style="cancel" @click="onCancel">Cancel</AppButton>
      </v-form>

    </div>
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
      editedPost: this.post
        ? { ...this.post }
        : {
            author: '',
            title: '',
            thumbnail: '',
            content: '',
            previewText: ''
          },
      postTypeList: [
        { name: '일반', value: '' },
        { name: '메인슬라이드', value: 'mainslide' }
      ]
    }
  },
  methods: {
    onSave() {
      this.$emit('submit', this.editedPost)
    },
    onCancel() {
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped>
</style>