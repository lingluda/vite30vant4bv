<template>
<div>
<van-grid>
  <van-grid-item icon="photo-o" v-for="i in menuData" v-if ="menuData.length>0" :text="i.NAME" :to="i.URL"/>
</van-grid>

</div>
</template>

<script>
import {ref,onMounted,getCurrentInstance,nextTick} from 'vue'
import moment from 'moment'
export default {
    name:'qtyScore',
    setup(){
        const { proxy } = getCurrentInstance()
        const menuData =ref([])
        const ucd = proxy.ajax.getParams(window.location.href,'ucd')
        const init = () =>{
                proxy.ajax.post('WeCom/WCmenu',{ucd:ucd},res=>{
                    proxy.menuData = res
                })
            }
        onMounted(()=>{
          init()
        })
        return {
            menuData,init,ucd
        }
    }
}
</script>
