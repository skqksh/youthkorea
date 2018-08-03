<template>
  <v-layout>
    <v-flex xs12>

    <v-carousel id="mainCarousel">
      <nuxt-link v-for="(item,i) in mainSlidePosts" :key="i" :to="postLink('/posts/'+item.id)">
        <v-carousel-item :src="item.thumbnail" class="mainCarouselItem">
        </v-carousel-item>
      </nuxt-link>
    </v-carousel>

    <PostList :posts="loadedPosts" />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts.filter(x => x.category)
    },
    mainSlidePosts() {
      var posts = this.$store.getters.loadedPosts.filter(x => x.onMainSlide)
      return posts
    }
  },
  methods: {
    postLink(path) {
      return path
    }
  },
  mounted() {
    //created에서는 이미지목록을 가지고 오지 못함
    document.querySelectorAll('#mainCarousel img').forEach(val => {
      val.style.height = '100%'
    })
  }
}
</script>

<style scoped>
#mainCarousel {
  max-height: 400px;
}
</style>
