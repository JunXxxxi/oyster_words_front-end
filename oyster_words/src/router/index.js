import Vue from 'vue'
import Router from 'vue-router'
import index from "../pages/index";
import login from "../pages/login.vue";
import self_information from "../pages/self_information";
import ranking_list from "../pages/ranking_list.vue";
import room from "../pages/room";
import battle from "../pages/battle";
import transfer_room from "../pages/transfer_room";

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      redirect:'/login',
    },
    {
      path: '/index',
      name: '生蚝单词',
      component: index,
      meta:{
        title: '生蚝单词'
      }
    },
    {
      path: '/login',
      name: '生蚝单词-登陆',
      component: login,
      meta:{
        title: '生蚝单词-登陆'
      },
    },
    {
      path: '/self_information',
      name: '生蚝单词-个人信息',
      component: self_information,
      meta: {
        title: '个人信息'
      }
    },
    {
      path: '/ranking_list',
      name: '生蚝单词-排行榜',
      component: ranking_list,
      meta:{
        title: '生蚝单词-排行榜'
      }
    },
    {
      path: '/room',
      name:'生蚝单词-房间',
      component: room,
      meta: {
        title: '生蚝单词-房间'
      }
    },
    {
      path: '/battle',
      name:'生蚝单词-对战',
      component: battle,
      meta: {
        title: '生蚝单词-对战'
      }
    },
    {
      path: '/transfer_room',
      name:'生蚝单词-匿名用户访问',
      component: transfer_room,
      meta: {
        title: '好友邀请对战'
      }
    },

  ]
})
