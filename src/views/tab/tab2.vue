<template>
    <div>
        <input type="text" v-model="name"/>
        <input type="password" v-model="pwd"/>
        <van-button type="primary" @click="login">登陸</van-button>
    </div>
</template>
<script lang="ts" setup>
import {ref,getCurrentInstance} from 'vue'
const { proxy } = getCurrentInstance()
const name=ref('')
const pwd=ref('')
const login =()=>{
    console.log(name.value)
    console.log(pwd.value)
    proxy.axios.post('top10?name=sys_file&size=10&index=1',{},res=>{
        console.log(res)
    })
}
</script>

