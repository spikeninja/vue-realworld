<template>
    <div>
      <div v-if="isLoading"> Loading...</div>
      <div v-if="error"> Something bad happened</div>
      <div v-if="feed">
        <div class="article-preview" v-for="(article, index) in feed.articles" :key="index">
          <div class="article-meta">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
                }"
              >
              <img :src="article.author.image">
            </router-link>
            <div class="info">
              <router-link
                :to="{
                  name: 'userProfile',
                  params: {slug: article.author.username}
                  }"
                class="author"
              >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
            </div>
            <div class="pull-xs-right">
              ADD TO FAVOURITES
            </div>
          </div>
          <router-link
            :to="{
              name: 'article',
              params: {slug: article.slug}
            }"
            class="preview-link"
          >
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
            TAG LIST
          </router-link>
        </div>
        <app-pagination
          :total="feed.articlesCount"
          :limit="limit"
          :current-page="currentPage"
          :url="baseUrl"
        />
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/feed'
import AppPagination from '@/components/Pagination'
import {limit} from '@/helpers/vars'
import {stringify, parseUrl} from 'query-string'

export default {
  name: 'AppFeed',
  props: {
    apiUrl: {
      type: String,
      required: true,
    }
  },
  components: {
    AppPagination,
  },
  data(){
    return {
      //total: 500,
      limit,
      url: '/tags/dragons'
    }
  },
  computed:{
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error,
    }),
    currentPage(){
      return Number(this.$route.query.page || '1')
    },
    baseUrl(){
      return this.$route.path
    },
    offset(){
      return this.currentPage * limit - limit
    }
  },
  watch: {
    // var we are watching at
    currentPage(){
      this.fetchFeed()
    }
  },
  methods: {
    fetchFeed(){
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  },
  mounted(){
    this.fetchFeed()
  }
}
</script>

<style lang="css" scoped>
</style>
