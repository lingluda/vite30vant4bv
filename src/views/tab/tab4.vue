<template>
    <div>
         <van-row>
             <van-col span="11">
               <van-cell :value="sdate" @click="show = true">
                    <template #icon>
                    <svg viewBox="0 0 1024 1024" style="width:16px;hight:16px;margin-right:20px" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"></path></svg>
                    </template>
                </van-cell>
             </van-col>
             <van-col>
             <van-cell :value="ex1Selected" @click="show1 = true" icon="flag-o"/> </van-col>
         </van-row>
        <!--彈出層-->
            <van-popup v-model:show="show" position="bottom" :style="{ height: '40%' }">
            <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" @confirm ="DateSure"/>
            </van-popup>
            <van-popup v-model:show="show1" position="bottom" :style="{ height: '40%' }">
            <van-picker title="标题" :columns="ex1Options" />
            </van-popup>

            <div v-for="item in TableData">
                <van-row style="background:#f4f4f4;border:1px solid #d4d4d4" class="py-1">
                <van-col span="11" style="text-align:center;border-right:1px solid #d4d4d4">{{item.TEAMNAME}}:
                     <span v-if="item.STATENAME=='运行'" class="link-danger">{{item.STATENAME}}</span>
                     <span v-else class="link-success">{{item.STATENAME}}</span>
                </van-col>
                <van-col span="11" style="text-align:center">{{item.SHIFTNAME}}:
                    <span v-if="item.STATENAME=='运行'" class="link-danger">{{item.STATENAME}}</span>
                     <span v-else class="link-success">{{item.STATENAME}}</span>
                </van-col>
                </van-row>
                <van-row class="py-1">
                    <van-col span="11">机台:<span class="fw-bolder">{{item.RESOURCENAME}}</span></van-col>
                    <van-col span="11">计划:<span class="link-success">{{item.QUANTITY}}</span>箱</van-col>
                </van-row>
                    <van-row class="py-1">
                    <van-col>牌号:<span class="fw-bolder">{{item.PRODUCTNAME}}</span></van-col>
                </van-row>
                    <van-row class="py-1">
                    <van-col>工单号:<span class="link-primary">{{item.PLANCODE}}</span></van-col>
                </van-row>
            </div>
            
    </div>
</template>
<script>
  import {ref, onMounted,getCurrentInstance,watchEffect } from 'vue'
  import moment from 'moment'
    export default {
        name:'schedual',
        setup() {
            // vue3中取消了this的概念，可用getCurrentInstance来获取上下文，这里的proxy相当于this
            const { proxy } = getCurrentInstance()
        
            //日期组件
            const sdate = ref(moment().format('YYYY-MM-DD'))
            const currentDate = ref(new Date())
            const show = ref(false)
            const DateSure=(v)=>{
                proxy.sdate = moment(v).format('YYYY-MM-DD')
                proxy.show =false
            }
            const show1 = ref(false)

            const ex1Selected = ref('包装机')
            const ex1Options = [
                {value: null, text: '包装机'},
            ]
            //初始化
            const TableData = ref([{TEAMNAME:'甲班',SHIFTNAME:'白班',STATENAME:'运行'}])
            const init = () =>{
                proxy.ajax.post('WeCom/dps_packworkorder',{date:sdate.value},res=>{
                    proxy.TableData =res
                })
            }
            //onMounted(init)
            watchEffect(()=>{
                init()
            })
            //初始化
            return{
                //top
                sdate,ex1Selected,ex1Options,
                //int
                init,TableData,
                show,currentDate,DateSure,
                show1
            }
        },
        mounted(){
        }
}
</script>