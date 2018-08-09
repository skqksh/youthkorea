<template>
  <v-container>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 sm6 md5>
        <v-card>
          <h1>카테고리 목록
            <v-btn @click="initItems()">
              <v-icon>cached</v-icon>새로고침</v-btn>
          </h1>

          <v-list>
            <v-list-tile v-for="item in categories" :key="item.id" style="height:30px">
              <v-list-tile-action>
                <v-checkbox v-model="selectedCategory.id" :value="item.id" @change="changeSelectedCategory"></v-checkbox>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md5>
        <v-card>
          <h1>
            <v-select v-if="selectedCategory.id" v-model="selectedCategory.selectedOption" :items="selectedCategory.options" item-text="text"
              item-value="value" :label="selectedCategory.name" return-object outline>
            </v-select>
            <span v-else>카테고리 추가</span>
          </h1>
          <v-form @submit.prevent="onSubmitted">
            <div v-if="this.$store.getters.isDev">
              <br>id:
              <input type="text" :value="editCategory.id" style="border:1px solid" readonly>
            </div>
           
            <AppControlInput v-model="editCategory.name" label="카테고리명" :readonly="selectedCategory.selectedOption.value===DELETE"></AppControlInput>
           
            <v-select v-model="editCategory.limitedMenu" :items="boardMenus" label="카테고리 사용 게시판" item-text="familyName" chips  item-value="id"  multiple return-object
              outline></v-select>
            <AppButton type="submit">확인</AppButton>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <div v-if="this.$store.getters.isDev">
      <br>editCategory:{{editCategory}}
      <br> ========================
      <br>selectedCategory:{{selectedCategory}}
      <br> ========================

    </div>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  data() {
    return {
      //========CONST==========
      EDIT: 'edit',
      DELETE: 'delete',

      //========fields==========
      boardMenus: [],
      categories: [],
      selectedCategory: {},
      editCategory: {}
    }
  },
  created() {
    this.initItems()
  },
  methods: {
    initItems() {
      this.selectedCategory = {
        id: '',
        name: '',
        options: [],
        selectedOption: {
          text: '메뉴 수정',
          value: this.EDIT
        }
      }
      this.editCategory = {
        name: '',
        limitedMenu: []
      }
      //json데이터로 한번 변환한다음 리턴하여, store에 있는데이터와의 바인딩을 제거한다
      this.categories = JSON.parse(
        JSON.stringify(this.$store.getters.loadedCategories)
      )

      //json데이터로 한번 변환한다음 리턴하여, store에 있는데이터와의 바인딩을 제거한다
      this.boardMenus = JSON.parse(
        JSON.stringify(
          this.$store.getters.loadedMenus.filter(
            x => x.menuType === this.CONST.MENUTYPE.MULTI
          )
        )
      )
    },
    changeSelectedCategory() {
      this.changeSelectCategoryOption()
      this.getSelectedCategoryOptionList()
    },
    changeSelectCategoryOption() {
      var selectedCategory = this.getSelectCategory()
      if (selectedCategory) {
        switch (this.selectedCategory.selectedOption.value) {
          case this.EDIT:
            this.editCategory = selectedCategory
            break
          case this.DELETE:
            this.editCategory = selectedCategory
            break
        }
      } else {
        this.editCategory = {
          name: '',
          limitedMenu: []
        }
      }
    },
    getSelectCategory() {
      var selectedCategory = this.categories.filter(
        x => x.id === this.selectedCategory.id
      )

      if (selectedCategory.length > 0) {
        this.selectedCategory.name = selectedCategory[0].name
        return selectedCategory[0]
      }
      return null
    },
    getSelectedCategoryOptionList() {
      this.selectedCategory.selectedOption = {
        text: '카테고리 수정',
        value: this.EDIT
      }
      this.selectedCategory.options = [
        {
          text: '카테고리 수정',
          value: this.EDIT
        },
        {
          text: '카테고리 제거',
          value: this.DELETE
        }
      ]
    },
    onSubmitted() {
      let category = this.editCategory
      category.name = category.name.trim()
      if (category.name.length === 0) {
        alert('카테고리명을 입력해 주세요')
        return false
      }

      //카테고리 추가 / 수정 시 유효성검사
      if (
        this.selectedCategory.selectedOption.value === '' ||
        this.selectedCategory.selectedOption.value === this.ADDCHILDREN ||
        this.selectedCategory.selectedOption.value === this.EDIT
      ) {
        if (
          this.categories.filter(
            x => x.id !== category.id && x.name === category.name
          ).length > 0
        ) {
          alert('중복된 메뉴가 존재합니다.')
          return false
        }
      }

      if (category.id) {
        if (this.selectedCategory.selectedOption.value === this.EDIT) {
          this.$store.dispatch('editCategory', category).then(() => {
            alert('카테고리가 수정되었습니다.')
            this.initItems()
          })
        } else if (this.selectedCategory.selectedOption.value === this.DELETE) {
          this.$store.dispatch('delCategory', category).then(() => {
            alert('카테고리가 제거되었습니다.')
            this.initItems()
          })
        }
      } else {
        this.$store.dispatch('addCategory', category).then(() => {
          alert('카테고리가 추가되었습니다.')
          this.initItems()
        })
      }
    },
    delSelectedCategory() {
      if (confirm('정말 삭제하시겠습니까?')) {
        this.$store.dispatch('delCategory', this.selectedCategory).then(() => {
          this.selectedCategory = []
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
