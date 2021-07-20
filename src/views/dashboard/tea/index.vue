<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->
    <div style="margin: 20px 0;display: flex;align-items: center">
      <el-tag class="tag-title">
        课程增减:
      </el-tag>
      <el-input v-model="courseName" style="width: 18%;margin: 0 5px" placeholder="请输入课程名称" />
      <el-upload
        ref="add"
        class="upload-demo"
        style="margin-right: 5px"
        :auto-upload="true"
        action="UploadUrl()"
        :before-upload="beforeUploadFile"
        :on-change="fileChangeAdd"
        accept=".xlsx"
        :limit="1"
        multiple
        :on-exceed="exceedFile"
        :file-list="fileListAdd"
        :http-request="uploadAddFile"
      >
        <el-button size="small" type="primary">增加课程<i class="el-icon-upload el-icon--right" /></el-button>
      </el-upload>
      <el-upload
        class="upload-demo"
        :auto-upload="true"
        action="UploadUrl2()"
        :before-upload="beforeUploadFile"
        :on-change="fileChangeDes"
        accept=".xlsx"
        :limit="1"
        multiple
        :on-exceed="exceedFile"
        :file-list="fileListDes"
        :http-request="uploadDesFile"
      >
        <el-button size="small" type="primary">删除课程<i class="el-icon-upload el-icon--right" /></el-button>
        <el-button size="small" @click="downloadPDf" type="primary"><i class="el-icon-download el-icon--right"></i>下载导入数据模板</el-button>
      </el-upload>
    </div>
    <div style="margin: 20px 0">
      <el-tag class="tag-title">
        密码重置:
      </el-tag>
      <el-input v-model="stuno" style="width: 18%" placeholder="请输入学生学号" />
      <el-button type="warning" @click="onResetStuPsw">重置学生登录密码</el-button>
    </div>
    <div>
      <el-tag class="tag-title">
        课程选择:
      </el-tag>
      <el-radio-group v-for="item in coures" :key="item" v-model="selcourse">
        <el-radio border :label="item" @change="couresChange">{{ item }}</el-radio>

      </el-radio-group>
    </div>
    <br>
    <div>
      <el-tag class="tag-title">
        班级选择:
      </el-tag>
      <el-radio-group v-for="item in classes" v-model="selclass">
        <el-radio border :label="item" @change="classChange">{{ item }}</el-radio>
      </el-radio-group>
    </div>
    <!-- <div>
      <el-button type="primary" icon="upload" style="bottom: 15px; " @click="yuxiinfo">
        查看预习情况
      </el-button>
    </div>
    <div class="container">
      <el-header style="text-align: left; font-size: 16px">

        <span>预习作业情况</span>
      </el-header>
      <el-table ref="multipleTable" :data="tableData" border class="table">

        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" width="55">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="kname" width="200" label="知识点" />
        <el-table-column prop="star_0" width="100" label="0星人数" />
        <el-table-column prop="star_1" width="100" label="1星人数" />
        <el-table-column prop="star_2" width="100" label="2星人数" />

        <el-table-column prop="star_3" width="100" label="3星人数" />
        <el-table-column prop="star_4" width="100" label="4星人数" />
        <el-table-column prop="star_5" width="100" label="5星人数" />
      </el-table>
    </div> -->
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" />-->

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" :gutter="8">
      <el-col :span="12">
        <div class="chart-wrapper">
          <bar-chart :chart-data="chartDatasHw" />
        </div>
      </el-col>
      <!-- <div id="yuxibar" class="chart-container" /> -->
      <!-- <el-row :gutter="32"> -->
      <el-col :span="12">
        <div class="chart-wrapper">
          <bar-chart :chart-data="chartDatasPr" />
        </div>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" :gutter="8">
      <el-col :span="12">
        <div class="chart-wrapper">
          <bar-chart :chart-data="chartDatasGrade" />
        </div>
      </el-col>
      <!-- <div id="yuxibar" class="chart-container" /> -->
      <!-- <el-row :gutter="32"> -->
      <el-col :span="12">
        <div class="chart-wrapper">
          <bar-chart :chart-data="chartDatasExp" />
        </div>
      </el-col>
    </el-row>

    <!--<el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
import { dataForDashboard, getClassList, setStuPsw, uploadExcel, dataForTeaShow } from '@/api/hwexp'
// import echarts from 'echarts'
// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

