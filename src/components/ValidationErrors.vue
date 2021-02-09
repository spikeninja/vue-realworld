<template>
  <div class="">
    <ul class="error-messages">
      <li v-for="errorMessage in errorMessages" :key="errorMessage">
        {{ errorMessage }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppValidationErrors',
  props: {
    validationErrors:{
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages(){
      return Object.keys(this.validationErrors).map(name => {
        const messages = this.validationErrors[name].join(', ')
        return `${name} ${messages}`
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
