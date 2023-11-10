<script setup lang="ts">
import { ref } from 'vue'
import { stringify, parseUrl } from 'query-string'
// import { actionTypes } from '@/store/modules/feed'

import Pagination from '@src/components/Pagination.vue'

import { limit } from '@src/helpers/vars'
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { watch } from 'fs';


const props = defineProps<{
  apiUrl?: string,
}>()

const route = useRoute()

const data = ref({
  offset: 5,
  limit: limit,
  url: '/tags/dragons',
})

const currentPage = ref<number>(Number(route.query.page || '1'))

function fetchFeed() {
  const parsedUrl = parseUrl(props.apiUrl)
  const stringifiedParams = stringify({
    limit,
    offset: data.value.offset,
    ...parsedUrl.query
  })
  const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
  // this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams })
}

const baseUrl = computed(() => {
  return route.path
})

const offset = computed(() => {
  return currentPage.value * limit - limit
})

watch(currentPage, (newValue) => {
  console.log("Value is updated")
})

// watch: {
//   // var we are watching at
//   currentPage() {
//     this.fetchFeed()
//   }
// },
// methods: {
//   fetchFeed() {
//     const parsedUrl = parseUrl(this.apiUrl)
//     const stringifiedParams = stringify({
//       limit,
//       offset: this.offset,
//       ...parsedUrl.query
//     })
//     const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
//     this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams })
//   }
// },
// mounted() {
//   this.fetchFeed()
// }
</script>

<template>
  <div>
    <div v-if="isLoading"> Loading...</div>
    <div v-if="error"> Something bad happened</div>
    <div v-if="feed">
      <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
        <div class="article-meta">
          <router-link :to="{
            name: 'userProfile',
            params: { slug: article.author.username }
          }">
            <img :src="article.author.image">
          </router-link>
          <div class="info">
            <router-link :to="{
              name: 'userProfile',
              params: { slug: article.author.username }
            }" class="author">
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            ADD TO FAVOURITES
          </div>
        </div>
        <router-link :to="{
          name: 'article',
          params: { slug: article.slug }
        }" class="preview-link">
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>
      <Pagination :total="feed.articlesCount" :limit="limit" :current-page="currentPage" :url="baseUrl" />
    </div>
  </div>
</template>



<style lang="css" scoped></style>
