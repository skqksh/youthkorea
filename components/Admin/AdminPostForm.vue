<template>
  <v-container fluid>
    <v-layout wrap row>
      <!-- 게시판 작성 -->
      <v-flex xs12 v-if="postType===CONST.MENUTYPE.MULTI">
        <v-form @submit.prevent="onSave">

          <v-checkbox v-model="editedPost.onMainSlide" label="메인슬라이드 게시"></v-checkbox>

          <v-select v-model="editedPost.menuId" :items="muliTypeMenus" label="게시판" item-text="familyName" item-value="id"></v-select>

          <v-select v-model="editedPost.category" :items="loadedCategories" label="카테고리" item-text="name" item-value="id"></v-select>

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
      </v-flex>

      <!-- 페이지 작성 -->
      <v-flex xs12 v-else>
        <v-form @submit.prevent="onSave">

          <v-select @change="changeMenu()" v-model="editedPost.menuId" :items="singleTypeMenus" label="페이지" item-text="familyName" item-value="id"></v-select>

<div v-if="editedPost.menuId">

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
</div>
        </v-form>
      </v-flex>
    </v-layout>
    <div v-if="this.$store.getters.isDev">
         <br> ========================
        <br> editedPost:{{editedPost}}
      </div>
  </v-container>

</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: false
    },
    postType: {
      type: String,
      default: 'multi'
    }
  },
  data() {
    return {
      muliTypeMenus: [],
      singleTypeMenus: [],
      editedPost: []
    }
  },
  methods: {
    initItems() {
      this.editedPost = this.post
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
            categoryId: '',
            menuId: '',
            menuType: this.postType
          }
    },
    onSave() {
      this.$emit('submit', this.editedPost)
    },
    onCancel() {
      this.$router.push('/admin')
    },
    changeMenu(menuId) {
      var loadedPosts = JSON.parse(
        JSON.stringify(this.$store.getters.loadedPosts)
      )

      //기존에 작성된 메뉴가 있다면 가지고 옴
      if (loadedPosts.length > 0) {
        let selectedPost = loadedPosts.filter(
          x => x.menuId === this.editedPost.menuId
        )

        if (selectedPost.length > 0) {
          this.editedPost = selectedPost[0]
        } else {
          ;[
            'id',
            'title',
            'thumbnail',
            'content',
            'previewText',
            'updatedDate'
          ].forEach(x => (this.editedPost[x] = ''))
        }
      }
    }
  },
  computed: {
    loadedCategories() {
      return this.$store.getters.loadedCategories
    }
  },
  created() {
    this.initItems()

    var menus = this.$store.getters.loadedMenus

    this.muliTypeMenus = menus
      .filter(x => x.menuType === this.CONST.MENUTYPE.MULTI)
      .sort((a, b) => this.CONST.sortFunc(a, b, 'order', true))

    this.singleTypeMenus = menus
      .filter(x => x.menuType === this.CONST.MENUTYPE.SINGLE)
      .sort((a, b) => this.CONST.sortFunc(a, b, 'order', true))
  }
}
</script>

<style scoped>
</style>
