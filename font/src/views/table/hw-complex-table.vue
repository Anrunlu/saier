<template>

  <div class="table">

    <div>
      <el-tag class="tag-title">
        课程选择:
      </el-tag>
      <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
        <el-radio border :label="item" @change="coureschange">{{ item }}</el-radio>
      </el-radio-group>

    </div>

    <div>
      <el-select v-model="expclass" placeholder="请选择班级" @change="changeClass">
        <el-option
          v-for="item in classes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- <el-input v-model="hw_class" placeholder="请填写班级" class="handle-input mr10" /> -->
      <el-input v-model="hw_idx" placeholder="请填写作业 " class="handle-input mr10" />
      <el-button icon="el-icon-edit" @click="hwopenbatch">开放作业</el-button>
      <el-button icon="el-icon-edit" @click="hwclosebatch">关闭作业</el-button>
      <el-button icon="el-icon-edit" @click="handlesetcomment">评语设置</el-button>
    </div>

    <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 样本列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
    <div style="color:black;font:bold 50px 宋体;;text-align:center">学生作业</div>
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
      <el-table ref="multipleTable" :data="tableData" border class="table" @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" width="55">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="userno" width="200" label="学号" sortable />
        <el-table-column prop="username" width="150" label="姓名" sortable />
        <el-table-column prop="stuClass" width="200" label="班级" sortable />
        <el-table-column prop="stutime" width="250" label="提交时间" sortable />
        <el-table-column prop="stuHwScore" label="作业成绩" sortable />
        <el-table-column label="作业批改" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleHomework(scope.$index, scope.row)">开始批改</el-button>
          <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <!-- <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination> -->
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" :total="50" style="float:right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

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
import { getHwList, getallcomment, addonecomment, delonecomment, hwOpenBatchSwitch, hwCloseBatchSwitch } from '@/api/hwexp'
// import { expOpenBatchSwitch, expCloseBatchSwitch } from '@/api/hwexp'

export default {
  name: 'Hwtable',
  data() {
    return {
      url: './vuetable.json',

      expclass: '所有班级',
      classes: [],
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
      selallcontent: '',
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
    this.getData()
    this.selallcontent = localStorage.getItem('gradecomments')
  },
  methods: {
    changeClass() {
      localStorage.setItem('selclass', this.expclass)
      this.getData()
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
      this.getData()
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
      if (localStorage.getItem('selclass')) {
        this.expclass = localStorage.getItem('selclass')
      }
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'stuclass':this.expclass }

      getHwList(data).then(response => {
        this.tableData = response.data.info
        this.classes = response.data.classes
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
    async handleHomework(index, row) {
      localStorage.setItem('stuno', row.userno)
      localStorage.setItem('stuname', row.username)
      localStorage.setItem('stucoures', this.selcoures)
      localStorage.setItem('useridx', index)
      if (this.selallcontent) {
        this.$router.replace('stuhw')
        this.$message('编辑题号为： ' + row.userno + '|' + row.username)
      } else {
        alert('请设置评语')
      }
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
