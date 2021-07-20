<template>

  <div class="table">

    <div>
      <el-tag class="tag-title">
        课程选择:
      </el-tag>
      <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
        <el-radio border :label="item" @change="getData">{{ item }}</el-radio>

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
      <el-input v-model="expidx" placeholder="请输入实验号，如 1 （每次只关闭1个实验）" class="handle-input mr10" />
      <!-- <el-input v-model="selclass" placeholder="请输入班级" class="handle-input mr10" /> -->
      <!-- <el-select v-model="selclass" placeholder="请选择班级"> -->
      <el-button icon="el-icon-edit" @click="expOpenBatch">开放实验</el-button>
      <el-button icon="el-icon-edit" @click="expCloseBatch">关闭实验</el-button>
    </div>
    <!-- <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 样本列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div> -->
    <div style="color:black;font:bold 36px 宋体;;text-align:center">实验报告</div>

    <div class="container">

      <div class="handle-box">

        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
        <!-- <el-select v-model="select_cate" placeholder="筛选抗生素" class="handle-select mr10">
                    <el-option key="1" label="链霉素" value="链霉素"></el-option>
                    <el-option key="2" label="甲硝唑" value="甲硝唑"></el-option>
                </el-select> -->
        <!-- <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" /> -->
        <!-- <el-button   type="primary" icon="search" @click="search">搜索</el-button>  -->

      </div>
      <el-table ref="multipleTable" :data="tableData" border class="table" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" type="index" show-overflow-tooltip width="50" />
        <el-table-column prop="userno" width="120" label="学号" sortable />
        <el-table-column prop="username" width="80" label="姓名" sortable />
        <el-table-column prop="stuClass" width="120" label="班级" sortable />
        <el-table-column prop="stutime" width="150" label="提交时间" sortable />
        <el-table-column prop="stuExpScore" label="实验成绩" sortable>
          <!-- <template slot-scope="{row}">
                   <span class="link-type" @click="handleEdit(row.$index, row.row)">{{ row.stuHw }}</span>

                  </template> -->
        </el-table-column>
        <!-- <el-table-column prop="sampler" label="采样人" >
                </el-table-column>
                <el-table-column prop="place" label="采样地点" >
                </el-table-column>
                <el-table-column prop="sampsource" label="样本来源"  >
                </el-table-column>
                <el-table-column prop="samptarget" label="样本靶组织" >
                </el-table-column>
                <el-table-column prop="dettime" label="检测时间" >
                </el-table-column>
                <el-table-column prop="sampstatus" label="样本状态"  >
                </el-table-column>
                <el-table-column prop="transway" label="运输方式"  >
                </el-table-column>
                <el-table-column prop="accepter" label="接收人"  >
                </el-table-column>
                <el-table-column prop="acctime" label="接收时间"  >
                </el-table-column> -->
        <el-table-column label="作业批改" align="center" width="150">
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
          <el-table :data="detailData" border class="table">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <!-- <el-table-column prop="mid" label="样本编号"  >
                </el-table-column> -->
            <el-table-column prop="hwidx" label="作业" sortable />
            <el-table-column prop="score" label="成绩" sortable />

          </el-table>
        </el-main>
      </el-container>
    </el-dialog>

    <!-- <el-dialog title="样本详细信息" lock-scroll=true :visible.sync="editVisible" width="30%">
            <el-table :data="tableData.slice((cur_page-1)*pagesize,cur_page*pagesize)" border class="table"  >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="sampid" label="样本编号" sortable >
                </el-table-column>
                <el-table-column prop="mname" label="兽药名称">
                </el-table-column>
                <el-table-column prop="dectval" label="检测值">
                </el-table-column>
                <el-table-column prop="mmax" label="残留限量">
                </el-table-column>
                <el-table-column prop="exceed" label="超出量">
                </el-table-column>

             </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->

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
import { getExpList } from '@/api/hwexp'
import { expOpenBatchSwitch, expCloseBatchSwitch } from '@/api/hwexp'

export default {
  name: 'Exptable',
  data() {
    return {
      expclass: '所有班级',
      selclass: '',
      classes: [],
      expswitch: '',
      url: './vuetable.json',
      expidx: '',

      tableData: [],
      coures: [],
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
                                d.stuExp.indexOf(this.select_word) > -1
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
    this.expclass = localStorage.getItem('selclass')
    this.getData()
  },
  methods: {
    unique(array) {
      var n = {}; var r = []

      var val; var type
      for (var i = 0; i < array.length; i++) {
        val = array[i]
        type = typeof val
        if (!n[val]) {
          n[val] = [type]
          r.push(val)
        } else if (n[val].indexOf(type) < 0) {
          n[val].push(type)
          r.push(val)
        }
      }
      return r
    },
    handleSizeChange(size) {
      this.pagesize = size
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val
      this.getData()
    },
    changeClass() {
      localStorage.setItem('selclass', this.expclass)
      this.getData()
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'stuclass': this.expclass }

      getExpList(data).then(response => {
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

      // console.log(this.selclass)
      this.$router.replace('stuexps')
      this.$message('编辑题号为： ' + row.userno + '|' + row.username)
    },
    async handleEdit(index, row) {
      this.idx = index
      this.detailData = []

      // const item = this.tableData[index+this.pagesize*(this.cur_page-1)];
      const item = this.tableData[index]

      this.editVisible = true
    },
    expOpenBatch() {
      const data = { 'stuClass': this.selclass, 'coures': this.selcoures, 'expidx': this.expidx, 'couresTea': localStorage.getItem('userno') }
      expOpenBatchSwitch(data).then(response => {
        // console.log(response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    expCloseBatch() {
      const data = { 'stuClass': this.selclass, 'coures': this.selcoures, 'expidx': this.expidx, 'couresTea': localStorage.getItem('userno') }
      expCloseBatchSwitch(data).then(response => {
        console.log(response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
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
      this.multipleSelection = val
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
