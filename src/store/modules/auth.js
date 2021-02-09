import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'


const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
}


// exapmple of expanding name scope
export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure'
}

// exapmple of expanding name scope
export const actionTypes = {
  register: '[auth] register',
}

const getters = {
  currentUser: state => {
    return state.currentUser;
  },
  isLoggedIn: state => {
    return Boolean(state.isLoggedIn);
  },
  isAnonymous: state => {
    return state.isLoggedIn === false;
  }
}


const mutations = {
  //[mutationTypes.registerStart](state){
  registerStart(state){
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  //[mutationTypes.registerSuccess](state){
  registerSuccess(state, payload){
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  //[mutationTypes.registerFailure](state){
  registerFailure(state, payload){
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  loginStart(state){
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  loginSuccess(state, payload){
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  loginFailure(state, payload){
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  getCurrentUserStart(state){
    state.isLoading = true;
  },
  getCurrentUserSuccess(state, payload){
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  getCurrentUserFailure(state){
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  }
}

const actions = {
  register(ctx, credentials){
    return new Promise(resolve => {
      ctx.commit('registerStart');
      authApi.register(credentials)
      .then(response => {
        ctx.commit('registerSuccess', response.data.user);
        setItem('accessToken', response.data.user.token);
        resolve(response.data.user);
      })
      .catch(result => {
        ctx.commit('registerFailure', result.response.data.errors);
      })
    })
    //setTimeout(()=>{
    //  ctx.commit('registerStart')
    //}, 1000)
  },
  login(ctx, credentials){
    return new Promise(resolve => {
      ctx.commit('loginStart');
      authApi.login(credentials)
      .then(response => {
        ctx.commit('loginSuccess', response.data.user);
        setItem('accessToken', response.data.user.token);
        resolve(response.data.user);
      })
      .catch(result => {
        ctx.commit('loginFailure', result.response.data.errors);
      })
    })
  },
  getCurrentUser(ctx){
    return new Promise(resolve => {
      ctx.commit('getCurrentUserStart');
      authApi.getCurrentUser()
      .then(response => {
        ctx.commit('getCurrentUserSuccess', response.data.user);
        resolve(response.data.user);
      })
      .catch(() => {
        ctx.commit('getCurrentUserFailure')
      })
    })
  }

}


export default{
  state,
  mutations,
  actions,
  getters,
}