export default {
  name: 'teaDashboard',
  components: {
    // GithubCorner,
    // PanelGroup,
    // LineChart,
    // RaddarChart,
    // PieChart,
    BarChart
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      courseName: '',
      stuno: '',
      fileListAdd: [],
      fileListDes: [],
      coures: '',
      selcourse: '',
      tableData: [],
      chartDatasHw: {
        title: '课堂作业完成情况',
        x: [],
        y: [],
		name:'完成人数',
		subtext:'', 
        color: 'green'
      },
      chartDatasPr: {
        title: '预习作业完成情况',
        x: [],
        y: [],
		name:'完成人数',
		subtext:'', 
        color: '#5BC49F'
      },
      chartDatasGrade: {
        title: '每次考试平均分',
        x: [],
        y: [],
		name:'平均分',
		subtext:'',  
        color: 'red'
      },
      chartDatasExp: {
        title: '实验作业完成情况',
        x: [],
        y: [],
	    name:'完成人数',
		subtext:'',  
        color: '#EFB64D'
      },
      charSeries: [],
      classes: [],
      selclass: ''
    }
  },
  created() {

  },
  mounted() {
    this.getData()
	this.banl()
  },
  methods: {
    // 密码变更
    onResetStuPsw() {
      const _this = this
      const data = { 'stuno': this.stuno }
      setStuPsw(data).then(response => {
        _this.$message(response.data)
        setTimeout(() => {
          _this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 文件数量有多个的钩子
    exceedFile(files, fileList) {
      this.$message.warning('只能选择1个文件')
    },
    // 文件状态改变时的钩子
    fileChangeAdd(file) {
      this.fileListAdd.push(file.raw)
    },
    fileChangeDes(file) {
      this.fileListDes.push(file.raw)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1) // 验证文件类型
      if (extension !== 'xlsx') {
        this.$message.warning('只能上传后缀是.xlsx的文件')
      }
      // 计算文件大小
      // let size = file.size / 1024 / 1024
      // if (size > 10) {
      //   this.$message.warning('文件大小不得超过10M')
      // }
    },
    UploadUrl: function() {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错return ""
    },
    uploadAddFile(option) {
      const _this = this
      if (this.fileListAdd.length === 0) {
        _this.$message.warning('请上传文件')
      } else {
        const form = new FormData()
        form.append('userno', localStorage.getItem('userno'))
        form.append('file', option.file)
        form.append('course', _this.courseName)
        form.append('operate', 'add')
        console.log(form)
        console.log(form.get('userno'))
        console.log(form.get('file'))
        console.log(form.get('course'))
        console.log(form.get('operate'))
        uploadExcel(form).then(response => {
          _this.fileListAdd.pop()
          _this.$message(response.data.message)
        })
      }
    },
    uploadDesFile(option) {
      const _this = this
      if (this.fileListDes.length === 0) {
        _this.$message.warning('请上传文件')
      } else {
        const form = new FormData()
        form.append('userno', localStorage.getItem('userno'))
        form.append('file', option.file)
        form.append('course', _this.courseName)
        form.append('operate', 'des')
        console.log(form)
        console.log(form.get('userno'))
        console.log(form.get('file'))
        console.log(form.get('course'))
        console.log(form.get('operate'))
        uploadExcel(form).then(response => {
          _this.fileListDes.pop()
          _this.$message(response.data.message)
        })
      }
    },
    // 模板下载
    downloadPDf() {
      window.location.href = '/static/stu.xlsx'
    },
    getData() {
      const _this = this
      const data = { 'userno': localStorage.getItem('userno') }
      // 这里用Get,可以获取到本地的json文件中的内容。
      dataForDashboard(data).then(response => {
        _this.coures = response.data.coures
        _this.selcourse = _this.coures[0]
        _this.getDataClass()

        localStorage.setItem('coures', JSON.stringify(_this.coures))
        localStorage.setItem('type', response.data.type)

        // this.radio=response.data.radio
        // if(this.radio==2) {self.firstshow=false;self.secondshow=true;}
        setTimeout(() => {
          _this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 课程改变
    couresChange() {
      this.getDataClass()
    },
    getDataClass() {
      const _this = this
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcourse }
      getClassList(data).then(response => {
        _this.classes = response.data
      })
    },
    // 班级改变
    classChange() {
      const _this = this
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcourse, 'classes': this.selclass }
		 
      dataForTeaShow(data).then(response => {
        _this.chartDatasHw.y = response.homework_info
        _this.chartDatasPr.y = response.preview_info
        _this.chartDatasGrade.y = response.exam_info
        _this.chartDatasExp.y = response.exp_info
		_this.chartDatasHw.subtext = "总人数"+response.total
		_this.chartDatasPr.subtext= "总人数"+response.total
		_this.chartDatasGrade.subtext = "总人数"+response.total
		_this.chartDatasExp.subtext = "总人数"+response.total
		_this.chartDatasHw.x = []
		_this.chartDatasPr.x = []
		_this.chartDatasGrade.x = []
		_this.chartDatasExp.x = []
        for (let i = 0; i < response.homework_info.length; i++) {
          _this.chartDatasHw.x.push('作业' + i)
        }
        for (let j = 0; j < response.preview_info.length; j++) {
          _this.chartDatasPr.x.push('预习' + j)
        }
        for (let k = 0; k < response.exam_info.length; k++) {
          _this.chartDatasGrade.x.push('考试' + k)
        }
        for (let l = 0; l < response.exp_info.length; l++) {
          _this.chartDatasExp.x.push('实验' + l)
        }
      })
    },
	banl(){
		window.addEventListener('storage', function () {
		    localStorage.clear();
		    window.location.replace("/#/login");
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
.chart-container {
  border-radius: 4px;
  height: 400px;
  background: #fff;
  box-shadow: 0 1px 10px 2px rgba(182, 191, 196, 0.5);
  padding: 20px;
}
.table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    }
</style>
