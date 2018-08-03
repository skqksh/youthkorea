<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 md6>
        <v-select v-model="selectedCategory" :items="loadedCategories" item-text="name" item-value="id" box chips label="카테고리" multiple></v-select>
      </v-flex>
    </v-layout>
    <PostList :posts="loadedPosts" />
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      selectedCategory: []
    }
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts.filter(
        x =>
          (x.category && this.selectedCategory.length == 0) ||
          this.selectedCategory.includes(x.category)
      )
    },
    loadedCategories() {
      return this.$store.getters.loadedCategories.filter(
        x =>
          x.sysCodeName !== this.CONST.CATEGORY.ORG_GREETING &&
          x.sysCodeName !== this.CONST.CATEGORY.ORG_HISTORY &&
          x.sysCodeName !== this.CONST.CATEGORY.ORG_CHART
      )
    }
  }
}
</script>
<style scoped>
</style>
