<template>

  <div class="table">

    <div>
      <el-tag class="tag-title">
        课程选择:
      </el-tag>
      <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
        <el-radio border :label="item" @change="coureschange">{{ item }}</el-radio>
      </el-radio-group>
      <br>
      <el-tag class="tag-title">
        任务选择:
      </el-tag>
      <el-radio-group v-model="selmis">
        <el-radio border label="hw" @change="selMission">作业任务</el-radio>
        <el-radio border label="exam" @change="selMission">试卷任务</el-radio>

      </el-radio-group>

    </div>
    <div>
      <el-select v-model="examclass" placeholder="请选择班级" @change="changeClass">
        <el-option
          v-for="item in classes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="examYmdTime"
        size="large"
        type="datetime"
        value-format="timestamp"
        placeholder="选择任务延长日期"
      />

      <el-button type="success" icon="el-icon-edit" @click="extendExamTime">延长任务时间</el-button>
      <el-button icon="el-icon-edit" type="danger" @click="delExamOfStu">删除学生试卷</el-button>
      <br>
    </div>
    <div v-show="misEnable">
      正在开发中。。。。
    </div>
    <div v-show="!misEnable">
      <div style="color:black;font:bold 50px 宋体;;text-align:center">学生试卷</div>
      <el-radio-group v-for="item in examTotalNum" :key="item" v-model="examidx">
        <el-radio border :label="item" @change="changeExam">试卷{{ item }}</el-radio>
      </el-radio-group>
      <p v-show="displaytime" align="center"><font size="10px" color="red">距离考试开始时间：  {{ countDownList }}</font></p>
      <p v-show="!displaytime" align="center"><font size="10px" color="green">距离考试结束时间：  {{ countDownList }}</font></p>
      <el-button type="success" @click="refreshPage">刷新页面</el-button>
      <vxe-toolbar custom :export="tableExport">
        <template v-slot:buttons>
          <vxe-button @click="exportDataEvent">导出数据</vxe-button>
        </template>
      </vxe-toolbar>
      <div v-show="setcomment">

        <div style="margin-top: 15px;">

          <el-select slot="prepend" v-model="gradeselect" placeholder="请选择分数等级">
            <el-option label="60分以下" value="60分以下" />
            <el-option label="60分-70分" value="60分-70分" />
            <el-option label="70分-80分" value="70分-80分" />
            <el-option label="80分-90分" value="80分-90分" />
            <el-option label="90分-100分" value="90分-100分" />
          </el-select>

          <el-input v-model="hw_comment" placeholder="请输入评语" class="handle-input mr10" />
          <el-button @click="addcomment">添加评语 </el-button>
        </div>
        <div>
          <el-input v-model="selallcontent" type="textarea" rows="6" placeholder="" />

        </div>
        <el-container>

          <el-main>
            <el-table border :data="commentData" class="table" @selection-change="handleSelectionChange">
              <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
              <!-- <el-table-column prop="mid" label="样本编号"  >
                </el-table-column> -->
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column label="序号" width="55">
                <template slot-scope="scope">
                  {{ scope.$index+1 }}
                </template>
              </el-table-column>
              <el-table-column prop="grade" label="等级" sortable />
              <el-table-column prop="comment" label="评语" sortable />
              <el-table-column label="删除" width="100" align="center">
                <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete" @click="handledelcomment(scope.$index, scope.row)">删除</el-button>
                  <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                </template>
              </el-table-column>

            </el-table>
          </el-main>
        </el-container>
      </div>

      <div class="container">
        <el-header style="text-align: left; font-size: 16px">

          <span>作业详细信息</span>
        </el-header>
        <vxe-table
          ref="multipleTable"
          class="table"
          border
          stripe
          :export-config="tableExport"
          :data="tableData"
          @selection-change="handleSelectionChange"
          @sort-change="handleSortChange"
        >

          <!-- <el-table-column type="selection" width="55" align="center" /> -->
          <vxe-table-column type="seq" label="序号" width="55" />

          <vxe-table-column prop="stuno" width="150" label="学号" sortable />
          <vxe-table-column prop="stuname" width="100" label="姓名" sortable />
          <vxe-table-column prop="stuclass" width="150" label="班级" sortable />
          <vxe-table-column
            v-for="(col,index) in queses"
            :key="index"
            :prop="col.prop"
            :label="col.label"
            width="100"
          />
          <!-- <el-table-column prop="stutime" width="250" label="提交时间" sortable /> -->
          <vxe-table-column

            prop="stuTotalScore"
            label="总成绩"
            sortable
          />
          <vxe-table-column label="批改" width="200" align="center">
            <template v-slot="scope">
              <vxe-button type="text" icon="el-icon-edit" @click="handleHomework(scope.rowIndex, scope.row)">开始批改</vxe-button>
              <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </vxe-table-column>
        </vxe-table>
        <div class="pagination">
          <!-- <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination> -->
          <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" :total="50" style="float:right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        </div>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog :visible.sync="editVisible" width="50%">
      <el-container>
        <el-header style="text-align: left; font-size: 16px">

          <span>作业详细信息</span>
        </el-header>

        <el-main>
          <el-table border class="table">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <!-- <el-table-column prop="mid" label="样本编号"  >
                </el-table-column> -->
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" width="55">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column prop="hwidx" label="作业" sortable />
            <el-table-column prop="score" label="成绩" sortable />

          </el-table>
        </el-main>
      </el-container>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getHwList, getallcomment, extendExamTime, addonecomment, delonecomment, delStuExam, hwOpenBatchSwitch, getStuExamForTea, hwCloseBatchSwitch } from '@/api/hwexp'
