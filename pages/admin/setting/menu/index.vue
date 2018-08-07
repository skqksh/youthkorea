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
              <input type="text" :value="editMenu.id" style="border:1px solid">
              <br> parentid:
              <input type="text" :value="editMenu.parentId" style="border:1px solid">
              <br> order:
              <input type="text" :value="editMenu.order" style="border:1px solid">
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
        order: ''
      }
    },
    onSubmitted() {
      this.isLoading = true
      try {
        let menu = this.editMenu
        if (menu.name.length === 0) {
          alert('메뉴명을 입력해 주세요')
          return false
        }

        if (menu.id) {
          if (this.selectedMenu.selectedOption.value === this.EDIT) {
            this.$store.dispatch('editMenu', menu).then(() => {
              alert('메뉴가 수정되었습니다.')
            })
          } else if (this.selectedMenu.selectedOption.value === this.DELETE) {
            this.$store.dispatch('delMenu', menu).then(() => {
              alert('메뉴가 제거되었습니다.')
              this.initItems()
            })
          }
        } else {
          this.$store.dispatch('addMenu', menu).then(() => {
            alert('메뉴가 추가되었습니다.')
          })
        }

        setTimeout({}, 2000)
      } finally {
        this.isLoading = false
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
              order: ''
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
          order: ''
        }
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
