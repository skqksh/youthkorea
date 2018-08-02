<template>
<v-container>

  <v-layout row wrap justify-space-around>
    <v-flex xs12 sm6 md5>
      <v-card>
        <h1>카테고리 목록</h1>
        <AppButton type="button" @click="delSelectedCategory" btn-style="error">선택카테고리제거</AppButton>
        <v-list>
          <v-list-tile v-for="(item,index) in loadedCategories" :key="index">
            <v-list-tile-action>
              <v-icon v-if="item.isSysCode">star</v-icon>
              <v-checkbox v-else :value="item.id" v-model="selectedCategory"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6  md5>
      <v-card>
        <h1>새 카테고리 추가</h1>
        <v-form @submit.prevent="onSubmitted">
          <AppControlInput v-model="newCategory.name" label="카테고리명"></AppControlInput>
          <AppButton type="submit">저장</AppButton>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  data() {
    return {
      newCategory: {
        name: '',
        isSysCode: false,
        sysCodeName: ''
      },
      selectedCategory: []
    }
  },
  methods: {
    onSubmitted() {
      let category = this.newCategory
      category.name = category.name.trim()
      if (category.name.length === 0) {
        alert('카테고리명을 입력해 주세요')
        return false
      }

      for (var key in this.loadedCategories) {
        if (this.loadedCategories[key].name === category.name) {
          alert('동일한 카테고리가 존재합니다.')
          return false
        }
      }

      this.$store.dispatch('addCategory', category).then(() => {
        alert('카테고리가 추가되었습니다.')

        location.reload()
      })
    },
    delSelectedCategory() {
      if (confirm('정말 삭제하시겠습니까?')) {
        this.$store.dispatch('delCategory', this.selectedCategory).then(() => {
          alert('카테고리가 제거되었습니다.')
          location.reload()
        })
      }
    }
  },
  computed: {
    loadedCategories() {
      return (
        this.$store.getters.loadedCategories
          //시스템코드를 상단으로
          .sort(function(x, y) {
            // true values first
            return x.isSysCode === y.isSysCode ? 0 : x.isSysCode ? -1 : 1
          })
      )
    }
  }
}
</script>

<style scoped>
</style>