// import { expOpenBatchSwitch, expCloseBatchSwitch } from '@/api/hwexp'

export default {
  name: 'Hwtable',
  data() {
    return {
      url: './vuetable.json',

      examYmdTime: '',
      displaytime: true,
      tableExport: {
        // 默认选中类型
        type: 'xlsx',
        // 自定义类型
        types: ['xlsx', 'csv', 'html', 'xml', 'txt']
      },
      examStartTime: '',
      examEndTime: '',
      countDownList: '00天00时00分00秒',
      examclass: '所有班级',
      queses: [],
      misEnable: false,
      classes: [],
      examidx: 1,
      examTotalNum: 1,
      examnum: 1,
      selmis: 'exam',
      tableData: [],
      commentData: [],
      coures: '',
      selcoures: '',
      detailData: [],
      cur_page: 1,
      pagesize: 20,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      dataBak: [],
      hw_class: '',
      hw_idx: '',
      setcomment: false,
      gradeselect: '',
      hw_comment: '',
      selallcontent: '评语',
      form: {
        name: '',
        date: '',
        address: ''
      },
      idx: -1
    }
  },
  computed: {
    data() {
      return this.tableData.filter((d) => {
        let is_del = false

        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true
            break
          }
        }
        if (!is_del) {
          if (d.userno.indexOf(this.select_cate) > -1 &&
                            (d.username.indexOf(this.select_word) > -1 ||
                                d.stuClass.indexOf(this.select_word) > -1) ||
                                d.stuHw.indexOf(this.select_word) > -1
          ) {
            return d
          }
        }
      })
    }
  },
  watch: {
    '$route'(to, from) {
      // react to route changes...
      this.getData()
    }
  },
  created() {

  },
  mounted() {
    this.coures = JSON.parse(localStorage.getItem('coures'))
    this.selcoures = this.coures[0]
    this.getExamData()
    this.countDown()
    this.selallcontent = localStorage.getItem('gradecomments')
  },
  methods: {
    delExamOfStu() {
      const data = { 'owner': localStorage.getItem('userno'), 'userno': '', 'coures': this.selcoures, 'examidx': this.examidx, 'stuclass': this.examclass }

      delStuExam(data).then(response => {
        // this.tableData = response.data
        this.$message(response.data)
        this.refreshPage()
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    extendExamTime() {
      const data = { 'owner': localStorage.getItem('userno'), 'userno': '', 'coures': this.selcoures, 'examidx': this.examidx, 'stuclass': this.examclass, 'exttime': this.examYmdTime }
      extendExamTime(data).then(response => {
        // this.tableData = response.data
        this.$message(response.data)
        this.refreshPage()
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    exportDataEvent() {
      this.$refs.multipleTable.exportData({
        filename: '导出',
        sheetName: 'Sheet1',
        type: 'xlsx'
      })
    },
    refreshPage() {
      this.getExamData()
      this.countDown()
    },
    changeClass() {
      this.getExamData()
      this.countDown()
      // console.log(this.examclass)
    },
    getExamData() {
      const that = this

      const data = { 'size': that.pagesize, 'page': that.cur_page, 'coures': that.selcoures, 'userno': localStorage.getItem('userno'), 'examidx': this.examidx, 'stuclass': this.examclass }
      getStuExamForTea(data).then(response => {
        if ((response.data !== 'error') && (response.data !== '')) {
          that.examTotalNum = response.data.examTotalNum
          that.examnum = response.data.examnum
          that.tableData = response.data.info
          that.classes = response.data.classes
          that.examStartTime = that.timestampToTime(parseInt(response.data.examStartTime))
          that.examEndTime = that.timestampToTime(parseInt(response.data.examEndTime))
          // console.log(this.examStartTime, this.examEndTime)
          that.queses = []
          for (let i = 0; i < that.examnum; i++) {
            that.queses.push({ 'prop': (i + 1).toString(), 'label': (i + 1).toString() })
          }
          var userlist = []
          for (var u = 0; u < that.tableData.length; u++) {
            userlist.push(that.tableData[u].stuno)
          }
          localStorage.setItem('tableidx', userlist)
        } else {
          that.$message.error('没有试卷')
          that.examTotalNum = ''
          that.tableData = []
          that.classes = []
        }
        // console.log(that.examnum)
        // console.log(response.data)
        // that.bigQues = response.data.info
        // console.log(response.data)

        setTimeout(() => {
          that.listLoading = false
        }, 1.5 * 1000)
      })
    },
    changeExam() {
      this.getExamData()
      this.countDown()
    },
    selMission() {
      if (this.selmis === 'hw') {
        this.misEnable = true
        // this.getExamData()
      } else {
        this.misEnable = false
        this.getExamData()
        this.countDown()
      }
    },
    // countItemDown() {
    //   var interval = setInterval(() => {
    //     // 获取当前时间，同时得到活动结束时间数组
    //     const newTime = new Date().getTime()
    //     // 对结束时间进行处理渲染到页面
    //     const endTime = new Date(this.quesEndTime).getTime()
    //     let obj = null

    //     // 如果活动未结束，对时间进行处理
    //     if (endTime - newTime > 0) {
    //       const time = (endTime - newTime) / 1000
    //       // 获取天、时、分、秒
    //       const day = parseInt(time / (60 * 60 * 24))
    //       const hou = parseInt(time % (60 * 60 * 24) / 9000)
    //       const min = parseInt(time % (60 * 60 * 24) % 9000 / 60)
    //       const sec = parseInt(time % (60 * 60 * 24) % 9000 % 60)
    //       obj = {
    //         day: this.timeFormat(day),
    //         hou: this.timeFormat(hou),
    //         min: this.timeFormat(min),
    //         sec: this.timeFormat(sec)
    //       }
    //     } else { // 活动已结束，全部设置为'00'
    //       obj = {
    //         day: '00',
    //         hou: '00',
    //         min: '00',
    //         sec: '00'
    //       }
    //       this.itemVisible = true
    //       clearInterval(interval)
    //       this.countItemDown()
    //     }
    //     this.remain = obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
    //     if ((!this.itemWarning) && (parseInt(obj.min) === 0)) {
    //       // alert('还有一分钟')
    //       this.itemWarning = true
    //     }
    //   }, 1000)
    // },
    timeFormat(param) {
      return param < 10 ? '0' + param : param
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    countDownEnd(it) {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        const newTime = new Date().getTime()
        // console.log(this.examEndTime)
        // 对结束时间进行处理渲染到页面
        // console.log(this.examEndTime)
        const endTime = new Date(this.examEndTime).getTime()
        let obj = null
        //  console.log(endTime-newTime)
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          const time = (endTime - newTime) / 1000
          // 获取天、时、分、秒
          const day = parseInt(time / (60 * 60 * 24))
          const hou = parseInt(time % (60 * 60 * 24) / 9000)
          const min = parseInt(time % (60 * 60 * 24) % 9000 / 60)
          const sec = parseInt(time % (60 * 60 * 24) % 9000 % 60)
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          }
        } else { // 活动已结束，全部设置为'00'
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          }
          // this.itemVisible = true

          clearInterval(interval)
          // this.hwswitch = false
          // this.countItemDown()
        }
        this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
      }, 1000)
    },
    countDown(it) {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        const newTime = new Date().getTime()
        // 对结束时间进行处理渲染到页面
        const endTime = new Date(this.examStartTime).getTime()
        let obj = null
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          const time = (endTime - newTime) / 1000
          // 获取天、时、分、秒
          const day = parseInt(time / (60 * 60 * 24))
          const hou = parseInt(time % (60 * 60 * 24) / 9000)
          const min = parseInt(time % (60 * 60 * 24) % 9000 / 60)
          const sec = parseInt(time % (60 * 60 * 24) % 9000 % 60)
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          }
        } else { // 活动已结束，全部设置为'00'
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          }
          // this.itemVisible = true
          clearInterval(interval)
          this.displaytime = false
          // this.hwswitch = true
          this.countDownEnd()
          // this.countItemDown()
        }
        this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
      }, 1000)
    },
    handleconfirmcomment() {

      // localStorage.setItem('comments', this.selallcontent)
    },
    handledelcomment(index, row) {
      const data = { 'coures': this.selcoures, 'userno': localStorage.getItem('userno'), 'grade': row.grade, 'comment': row.comment }
      delonecomment(data).then(response => {
        // this.tableData = response.data
        // console.log(response.data)
        this.$message('评语删除完成')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      this.idx = index
      this.commentData.splice(this.idx, 1)
      // this.delVisible = true
    },

    getcomment() {
      const data = { 'coures': this.selcoures, 'userno': localStorage.getItem('userno') }
      getallcomment(data).then(response => {
        this.commentData = response.data
        // console.log(response.data)
        this.$message('评语获取完成')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    addcomment() {
      const data = { 'coures': this.selcoures, 'userno': localStorage.getItem('userno'), 'grade': this.gradeselect, 'comment': this.hw_comment }
      addonecomment(data).then(response => {
        // this.tableData = response.data
        // console.log(response.data)
        this.$message('评语添加完成')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      this.getcomment()
    },
    handlesetcomment() {
      // console.log('adfadf')
      if (!this.setcomment) {
        this.setcomment = true
        this.getcomment()
      } else {
        this.setcomment = false
      }
    },
    hwopenbatch() {
      const data = { 'stuClass': this.hw_class, 'coures': this.selcoures, 'hwidx': this.hw_idx, 'owner': localStorage.getItem('userno') }
      hwOpenBatchSwitch(data).then(response => {
        // this.tableData = response.data
        // console.log(response.data)
        this.$message('作业打开成功')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    hwclosebatch() {
      const data = { 'stuClass': this.hw_class, 'coures': this.selcoures, 'hwidx': this.hw_idx, 'owner': localStorage.getItem('userno') }
      hwCloseBatchSwitch(data).then(response => {
        // this.tableData = response.data
        // console.log(response.data)
        this.$message('作业关闭成功')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    coureschange() {
      // console.log(this.selcoures)
      this.examclass = '所有班级'
      this.getExamData()
      this.countDown()
    },

    handleSizeChange(size) {
	    this.pagesize = size
	  },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val
      this.getData()
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // let data={'site':localStorage.getItem('site')};
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures }

      getHwList(data).then(response => {
        this.tableData = response.data
        var userlist = []
        for (var u = 0; u < this.tableData.length; u++) {
          userlist.push(this.tableData[u].userno)
        }
        localStorage.setItem('tableidx', userlist)
        // console.log(response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    search() {
      this.is_search = true
      if (this.select_word) {
        var lily = this.dataBak.filter((p) => {
          return p.season === this.select_word
        })
        this.tableData = lily
      } else this.tableData = this.dataBak
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    async handleSortChange() {
      console.log(this.$refs.multipleTable)
      // console.log(this.tableData)
    },
    async handleHomework(index, row) {
      localStorage.setItem('stuno', row.stuno)
      localStorage.setItem('stuname', row.stuname)
      localStorage.setItem('stucoures', this.selcoures)
      localStorage.setItem('useridx', index)
      localStorage.setItem('examidx', this.examidx)
      // console.log(this.examidx)

      this.$router.replace('stuexamfortea')
      this.$message('批改学生为： ' + row.stuno + '|' + row.stuname)
      // if (this.selallcontent) {
      //   this.$router.replace('stuhw')
      //   this.$message('编辑题号为： ' + row.userno + '|' + row.username)
      // } else {
      //   alert('请设置评语')
      // }
    },
    async handleEdit(index, row) {
      this.idx = index
      this.detailData = []

      // const item = this.tableData[index+this.pagesize*(this.cur_page-1)];
      const item = this.tableData[index]

      this.editVisible = true
    },
    handleDelete(index, row) {
      this.idx = index
      this.delVisible = true
    },
    delAll() {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    handleSelectionChange(val) {
      this.selallcontent = ''
      const obj = {}
      val = val.reduce((item, next) => {
        obj[next.grade] ? '' : obj[next.grade] = true && item.push(next)
        return item
      }, [])
      this.multipleSelection = val
      for (var v = 0; v < val.length; v++) {
        this.selallcontent = this.selallcontent + val[v].grade + ':' + val[v].comment + '\n'
      }
      localStorage.setItem('gradecomments', this.selallcontent)
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form)
      this.editVisible = false
      this.$message.success(`修改第 ${this.idx + 1} 行成功`)
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1)
      this.$message.success('删除成功')
      this.delVisible = false
    }
  }
}

</script>

<style scoped>

    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
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
