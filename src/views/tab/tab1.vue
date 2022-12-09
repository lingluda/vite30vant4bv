
<template>
  <div>
    <!-- 头部 -->
    <van-cell :value="sdate" @click="show = true">
      <template #icon>
      <svg viewBox="0 0 1024 1024" style="width:16px;hight:16px;margin-right:20px" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"></path></svg>
      </template>
    </van-cell>
   
    <!--彈出層-->
    <van-popup v-model:show="show" position="bottom" :style="{ height: '40%' }">
     <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" @confirm ="DateSure"/>
    </van-popup>
   <!-- 头部 -->

    <van-row class="my-2" v-if="TopData.length>0">
      <van-col span="8">
        <van-circle class="ms-2" v-model:current-rate="TopData[0].RATE" :stroke-width="60" color="red"  :speed="100" :text="TopData[0].RATE"/>
        <div class="bom">月进度</div>
        </van-col>
      <van-col span="8">
        <van-circle class="ms-2" v-model:current-rate="TopData[1].RATE" :stroke-width="60" color="orange"  :speed="100" :text="TopData[1].RATE"/>
        <div class="bom">日进度</div>
      </van-col>  
    
    </van-row>
    <!-- 表格 -->
    <div style="background:#f4f4f4" class="p-2 fw-bold">各牌号产量: </div>
    <table class="table">
      <thead>
        <tr>
          <td>牌号</td>
          <td>计划量</td>
          <td>产量</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in TableData">
          <td>{{item.MESMATNAME}}</td>
          <td>{{item.PL}}</td>
          <td>{{item.QTY}}</td>
        </tr>
      </tbody>
    </table>
    <div style="background:#f4f4f4" class="p-2 fw-bold">各班产量: </div>
    <div id="Chart" _echarts_instance_="ec_12345" :style="{ width: '100%', height: '300px' }"></div>
  </div>
</template>
<style scope>
  .bom{
    position: relative;
    margin-left: 33px;
  }
</style>
<script>
import { ref,onMounted,computed,getCurrentInstance,nextTick} from 'vue';
import moment from 'moment'
export default {
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
        proxy.init()
      }
      //表格數據  aps_orderfromerp_otr
      const TopData = ref([])
      const TableData = ref()
      const init = () =>{
                proxy.ajax.post('WeCom/aps_orderfromerp_jd',{sdate:sdate.value,edate:moment(sdate.value).format('YYYY-MM')},res=>{
                    proxy.TopData = res
                })
                proxy.ajax.post('WeCom/aps_orderfromerp_otr',{sdate:sdate.value,edate:moment(sdate.value).format('YYYY-MM')},res=>{
                    proxy.TableData = res
                })
                proxy.ajax.post('WeCom/prm_packworkorderoutput_shift',{sdate:sdate.value,edate:moment(sdate.value).format('YYYY-MM')},res=>{
                    let name = res.map(item=>{return item.SHIFTNAME})
                    let qty = res.map(item=>{return item.QTY})
                    create(name,qty)
                })
            }
      //环形进度条
      const currentRate = ref(0);
      const text = computed(() => currentRate.value.toFixed(0) + '%');
      //环形进度条end
      //初始化echarts实例
      const create = (name,qty) =>{
      let c_dom = document.getElementById('Chart')
      c_dom.removeAttribute("_echarts_instance_")
      let myChart = proxy.echarts.init(c_dom);
        // 绘制图表
        myChart.setOption({
       
          tooltip: {},
          xAxis: {
            data:name
            //data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [
            {
              name: '产量',
              type: 'bar',
                label: {
                  show: true,
                  position: 'top'
                },
              //data: [5, 20, 36, 10, 10, 20]
              data:qty
            }
          ]
        });
      }
     //初始化echarts实例
        nextTick(()=>{
          create()
          init()
        })
    return {
      sdate,create,init,
      currentRate,text,
      show,currentDate,DateSure,
      TableData,TopData,
    }
  },
 
}
</script>
