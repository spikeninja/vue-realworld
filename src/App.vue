<template>
  <div id="app">
    <app-topbar />
    <router-view></router-view>
  </div>
</template>

<script>
import AppTopbar from '@/components/TopBar'

export default{
  name: 'App',
  components: {
    AppTopbar,
  },
  mounted(){
    this.$store.dispatch('getCurrentUser');
  }
}
</script>
