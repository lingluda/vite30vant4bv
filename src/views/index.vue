<template>
<div>
 <router-view/>
  <!-- <van-button type="primary">主要按钮</van-button> -->
  <van-tabbar route>
  <van-tabbar-item icon="home-o" replace to="/index/tab1">首頁</van-tabbar-item>
  <van-tabbar-item icon="search" replace to="/index/tab2">信息</van-tabbar-item>
  <van-tabbar-item icon="friends-o" replace to="/index/tab3">購物車</van-tabbar-item>
  <van-tabbar-item icon="setting-o" replace to="/index/tab4">個人中心</van-tabbar-item>
</van-tabbar>
</div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
//import { useRouter } from 'vue-router'
const active =ref()

</script>

