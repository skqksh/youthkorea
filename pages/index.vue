<template>
  <div class="home-page">
    <v-carousel id="mainCarousel">
      <nuxt-link v-for="(item,i) in mainSlidePosts" :key="i" :to="postLink('/posts/'+item.id)">
        <v-carousel-item :src="item.thumbnail" class="mainCarouselItem">
        </v-carousel-item>
      </nuxt-link>
    </v-carousel>

    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    },
    mainSlidePosts() {
      var posts = this.$store.getters.loadedPosts.filter(
        x => x.pageType === this.CONST.PAGETYPE.MAINSLIDE
      )
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
