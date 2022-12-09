<template>
    <div>
          <!-- 头部 -->
            <van-row >
            <van-col span="9">
            <van-cell :value="sdate" @click="show = true">
              <template #icon>
              <svg viewBox="0 0 1024 1024" style="width:16px;hight:16px;margin-right:20px" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"></path></svg>
              </template>
            </van-cell>
            </van-col>
            <van-col span="2"> <van-cell title="至"></van-cell></van-col>
            <van-col span="9">
            <van-cell :value="edate" @click="show1 = true"/>
            </van-col>
            </van-row>
            <!--彈出層-->
            <van-popup v-model:show="show" position="bottom" :style="{ height: '40%' }">
            <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" @confirm ="DateSure"/>
            </van-popup>
                <!--彈出層-->
            <van-popup v-model:show="show1" position="bottom" :style="{ height: '40%' }">
            <van-datetime-picker v-model="currentDate1" type="date" title="选择年月日" @confirm ="DateSure1"/>
            </van-popup>
          <!-- 头部 -->

         <div id="myChart" _echarts_instance_='ec_12' :style="{ width: '100%', height: '300px' }"></div>
         <div id="myChart1" _echarts_instance_='ec_13' :style="{ width: '100%', height: '1300px' }"></div>
    </div>
</template>
<script>
import {ref,onMounted,getCurrentInstance,nextTick} from 'vue'
import moment from 'moment'
export default {
    name:'qtyScore',
    setup(){
        const { proxy } = getCurrentInstance()
      
        //日期组件
      const sdate = ref(moment().format('YYYY-MM-DD'))
      const currentDate = ref(new Date())
      const show = ref(false)
      const DateSure=(v)=>{
        proxy.sdate = moment(v).format('YYYY-MM-DD')
        proxy.show =false
      }
      const edate = ref(moment().format('YYYY-MM-DD'))
      const currentDate1 = ref(new Date())
      const show1 = ref(false)
      const DateSure1=(v)=>{
        proxy.edate = moment(v).format('YYYY-MM-DD')
        proxy.show1 =false
        init()
      }
    //日期组件
     const init = () =>{
                proxy.ajax.post('WeCom/qua_sore_team',{sdate:sdate.value,edate:edate.value},res=>{
                    let name = res.map(item=>{return item.TEAMNAME})
                    let qty = res.map(item=>{return item.SCORE})
                    create(name,qty)
                })
                 proxy.ajax.post('WeCom/qua_sore_equ',{sdate:sdate.value,edate:edate.value},res=>{
                    let name = res.map(item=>{return item.EQUNAME})
                    let qty = res.map(item=>{return item.SCORE})
                    create1(name,qty)
                })
            }
          //饼图
        const create = (name,qty) =>{
            let c_dom = document.getElementById('myChart')
            c_dom.removeAttribute("_echarts_instance_")
            let myChart = proxy.echarts.init(c_dom);
                // 绘制图表
                myChart.setOption({
                title: {
                text: '班组得分排名',
                left: 'center'
                },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data:name
                    //data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                {
                    name: '销量',
                    type: 'bar',
                    label: {
                      show: true,
                      position: 'top'
                    },
                    data:qty
                    //data: [5, 20, 36, 10, 10, 20]
                }
                ]
            });
        }
        //饼图end
         //柱状图
        const create1 = (name,qty) =>{
            let c_dom = document.getElementById('myChart1')
            c_dom.removeAttribute("_echarts_instance_")
          let myChart = proxy.echarts.init(c_dom);
          // 绘制图表
          myChart.setOption({
            title: {
              text: '机台得分排名',
              left: 'center'
            },
            tooltip: {},
            grid:{
              left:'29%'
            },
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'category',
                data: name
            },
            series: [
              {
                name: '销量',
                type: 'bar',label: {
                      show: true,
                      position: 'inside'
                    },
                data: qty
              }
            ]
          });
        }
        //柱状图end
        nextTick(()=>{
          init()
        })
        // onMounted(()=>{
        //     create(),create1()
        // })
        return {
            sdate,edate,
            create,create1,
            show,currentDate,DateSure,
            show1,currentDate1,DateSure1
        }
    }
}
</script>

