<template>
  <v-layout row wrap>
    <v-flex d-flex xs12 sm6 md4 offset-md2>
      <v-card>
        <h1>카테고리 목록</h1>
        <AppButton type="button" @click="delSelectedCategory" btn-style="error">선택카테고리제거</AppButton>
        <v-list>
          <v-list-tile v-for="(item,index) in loadedCategories" :key="index">
            <v-list-tile-action>
              <v-checkbox :value="item.id" v-model="selectedCategory"></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex d-flex xs12 sm6  md4>
      <v-card>
        <h1>새 카테고리 추가</h1>
        <v-form @submit.prevent="onSubmitted">
          <AppControlInput v-model="newCategory.name" label="카테고리명"></AppControlInput>
          <AppButton type="submit">저장</AppButton>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  data() {
    return {
      newCategory: {
        name: ''
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
      return this.$store.getters.loadedCategories.sort(function(a, b) {
        var nameA = a.name.toUpperCase() // ignore upper and lowercase
        var nameB = b.name.toUpperCase() // ignore upper and lowercase
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }

        // 이름이 같을 경우
        return 0
      })
    }
  }
}
</script>

<style scoped>
</style>
