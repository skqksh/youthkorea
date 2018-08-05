<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm8 offset-sm2 md6 offset-md3>
        <v-layout>
          <v-flex>
            <img :src="loadedPost.thumbnail" alt="" error="this.style.display='none'">
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <h1>{{loadedPost.title}}</h1>
            {{loadedPost.updatedDate | date}}
            <hr>
            <div>


            </div>
            <p>{{loadedPost.content}}</p>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  asyncData(context) {
    //아래와 같이 firebase의 realtimedatabase 를 이용해 데이터를 이용
    return context.app.$axios
      .$get('/posts/' + context.params.id + '.json')
      .then(data => {
        return {
          loadedPost: data
        }
      })
      .catch(e => context.error(e))
  }
}
</script>

<style scoped>
</style>
