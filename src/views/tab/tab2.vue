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
   <!-- 头部--> 

        <div id="myChart" _echarts_instance_="ec_3" :style="{ width: '100%', height: '300px' }"></div>
        <van-tabs v-model:active="active" >
            <van-tab title="生产线"><div id="myChart0" _echarts_instance_="ec_0" :style="{ width: '100%', height: '600px' }"></div></van-tab>
            <!-- <van-tab title="标签 2"><div id="myChart1" _echarts_instance_="ec_1" :style="{ width: '100%', height: '600px' }"></div></van-tab>
            <van-tab title="标签 3"><div id="myChart2" _echarts_instance_="ec_2" :style="{ width: '100%', height: '600px' }"></div></van-tab>-->
        </van-tabs>
    </div>
</template>
<script>
import {ref,reactive,onMounted,getCurrentInstance,nextTick,watchEffect} from 'vue'
import moment from 'moment'
export default {
    name:'packOutput',
    setup(){
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
      const edate = ref(moment().format('YYYY-MM-DD'))
      const currentDate1 = ref(new Date())
      const show1 = ref(false)
      const DateSure1=(v)=>{
        proxy.edate = moment(v).format('YYYY-MM-DD')
        proxy.show1 =false
        init(),inits()
      }
    //日期组件
        const active = ref(0);
        //等待dom渲染完后再查找id
        const onClickTab= (v) => {
          let tt ='myChart'+v.name
          setTimeout(()=>{
            create1(tt)
          },100)
        }
        // 获取饼图数据  value: , name
        const PieData = reactive([{ value: 1, name: "1"},{ value: 2, name: "2"}])
        const init = () =>{
                proxy.ajax.post('WeCom/prm_packworkorderoutput_type',{sdate:sdate.value,edate:edate.value},res=>{
                    let tt = res.map(item=>{return {name:item.EQUIPTYPEMODELNAME,value:item.QUANTITY}})
                    create(tt)
                })
            }
           
        // 获取饼图数据end
        //饼图
        /**http://10.162.98.71:8081/service-WeCom/service/liuzhoutobacco/prm_packworkorderoutput_type
         * [
              {
                "EQUIPTYPEMODELNAME": "ZB25",
                "QUANTITY": 957.756
              },
              {
                "EQUIPTYPEMODELNAME": "ZB45",
                "QUANTITY": 1803.16
              }
          ].setAttribute(‘echarts_instance’, ‘’)
         */
        const create = (data) =>{
            let c_dom = document.getElementById('myChart')
            c_dom.removeAttribute("_echarts_instance_")
            let myChart = proxy.echarts.init(c_dom);
                // 绘制图表
                myChart.setOption({
                title: {
                  text: '各机型产量比',
                  left: 'center'
                },
                label: {formatter: '{b}'+'\n'+'{d}%'},
                tooltip: {
                  trigger: 'item',
                },
                legend: {
                  icon: 'circle',
                  bottom: '1%'
                },
                series: [
                  {
                    name: '机型产量',
                    type: 'pie',
                    radius: '50%',
                    data:data,
                    // data: [
                    //   { value: 1048, name: 'Search Engine' },
                    //   { value: 735, name: 'Direct' },
                    //   { value: 580, name: 'Email' },
                    //   { value: 484, name: 'Union Ads' },
                    //   { value: 300, name: 'Video Ads' }
                    // ],
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ]
            });
        }
        //onMounted(create)
        //饼图end
        const inits = () =>{
                proxy.ajax.post('WeCom/prm_packworkorderoutput_eqm',{sdate:sdate.value,edate:edate.value},res=>{
                    let name = res.map(item=>{return item.EQUIPMENTNAME.replace('包装机','')})
                    let qty = res.map(item=>{return item.QUANTITY})
                    create1('myChart0',name,qty)
                })
            }
         //onMounted(init)
           //watchEffect(()=>{
           //      init(),inits()
           //  })
        //柱状图
        /**http://10.162.98.71:8081/service-WeCom/service/liuzhoutobacco/prm_packworkorderoutput_eqm
         * [
              {
                "EQUIPMENTNAME": "01#包装机",
                "EQUIPTYPEMODELNAME": "ZB25",
                "PROCESSUNITID": "14290895",
                "QUANTITY": 253
              }
            ]
         */
        const create1 = (v,name,qty) =>{
          let c_dom = document.getElementById(v)
          c_dom.removeAttribute("_echarts_instance_")
          let myChart = proxy.echarts.init(c_dom);
          // 绘制图表
          myChart.setOption({
            title: {
              text: '各包装机产量(箱)',
              left: 'center'
            },
            tooltip: {},
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'category',
                data: name
            },
            series: [
              {
                name: '产量(箱)',
                type: 'bar',
                label: {
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
           init(),inits()
         })
        return {
          active,onClickTab,
            sdate,edate,
            create,active,create1,
            show,currentDate,DateSure,
            show1,currentDate1,DateSure1
        }
    },
}
</script>
