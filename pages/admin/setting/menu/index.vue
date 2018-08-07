<template>
  <v-container>

    <v-layout row wrap justify-space-around>
      <v-flex xs12 sm6 md5>
        <v-card>
          <h1>메뉴 목록</h1>
          <v-list>
            <div v-for="menu in loadedMenus" :key="menu.id">

              <v-list-tile>
                <v-list-tile-action>
                  <v-checkbox v-model="selectedMenu.id" :value="menu.id" @change="changeSelectedMenu"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  {{menu.name}}
                </v-list-tile-content>
              </v-list-tile>

              <div v-if="menu.children" v-for="subMenu in menu.children" :key="subMenu.id">
                <v-list-tile>
                  <v-list-tile-action>

                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-checkbox v-model="selectedMenu.id" :value="subMenu.id" @change="changeSelectedMenu"></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    {{subMenu.name}}
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile v-if="subMenu.children" v-for="subsubMenu in subMenu.children" :key="subsubMenu.id">
                  <v-list-tile-action/>
                  <v-list-tile-action/>
                  <v-list-tile-action>
                    <v-checkbox v-model="selectedMenu.id" :value="subsubMenu.id" @change="changeSelectedMenu"></v-checkbox>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    {{subsubMenu.name}}
                  </v-list-tile-content>

                </v-list-tile>
              </div>

            </div>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md5>
        <v-card>
          <h1>
            <v-select v-if="selectedMenu.id" v-model="selectedMenu.selectedOption" :items="selectedMenu.options" item-text="text" item-value="value"
              :label="selectedMenu.name" return-object @change="changeSelectMenuOption" outline>
            </v-select>
            <span v-else>메뉴 추가</span>
          </h1>
          <v-form @submit.prevent="onSubmitted">
            <div v-if="this.$store.getters.isDev">
              <br>id:
              <input type="text" :value="editMenu.id" style="border:1px solid" readonly> 
              <br> parentId:
              <input type="text" :value="editMenu.parentId" style="border:1px solid" readonly>
              <br> order:
              <input type="text" v-model="editMenu.order" style="border:1px solid">

            </div>
            <AppControlInput v-model="editMenu.name" label="메뉴명" :readonly="selectedMenu.selectedOption.value===DELETE"></AppControlInput>
            <AppButton id="submitBtn" type="submit" :loading="isLoading">확인</AppButton>
          </v-form>
        </v-card>
      </v-flex>
      <div v-if="this.$store.getters.isDev">
        <br>selectedMenu:{{selectedMenu}}
        <br> ========================
        <br> editMenu:{{editMenu}}
        <br> ========================
        <br>loadedMenus : {{loadedMenus}}
        <pre>
          =================================
    TODO list
               - 순서변경 가능하도록 할것
               - 3단계이상 하위메뉴 만들수 없도록 할 것 
        </pre>
          
      </div>
    </v-layout>
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
      ADDCHILDREN: 'addChildren',
      DELETE: 'delete',

      //========fields==========
      selectedMenu: {},
      editMenu: {},
      isLoading: false
    }
  },
  created() {
    this.initItems()
  },
  methods: {
    initItems() {
      this.selectedMenu = {
        id: '',
        name: '',
        options: [
          {
            text: '메뉴 수정',
            value: 'edit'
          },
          {
            text: '하위메뉴 추가',
            value: 'addChildren'
          },
          {
            text: '메뉴 제거',
            value: 'delete'
          }
        ],
        selectedOption: {
          text: '메뉴 수정',
          value: 'edit'
        }
      }
      this.editMenu = {
        name: '',
        parentId: '',
        order: this.getOrder()
      }
    },
    onSubmitted() {
      let menu = this.editMenu
      menu.name = menu.name.trim()
      //메뉴명 입력여부 확인
      if (menu.name.length === 0) {
        alert('메뉴명을 입력해 주세요')
        return false
      }

      //메뉴 추가시 유효성검사
      if (
        this.selectedMenu.selectedOption.value === '' ||
        this.selectedMenu.selectedOption.value === this.ADDCHILDREN
      ) {
        if (
          this.menus.filter(
            x =>
              x.id !== menu.id &&
              x.name === menu.name &&
              x.parentId === menu.parentId
          ).length > 0
        ) {
          alert('중복된 메뉴가 존재합니다.')
          return false
        }
      }

      //메뉴 수정시 유효성검사
      if (this.selectedMenu.selectedOption.value === this.EDIT) {
        if (
          this.menus.filter(
            x =>
              x.id !== menu.id &&
              x.name === menu.name &&
              x.parentId === menu.parentId
          ).length > 0
        ) {
          alert('중복된 메뉴가 존재합니다.')
          return false
        }
      }

      //메뉴 제거시 유효성검사
      if (this.selectedMenu.selectedOption.value === this.DELETE) {
        //하위메뉴가 존재하는 경우, 부모메뉴를 제거할 수 없도록 함
        if (this.menus.filter(x => x.parentId === menu.id).length > 0) {
          alert('하위 메뉴가 존재합니다.')
          return false
        }
      }

      //save on db
      //버튼 중복 클릭 되지 않도록 함
      document.querySelector('#submitBtn').disabled = true

      if (menu.id) {
        if (this.selectedMenu.selectedOption.value === this.EDIT) {
          this.$store.dispatch('editMenu', menu).then(() => {
            alert('메뉴가 수정되었습니다.')
            this.initItems()
            document.querySelector('#submitBtn').disabled = false
          })
        } else if (this.selectedMenu.selectedOption.value === this.DELETE) {
          this.$store.dispatch('delMenu', menu).then(() => {
            alert('메뉴가 제거되었습니다.')
            this.initItems()
            document.querySelector('#submitBtn').disabled = false
          })
        }
      } else {
        this.$store.dispatch('addMenu', menu).then(() => {
          alert('메뉴가 추가되었습니다.')
          this.initItems()
          document.querySelector('#submitBtn').disabled = false
        })
      }
    },
    getSelectedMenu() {
      var selectedMenu = this.menus.filter(x => x.id === this.selectedMenu.id)

      if (selectedMenu.length > 0) {
        this.selectedMenu.name = selectedMenu[0].name
        return selectedMenu[0]
      }
      return null
    },
    changeSelectedMenu() {
      this.changeSelectMenuOption()
    },
    changeSelectMenuOption() {
      var selectedMenu = this.getSelectedMenu()
      if (selectedMenu) {
        switch (this.selectedMenu.selectedOption.value) {
          case this.EDIT:
            this.editMenu = selectedMenu
            break
          case this.ADDCHILDREN:
            this.editMenu = {
              name: '',
              parentId: selectedMenu.id,
              order: this.getOrder(selectedMenu.id)
            }
            break
          case this.DELETE:
            this.editMenu = selectedMenu
            break
        }
      } else {
        this.editMenu = {
          name: '',
          parentId: '',
          order: this.getOrder()
        }
      }
    },
    getOrder(parentId) {
      if (parentId) {
        return this.menus.filter(x => x.parentId == parentId).length
      } else {
        return this.menus.length
      }
    }
  },
  computed: {
    menus() {
      return this.$store.getters.loadedMenus
    },
    loadedMenus() {
      return this.CONST.unflatten(this.menus)
    }
  }
}
</script>

<style scoped>
</style>
