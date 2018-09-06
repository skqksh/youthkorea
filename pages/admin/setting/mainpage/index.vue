<template>
  <v-container>

    <v-layout row wrap justify-space-around>
      <v-flex xs12>

        <v-card>
          <h1>메인페이지 왼쪽 배너이미지
          </h1>       
          <v-form @submit.prevent="onSubmitted">
            <AppControlInput v-model="mainLBannerImg.url" label="이미지 경로"></AppControlInput>
            <div v-if="mainLBannerImg.url">
              미리보기
              <v-layout row wrap style="border:1px solid black" pa-2>
                <v-flex xs12 style="border:1px solid black">
                  상단 메뉴
                </v-flex>
                <v-flex md5 class="hidden-sm-and-down" style="min-height:500px;background-size:auto auto" :style="{ 'background-image': 'url('+mainLBannerImg.url+')' }"> 
                </v-flex>
                <v-flex md7 style="border:1px solid black" pa-2>
                  오른쪽 화면
                </v-flex>
              </v-layout>
            </div>
            <AppButton type="submit">확인</AppButton>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <div v-if="this.$store.getters.isDev">
      <br>mainLBannerImg:{{mainLBannerImg}}
      <br> ========================
      <br>mainLBannerImgList:{{mainLBannerImgList}}
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
      selectedOption: {},
      mainLBannerImg: {
        id: '',
        url: ''
      },
      mainLBannerImgList: []
    }
  },
  created() {
    this.initItems()
  },
  methods: {
    initItems() {
      this.selectedOption = {
        text: '메뉴 수정',
        value: this.EDIT
      }
      //json데이터로 한번 변환한다음 리턴하여, store에 있는데이터와의 바인딩을 제거한다
      this.mainLBannerImgList = JSON.parse(
        JSON.stringify(this.$store.getters.loadedMainLBannerImgList)
      )

      if (this.mainLBannerImgList.length > 0) {
        this.mainLBannerImg = this.mainLBannerImgList[0]
      }
    },
    onSubmitted() {
      let bannerImg = this.mainLBannerImg

      if (bannerImg.url.length === 0) {
        alert('이미지경로를 입력해 주세요')
        return false
      }

      if (bannerImg.id) {
        this.$store.dispatch('editMainLBannerImg', bannerImg).then(() => {
          alert('배너이미지 수정되었습니다.')
        })
      } else {
        this.$store.dispatch('addMainLBannerImg', bannerImg).then(() => {
          alert('배너이미지 추가되었습니다.')
          initItems()
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
