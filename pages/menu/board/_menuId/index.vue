<template>
  <v-container fluid>
    <v-layout row wrap justify-center v-if="loadedCategories.length>0">
      <v-flex xs12 md6>
        <v-select v-model="selectedCategory" :items="loadedCategories" item-text="name" item-value="id" box chips label="카테고리" multiple></v-select>
      </v-flex>
    </v-layout>
    <PostList :posts="loadedPosts" />
  </v-container>
</template>

<script>
export default {
  asyncData(context) {
    return {
      paramId: context.params.menuId
    }
  },
  data() {
    return {
      selectedCategory: []
    }
  },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
        .filter(x => x.menuId === this.paramId)
        .filter(
          x =>
            (x.category && this.selectedCategory.length == 0) ||
            this.selectedCategory.includes(x.category)
        )
    },
    loadedCategories() {
      return this.$store.getters.loadedCategories
    }
  }
}
</script>

<style scoped>
</style>
