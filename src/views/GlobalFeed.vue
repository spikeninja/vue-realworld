<template>
  <div class="home-page">
    BANNER
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <app-feed
            :api-url="apiUrl"
          />
        </div>
        <div class="col-md-3">
          POPULAR TAGS
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from '@/components/Feed'

export default {
  name: 'AppGlobalFeed',
  components: {
    AppFeed,
  },
  data(){
    return {
      apiUrl: '/articles',
    }
  },
}
</script>

<style lang="css" scoped>
</style>
