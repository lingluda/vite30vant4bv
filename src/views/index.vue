<template>
<div>
<van-grid>
  <van-grid-item icon="photo-o" text="卷包生产日报" to="/tab1"/>
  <van-grid-item icon="photo-o" text="卷包机台产量" to="/tab2"/>
  <van-grid-item icon="photo-o" text="质量排名" to="/tab3"/>
  <van-grid-item icon="photo-o" text="卷包生产安排" to="/tab4"/>
</van-grid>

</div>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
//import { useRouter } from 'vue-router'
const active =ref()

</script>

