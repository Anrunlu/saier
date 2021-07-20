<template>
  <div class="dashboard-editor-container">
    <div>
      <el-tag class="tag-title">
        课程选择:
      </el-tag>
      <el-radio-group v-for="item in coures" :key="item" v-model="selcourse">
        <el-radio border :label="item">{{ item }}</el-radio>

      </el-radio-group>
    </div>
    <div>
      <el-tag class="tag-title">
        数据展示:
      </el-tag>
        <el-radio-group v-model="contentRadio" @change="contentSelect">
        <el-radio border :label="1">个人知识图谱</el-radio>
        <el-radio border :label="2">成绩分析</el-radio>
      </el-radio-group>
    </div>

    <el-row :gutter="32" v-show="zhishiShow">
      <el-col>
        <div align="center">
          <img style="width:200px;height:200px" :src="stupic">
        </div>
        <div id="myChart0" :style="{height: '300px'}" />
      </el-col>
    </el-row>
    <el-row :gutter="32" v-show="xuexiShow">
      <el-col>
        <div align="center">
          <img style="width:200px;height:200px" :src="stupic">
        </div>
        <div id="myChart1" :style="{height: '300px',width:'1300px'}" />
        <div id="myChart2" :style="{height: '300px',width:'1300px'}" />
        <div id="myChart3" :style="{height: '300px',width:'1300px'}" />
        <div id="myChart4" :style="{height: '300px',width:'1300px'}" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
import { dataForDashboard, dataForMyPage ,dataForStuShow } from '@/api/hwexp'
// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import BarChart2 from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'
const items = ['知识掌握情况','学习成绩','作业成绩','实验成绩','签到情况']
const knname = ['输入阻抗求解', '输出阻抗求解', '单管放大电路', '静态工作点', '幅频特性', '电压增益计算']
const tecname = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7']
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [89, 90, 100, 90, 80, 91]
  },
  purchases: {
    expectedData: [80, 90, 89, 75, 78, 90, 94]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'stuDashboard',
  // components: {
  //   GithubCorner,
  //   PanelGroup,
  //   LineChart,
  //   RaddarChart,
  //   PieChart,
  //   BarChart,
  //   TransactionTable,
  //   TodoList,
  //   BoxCard
  // },
  components: {
 
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis,
      barChartData_kn: {},
      barChartData_tec: lineChartData.purchases,
      xdata_kn: knname,
      xdata_tec: tecname,
      titletext_tec: '实践技能点掌握情况',
      titletext_kn: '个人知识图谱',
      myitems: items,
      selmyitem: items[0],
      selcourse: '',
      coures: '',
      contentRadio: 1,
      zhishiShow: true,
      xuexiShow: false,
      flag: true,
      stupic: '@/assets/stupic',
      option0: {
        title: { text: '个人知识图谱' },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{name: '签到', type: 'bar', data: []}]
      },
      option1: {
        title: { text: '各科目期末考试成绩' },
        tooltip: {},
        xAxis: {
          data: []
        },
        barMaxWidth: 30,
        yAxis: {},
        series: [{name: '期末成绩', type: 'bar', data: [], itemStyle: {
          normal: {
            color: function(params) {
              var colorList = ['#FFD700']
              return colorList[params.dataIndex]
            }
          }
        }}]
      },
      option2: {
        title: { text: '平时作业成绩' },
        tooltip: {},
        xAxis: {
          data: []
        },
        barMaxWidth: 30,
        yAxis: {},
        series: [{name: '平时作业', type: 'bar', data: [], itemStyle: {
          normal: {
            color: function(params) {
              var colorList = ['#009900']
              return colorList[params.dataIndex]
            }
          }
        }}]
      },
      option3: {
        title: { text: '实验成绩' },
        tooltip: {},
        xAxis: {
          data: []
        },
        barMaxWidth: 30,
        yAxis: {},
        series: [{name: '实验', type: 'bar', data: [],itemStyle: {
          normal: {
            color: function(params) {
              var colorList = ['#87CEFA']
              return colorList[params.dataIndex]
            }
          }
        }}]
      },
      option4: {
        title: { text: '课堂签到情况' },
        tooltip: {},
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{name: '签到', type: 'bar', data: []}]
      }
    }
  },
  mounted() {
    this.getData()
	this.banl()
  },
  methods: {
    // 绘制图表
    getItemInfo0() {
      // 知识掌握情况
      const myChart = echarts.init(document.getElementById('myChart0'))
      const data1 = { 'userno': localStorage.getItem('userno'), 'coures': this.selcourse }
      dataForMyPage(data1).then(response => {
        this.option0.series[0].data = response.data.value
        this.option0.xAxis.data = response.data.kname
        this.option0.title = { text: '个人知识图谱' }
        myChart.setOption(this.option0)
        window.addEventListener('resize', function() { myChart.resize() })
        // console.log(this.xdata_kn)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getItemInfo1() {
      // 学习成绩
      const myChart1 = echarts.init(document.getElementById('myChart1'))
      const myChart2 = echarts.init(document.getElementById('myChart2'))
      const myChart3 = echarts.init(document.getElementById('myChart3'))
			const myChart4 = echarts.init(document.getElementById('myChart4'))
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcourse }
      dataForStuShow(data).then(response => {
        this.option1.series[0].data = response.data.exam_info
        if (this.flag === true) {
          for (var i = 1; i <= response.data.exam_info.length; i++) {
            this.option1.xAxis.data.push('考试' + i)
          }
        }
        this.option1.title = { text: '考试成绩' }
        this.option2.series[0].data = response.data.homework_info
        if (this.flag === true) {
          for (var i = 1; i <= response.data.homework_info.length; i++) {
            this.option2.xAxis.data.push('作业' + i)
          }
        }
        this.option2.title = { text: '平时作业成绩' }
        this.option3.series[0].data = response.data.exp_info
        if (this.flag === true) {
          for (var i = 1; i <= response.data.exp_info.length; i++) {
            this.option3.xAxis.data.push('实验' + i)
          }
        }
        this.flag=false
        this.option3.title = { text: '实验成绩' }
        myChart1.setOption(this.option1)
        myChart2.setOption(this.option2)
        myChart3.setOption(this.option3)
        window.addEventListener('resize', function() {
          myChart1.resize()
          myChart2.resize()
          myChart3.resize() })
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    contentSelect() {
      this.zhishiShow = !this.zhishiShow
      this.xuexiShow = !this.xuexiShow
      if(this.zhishiShow === true)
        this.getItemInfo0()
      if(this.xuexiShow === true)
        this.getItemInfo1()
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    getData() {
      this.flag=true
      const data = { 'userno': localStorage.getItem('userno') }
      // 这里用Get,可以获取到本地的json文件中的内容。
      dataForDashboard(data).then(response => {
        this.coures = response.data.coures
        this.selcourse = this.coures[0]
        localStorage.setItem('coures', JSON.stringify(this.coures))
        localStorage.setItem('type', response.data.type)

        const myChart = echarts.init(document.getElementById('myChart0'))
        const data1 = { 'userno': localStorage.getItem('userno'), 'coures': this.selcourse }
        dataForMyPage(data1).then(response => {
          var version = Math.random()
          this.stupic = response.data.stupic + '?' + version
          this.option0.series[0].data = response.data.value
          this.option0.xAxis.data = response.data.kname
          myChart.setOption(this.option0)
          window.addEventListener('resize', function() { myChart.resize() })

          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      console.log(this.coures)
    },
	banl(){
		window.addEventListener('storage', function () {
			 this.$router.push('/login')  
		    localStorage.clear();
		    //this.$router.push('/login')  
		  });
     }
	 }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
