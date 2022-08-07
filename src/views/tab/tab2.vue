<template>
    <div>
        <input type="text" v-model="name"/>
        <input type="password" v-model="pwd"/>
        <van-button type="primary" @click="login">登陸</van-button>
        
        <input type="text" v-model="content"/>
        <van-uploader v-model="fileList" :after-read="afterRead" multiple/>
    </div>
</template>
<script lang="ts" setup>
import {ref,getCurrentInstance} from 'vue'
const { proxy } = getCurrentInstance()
const name=ref('')
const pwd=ref('')
const content=ref('')
const login =()=>{
    console.log(name.value)
    console.log(pwd.value)
    proxy.axios.post('/api/login',{uid:name.value,pwd:pwd.value},res=>{
        console.log(res)
        sessionStorage.setItem('token_x',res[0].token_x)
        console.log(sessionStorage.getItem('token_x'))
    })
}
    
    const fileList=ref([])
    const afterRead=(file)=>{
        console.log(file)
    }

</script>

