import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      loadedCategories: [],
      token: null,
    },
    mutations: {
      setCategory(state, categoryList) {
        state.loadedCategories = categoryList
      },
      addCategory(state, category) {
        state.loadedCategories.push(category)
      },
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
      setToken(state, token) {
        state.token = token;
      },
      //유효시간이 만료된 경우, 로그인한 유저 정보인 토큰을 제거하는 mutation
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        /*
        디버깅모드에서 debugger 를 이용하여 디버깅가능        
        */
        //debugger;
        //아래와 같이 firebase의 realtimedatabase 를 이용해 데이터를 이용        
        return context.app.$axios
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
          .catch(e => context.error(e)) && vuexContext.dispatch('getCategory')
      },
      getCategory(vuexContext) {
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
      delCategory(vuexContext, categoryIdList) {
        for (var key in categoryIdList) {
          this.$axios.$delete('/category/' + categoryIdList[key] + '.json?auth=' + vuexContext.state.token)
            .then(data => {

            })
            .catch(error => console.log(error))
        }
        return true;
      },
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

            return this.$axios.$post('http://localhost:3000/api/track-data', {
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
      loadedPosts(state) {
        return state.loadedPosts
      },
      loadedCategories(state) {
        return state.loadedCategories
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore
