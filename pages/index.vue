<template>
  <v-layout row wrap>
  
    <v-flex md5 class="hidden-sm-and-down" style="min-height:750px;background-size:auto auto" :style="{ 'background-image': 'url('+mainLBannerImg.url+')' }">  
    </v-flex>
      <v-flex xs12 md7 pa-3>
    <v-carousel id="mainCarousel" :style="{height:carouselHeight}">
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
    data() {
      return {
        bannerIndex: 0
      }
    },
    loadedPosts() {
      return this.$store.getters.loadedPosts.filter(
        x => x.menuType === this.CONST.MENUTYPE.MULTI
      )
    },
    mainSlidePosts() {
      var posts = this.loadedPosts.filter(x => x.onMainSlide)
      return posts
    },
    mainLBannerImg() {
      let MainLBannerImgList = this.$store.getters.loadedMainLBannerImgList
      if (MainLBannerImgList.length > 0) {
        return MainLBannerImgList[0]
      }
      return {
        url:
          'https://firebasestorage.googleapis.com/v0/b/youthkorea-dev.appspot.com/o/3%ED%9A%8C_%EB%AA%A8%ED%97%98%EB%8C%80%ED%9A%8C-youthlem.jpg?alt=media&token=5c8aa413-70df-4e0c-a73d-115e94f16808'
      }
    },
    carouselHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '220px'
        case 'sm':
          return '200px'
        case 'md':
          return '300px'
        case 'lg':
        case 'xl':
          return '400px'
      }
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
</style>
