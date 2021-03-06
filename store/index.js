import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedMainLBannerImgList: [],
      loadedPosts: [],
      loadedCategories: [],
      loadedMenus: [],
      token: null,
      isDev: false
    },
    mutations: {
      //==================== mainLBannerImg start =====================
      setMainLBannerImgList(state, mainLBannerImgList) {
        state.loadedMainLBannerImgList = mainLBannerImgList
      },
      addMainLBannerImg(state, mainLBannerImg) {
        state.loadedMainLBannerImgList.push(mainLBannerImg)
      },
      editMainLBannerImg(state, mainLBannerImg) {
        const itemIndex = state.loadedCategories.findIndex(item => item.id === mainLBannerImg.id);
        state.loadedMainLBannerImgList[itemIndex] = mainLBannerImg
      },
      delMainLBannerImg(state, mainLBannerImgId) {
        state.loadedMainLBannerImgList = state.loadedCategories.filter(x => x.id !== mainLBannerImgId)
      },
      //==================== category start =====================
      setCategory(state, categoryList) {
        state.loadedCategories = categoryList
      },
      addCategory(state, category) {
        state.loadedCategories.push(category)
      },
      editCategory(state, category) {
        const menuIndex = state.loadedCategories.findIndex(item => item.id === category.id);
        state.loadedCategories[menuIndex] = category
      },
      delCategory(state, categoryId) {
        state.loadedCategories = state.loadedCategories.filter(x => x.id !== categoryId)
      },
      //==================== posts start =====================
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editPost.id);
        state.loadedPosts[postIndex] = editPost
      },
      //==================== menu start =====================
      setMenus(state, menus) {
        state.loadedMenus = menus
      },
      addMenu(state, menu) {
        state.loadedMenus.push(menu)
      },
      editMenu(state, editMenu) {
        const menuIndex = state.loadedMenus.findIndex(item => item.id === editMenu.id);
        state.loadedMenus[menuIndex] = editMenu
      },
      delMenu(state, menuId) {
        state.loadedMenus = state.loadedMenus.filter(x => x.id !== menuId)
      },
      //==================== etc start =====================
      setToken(state, token) {
        state.token = token;
      },
      //유효시간이 만료된 경우, 로그인한 유저 정보인 토큰을 제거하는 mutation
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      async nuxtServerInit(vuexContext, context) {
        this.state.isDev = process.env.NODE_ENV === "development"
        /*
        디버깅모드에서 debugger 를 이용하여 디버깅가능        
        */
        //debugger;
        //아래와 같이 firebase의 realtimedatabase 를 이용해 데이터를 이용        
        await vuexContext.dispatch('getMainLBannerImgList')
        await vuexContext.dispatch('getPosts')
        await vuexContext.dispatch('getCategories')
        await vuexContext.dispatch('getMenus')
      },
      //==================== mainLBannerImg start =====================
      addMainLBannerImg(vuexContext, item) {
        const createdItem = {
          ...item,
          updatedDate: new Date()
        }

        //아래와 같이 firebase의 realtimedatabase 를 이용해 데이터를 이용
        return this.$axios.$post('/mainLBannerImg.json?auth=' + vuexContext.state.token, createdItem)
          .then(data => {

            vuexContext.commit('addMainLBannerImg', { ...createdItem,
              id: data.name
            })
          })
          .catch(e => console.log(e))
      },
      editMainLBannerImg(vuexContext, editedItem) {
        //아래와 같이 firebase의 realtimedatabase 를 이용해 데이터를 이용
        //firebase .write rule 이 auth!=null 인경우
        //https://firebase.google.com/docs/database/rest/auth 설명참고
        //쿼리 파라미터 필요함
        return this.$axios.$put('/mainLBannerImg/' + editedItem.id + '.json?auth=' + vuexContext.state.token, {
            ...editedItem
          })
          .then(data => {
            vuexContext.commit('editMainLBannerImg', editedItem)
          })
          .catch(error => console.log(error))
      },
      setMainLBannerImgList(vuexContext, itemList) {
        vuexContext.commit('setMainLBannerImgList', itemList)
      },
      getMainLBannerImgList(vuexContext) {

        return this.$axios
          .$get('/mainLBannerImg.json')
          .then(data => {
            const ItemListArr = [];
            for (const key in data) {
              ItemListArr.push({ ...data[key],
                id: key
              })
            }
            vuexContext.commit('setMainLBannerImgList', ItemListArr)

          })
          .catch(e => context.error(e))
      },
      delMainLBannerImg(vuexContext, item) {
        this.$axios.$delete('/mainLBannerImg/' + item.id + '.json?auth=' + vuexContext.state.token)
          .then(data => {
            vuexContext.commit('delMainLBannerImg', item.id)
          })
          .catch(error => console.log(error))

        return true;
      },
      //==================== mainLBannerImg end =====================
      //==================== posts start =====================
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }

        //아래와 같이 firebase의 realtimedatabase 를 이용해 데이터를 이용
        return this.$axios.$post('/posts.json?auth=' + vuexContext.state.token, createdPost)
          .then(data => {

            vuexContext.commit('addPost', { ...createdPost,
              id: data.name
            })
          })
          .catch(e => console.log(e))
      },
      editPost(vuexContext, editedPost) {
        //아래와 같이 firebase의 realtimedatabase 를 이용해 데이터를 이용
        //firebase .write rule 이 auth!=null 인경우
        //https://firebase.google.com/docs/database/rest/auth 설명참고
        //쿼리 파라미터 필요함
        return this.$axios.$put('/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, {
            ...editedPost
          })
          .then(data => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(error => console.log(error))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      getPosts(vuexContext) {

        return this.$axios
          .$get('/posts.json')
          .then(data => {
            const postsArray = [];
            for (const key in data) {
              postsArray.push({ ...data[key],
                id: key
              })
            }
            vuexContext.commit('setPosts', postsArray)

          })
          .catch(e => context.error(e))
      },
      //==================== category start =====================
      getCategories(vuexContext) {

        return this.$axios
          .$get('/category.json')
          .then(data => {
            const categoryList = [];
            for (const key in data) {
              categoryList.push({ ...data[key],
                id: key
              })
            }
            vuexContext.commit('setCategory', categoryList)
          })
          .catch(e => console.log(e))
      },
      addCategory(vuexContext, categoryList) {
        const createdCategory = {
          ...categoryList,
          updatedDate: new Date()
        }
        //아래와 같이 firebase의 realtimedatabase 를 이용해 데이터를 이용
        return this.$axios.$post('/category.json?auth=' + vuexContext.state.token, createdCategory)
          .then(data => {

            vuexContext.commit('addCategory', { ...createdCategory,
              id: data.name
            })
          })
          .catch(e => console.log(e))
      },
      editCategory(vuexContext, editedCategory) {
        return this.$axios.$put('/category/' + editedCategory.id + '.json?auth=' + vuexContext.state.token, {
            ...editedCategory
          })
          .then(data => {
            vuexContext.commit('editCategory', editedCategory)
          })
          .catch(error => console.log(error))
      },
      delCategory(vuexContext, category) {
        this.$axios.$delete('/category/' + category.id + '.json?auth=' + vuexContext.state.token)
          .then(data => {
            vuexContext.commit('delCategory', category.id)
          })
          .catch(error => console.log(error))

        return true;
      },
      //==================== menu start =====================
      getMenus(vuexContext) {

        return this.$axios
          .$get('/menu.json')
          .then(data => {
            const menus = [];
            for (const key in data) {
              menus.push({ ...data[key],
                id: key
              })
            }
            vuexContext.commit('setMenus', menus)
          })
          .catch(e => console.log(e))
      },
      addMenu(vuexContext, menu) {
        const createdMenu = {
          ...menu,
          updatedDate: new Date()
        }

        return this.$axios.$post('/menu.json?auth=' + vuexContext.state.token, createdMenu)
          .then(data => {

            vuexContext.commit('addMenu', { ...createdMenu,
              id: data.name
            })
          })
          .catch(e => console.log(e))
      },
      editMenu(vuexContext, editedMenu) {
        return this.$axios.$put('/menu/' + editedMenu.id + '.json?auth=' + vuexContext.state.token, {
            ...editedMenu
          })
          .then(data => {
            vuexContext.commit('editMenu', editedMenu)
          })
          .catch(error => console.log(error))
      },
      delMenu(vuexContext, menu) {
        return this.$axios.$delete('/menu/' + menu.id + '.json?auth=' + vuexContext.state.token)
          .then(data => {
            vuexContext.commit('delMenu', menu.id)
          })
          .catch(error => console.log(error))
      },
      //==================== etc start =====================
      authenticateUser(vuexContext, authData) {
        //sign in url : https://firebase.google.com/docs/reference/rest/auth/#section-create-email-password
        //login url : https://firebase.google.com/docs/reference/rest/auth/#section-sign-in-email-password
        //api_key : firebae - authentication - web setting

        //기본적으로 이메일을 통해 가입하도록 함
        let authUrl =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
          process.env.fbAPIKey

        //로그인 된 상태라면, 로그인 하도록 함
        if (authData.isLogin) {
          authUrl =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
            process.env.fbAPIKey
        }

        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            vuexContext.commit('setToken', result.idToken);
            localStorage.setItem('token', result.idToken);
            let expirationDate = new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            localStorage.setItem('tokenExpiration', expirationDate);

            Cookie.set('jwt', result.idToken);
            Cookie.set('expirationDate', expirationDate)

            return this.$axios.$post(location.origin + '/api/track-data', {
              data: 'Authenticated!'
            })

          })
          .catch(e => console.log(e))
      },
      initAuth(vuexContext, req) {
        let token, expirationDate;

        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split("=")[1]
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration');

        }

        //initAuth 함수가 호출될때 마다, 남아있는 로그인 유효시간을 확인하여, 유효시간이 끝났을시 토큰 초기화
        if (new Date().getTime() > +expirationDate || !token) {
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('setToken', token);
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken');
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    },
    getters: {
      loadedMainLBannerImgList(state) {
        return state.loadedMainLBannerImgList
      },
      loadedPosts(state) {
        return state.loadedPosts
      },
      loadedCategories(state) {
        return state.loadedCategories.sort(function (a, b) {
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
      },
      loadedMenus(state) {
        return state.loadedMenus
      },
      isAuthenticated(state) {
        return state.token != null
      },
      isDev(state) {
        return state.isDev
      }
    }
  })
}

export default createStore
