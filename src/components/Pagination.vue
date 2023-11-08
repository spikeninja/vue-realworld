<script setup lang="ts">

import { computed } from '@vue/reactivity'
import { range } from '@src/helpers/utils'

const props = defineProps<{
  total: number,
  limit: number,
  currentPage: number,
  url: string
}>()


const pages = computed(() => {
  const pagesCount = Math.ceil(props.total / props.limit);
  return range(1, pagesCount)
})

</script>
<template>
  <ul class="pagination">
    <li v-for="page in pages" :key="page" class="page-item" :class="{ active: currentPage === page }">
      <router-link :to="{ path: url, query: { page: page } }" class="page-link">
        {{ page }}
      </router-link>
    </li>
  </ul>
</template>



<style lang="css" scoped></style>
