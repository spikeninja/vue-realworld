<script setup lang="ts">
import { ref } from 'vue';
import Feed from '@src/components/Feed.vue';

const state = ref({
  apiUrl: '/articles'
})
</script>

<template>
  <div class="home-page">
    BANNER
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <Feed
            :api-url="state.apiUrl"
          />
        </div>
        <div class="col-md-3">
          POPULAR TAGS
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="css" scoped>
</style>
