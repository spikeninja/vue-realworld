import LoginVue from "@src/views/Login.vue"
import RegisterVue from "@src/views/Register.vue"
import GlobalFeedVue from "@src/views/GlobalFeed.vue"

export const routes = [
  {
    path: "/register",
    name: "register",
    component: RegisterVue,
  },
  {
    path: "/login",
    name: "login",
    component: LoginVue,
  },
  {
    path: "/",
    name: "globalFeed",
    component: GlobalFeedVue,
  },
  {
    path: "/feed",
    name: "yourFeed",
    component: GlobalFeedVue,
  },
  {
    path: "/tags/:slug",
    name: "tag",
    component: GlobalFeedVue,
  },
  {
    path: "/articles/new",
    name: "createArticle",
    component: GlobalFeedVue,
  },
  {
    path: "/articles/:slug",
    name: "article",
    component: GlobalFeedVue,
  },
  {
    path: "/articles/:slug/edit",
    name: "editArticle",
    component: GlobalFeedVue,
  },
  {
    path: "/settings",
    name: "settings",
    component: GlobalFeedVue,
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: GlobalFeedVue,
  },
  {
    path: "/profiles/:slug/favourites",
    name: "userProfileFavorites",
    component: GlobalFeedVue,
  },
]
