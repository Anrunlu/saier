<template>
  <div class="dashboard-editor-container">
     
    <el-row :gutter="32"  >
      <el-col> 
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
import {getusertype} from '@/api/admin.js'
// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import BarChart2 from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

export default {
  name: 'adminDashboard',
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
    // RaddarChart,
    // PanelGroup,

    // BarChart,
    // BarChart2

  },
  data() {
    return {
		 option1:{
		    
		     color: ['#37a2da','#32c5e9','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293','#e7bcf3','#8378ea'],
		     tooltip : {
		         trigger: 'item',
		         formatter: "{a} <br/>{b} : {c} ({d}%)"
		     },
		     toolbox: {
		         show : true,
		        
		     },
		       legend: {
		         type:"scroll",
		        // orient: 'vertical',
		         left:'10%',
		         align:'left',
		         top:'middle',
		        /* textStyle: {
		             color:'#8C8C8C'
		         }, */
		         height:150
		     },
		     series : [
		         {
		             name:'用户类型',
		             type:'pie',
		            
		             data:[   
                 ]
		         }
		     ]
		 },
         option2:  {
				 title: {
					text: '各学院数据',
					left: 'center',
					top: 2,
					textStyle: {
					  fontSize: 20
					},
				  },
				color:['#5b9bd5','#ed7d31','#a9d18e','#ffc000'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {            // 坐标轴指示器，坐标轴触发有效
						type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '10%',
					containLabel: true
				},
				legend: {
					left:'center',
					bottom:'2%',
					data: ['老师数目', '课程数目']
				},
				xAxis: [
					{
						type: 'category',
						data: [],
						axisTick: {
							alignWithLabel: true
						}
					}
				],
				yAxis: [
					{
						type: 'value'
					}
				],
				series: [
					{
						name: '老师数目',
						type: 'bar',
						data: [ ]
					},
					 {
						name: '课程数目',
						type: 'bar',
						data: [ ]
					}
				]
			}
      }
  },
  mounted() {
    this.getdata()
	this.banl()
  },
  methods: {
      getdata(){ 
		  const myChart1 = echarts.init(document.getElementById('myChart1'))
		  const myChart2 = echarts.init(document.getElementById('myChart2'))
		  getusertype().then(response => { 
		    this.option1.series[0].data = response.data.userlist
			this.option2.xAxis[0].data=response.data.collegelist
			this.option2.series[0].data=response.data.teacherlist
			this.option2.series[1].data=response.data.coureslist
			  myChart1.setOption(this.option1)
			  myChart2.setOption(this.option2)
		    })  
	  },
     banl(){
     	window.addEventListener('storage', function () {
     	    localStorage.clear();
     	    this.$router.push('/login')  
     	  });
     }
     
		  
    }
  
}
</script>

<style lang="scss" scoped>
 
</style>
