<template>
  <div class="dashboard-editor-container">
     请耐心等待管理员分配角色
  </div>
</template>

<script>
import echarts from 'echarts'
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
import { dataForDashboard, dataForMyPage ,dataForStuShow } from '@/api/hwexp'
 
export default {
  name: 'otherDashboard',
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
     
    }
  },
  mounted() {
   // this.getData()
   this.banl()
  },
  methods: {
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
