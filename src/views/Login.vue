<script setup lang="ts">
import ValidationErrors from '@src/scomponents/ValidationErrors'
import { ref } from 'vue'

const state = ref({
  email: '',
  password: '',
})

  // computed: {
  //   ...mapState({
  //     isSubmitting: state => state.auth.isSubmitting,
  //     validationErrors: state => state.auth.validationErrors
  //   })
  // },
  // methods: {
  //   onSubmit(){
  //     console.log('submitted form');
  //     this.$store.dispatch('login', {
  //       email: this.email,
  //       password: this.password
  //     })
  //     .then(() => {
  //       console.log('successfully logged in');
  //       this.$router.push({name: 'globalFeed'});
  //     })
  //   }
  // }
</script>

<template>
  <div class="auth-page">
    <div class="container-page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">Have an account?</router-link>
          </p>
          <ValidationError 
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset>
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
</style>
