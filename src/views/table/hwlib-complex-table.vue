<template>
  <div class="table">

    <div>
      <div style="color:black;font:bold 50px 宋体;;text-align:center">题库</div>
      <el-tag class="tag-title">
        课程选择:
      </el-tag>
      <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
        <el-radio border :label="item" @change="gethwofcoures">{{ item }}</el-radio>

      </el-radio-group>
    </div>

    <div>

      <el-select v-model="hwclass" placeholder="请选择班级">
        <el-option
          v-for="item in classes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input v-model="hwidx" placeholder="输入作业索引" class="handle-input mr10" />

      <!-- <el-button icon="el-icon-edit">开放作业</el-button>
      <el-button icon="el-icon-edit">关闭作业</el-button> -->

      <el-input v-model="hwtext" placeholder="" class="handle-input mr10" />
<!--      <el-button type="warning" icon="el-icon-edit" @click="assignHw">布置作业</el-button>-->
      <br>
      <el-radio-group v-for="item in hwnum" :key="item" v-model="selhw">
        <el-radio border :label="item" @change="changehw">作业{{ item }}</el-radio>

      </el-radio-group>

    </div>

    <div>

      <!-- <el-input v-model="hwclass" placeholder="输入班级" class="handle-input mr10" /> -->
      <!-- <el-select v-model="hwclass" placeholder="请选择班级">
        <el-option
          v-for="item in classes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
      <!-- <el-input v-model="hwidx" placeholder="输入作业索引" class="handle-input mr10" /> -->

      <!-- <el-button icon="el-icon-edit">开放作业</el-button>
      <el-button icon="el-icon-edit">关闭作业</el-button> -->
      <!-- <el-button icon="el-icon-edit" @click="addQuestion">新建题目</el-button><br> -->
      <!-- <el-input v-model="hwtext" placeholder="" class="handle-input mr10" />
      <el-button type="danger" icon="el-icon-edit" @click="assignHw">发布试卷到考场</el-button> -->
      <br>
      <el-radio-group v-for="item in hwnum" :key="item" v-model="selhw">
        <el-radio border :label="item" @change="changehw">作业{{ item }}</el-radio>

      </el-radio-group>

    </div>

    <div class="container">
      <el-button icon="el-icon-edit" @click="addQuestion">新建题目</el-button><br>
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
        <el-table-column label="序号" width="55">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="quesNo" width="55" sortable label="题号" />
        <!-- <el-table-column prop="queshw" width="55" sortable label="题目分布" /> -->
        <el-table-column prop="score" width="55" sortable label="分值" />
        <el-table-column prop="question" label="题干" sortable />
        <el-table-column prop="answer" label="答案" />
        <el-table-column prop="knowledge" sortable label="知识点" />

        <el-table-column label="详细信息" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleHomework(scope.$index, scope.row)">题目详情</el-button>
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
const tabled = [{ userno: '2001', username: '李四', stuClass: '软件开发', stuHw: '98' }, { userno: '2001', username: '张三', stuClass: '软件开发', stuHw: '99' }]

import { getQuesBase, assginHomeWork, getallhws } from '@/api/hwexp'
export default {
  name: 'Hwtable',
  data() {
    return {
      url: './vuetable.json',
      hwclass: '',
      hwidx: '',
      tableData: tabled,
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
      hwinfo: [],
      hwnum: '',
      hwtext: '',
      selhw: '',
      allhwdata: [],
      classes: [],

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
        let is_del1 = false

        for (let i = 0; i < this.del_list1.length; i++) {
          if (d.name === this.del_list1[i].name) {
            is_del1 = true
            break
          }
        }
        if (!is_del1) {
          if (d.userno.indexOf(this.select_cate1) > -1 &&
                            (d.username.indexOf(this.select_word1) > -1 ||
                                d.stuClass.indexOf(this.select_word1) > -1) ||
                                d.stuHw.indexOf(this.select_word1) > -1
          ) {
            return d
          }
        }
      })
    }
  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.coures = JSON.parse(localStorage.getItem('coures'))
    // console.log(this.coures)
    this.selcoures = this.coures[0]
    this.getData()
  },
  methods: {
    changehw() {
      this.tableData = this.allhwdata[parseInt(this.selhw) - 1]
    },
    gethwofcoures() {
    //   console.log(this.selcoures)
      this.getData()
    },
    toggleSelection(rows) {
      if (rows) {
        // console.log(rows)
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
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
      const that = this
      if (localStorage.getItem('selclass')) {
        that.expclass = localStorage.getItem('selclass')
      }
      // let data={'site':localStorage.getItem('site')};
      const data = { 'size': that.pagesize, 'page': that.cur_page, 'coures': that.selcoures, 'userno': localStorage.getItem('userno') }
      //   this.coures = localStorage.getItem('coures')
      //   console.log(this.coures)
      that.hwnum = ''
      getQuesBase(data).then(response => {
        that.tableData = response.data.question
        that.hwinfo = response.data.hwcontent

        setTimeout(() => {
          that.listLoading = false
        }, 1.5 * 1000)
      })

      getallhws(data).then(response => {
        // console.log(response.data)
        that.allhwdata = response.data.allhws
        that.classes = response.data.classes
        that.hwnum = that.allhwdata.length
        // console.log(that.hwnum)
        if (that.hwnum === '0') {
          that.hwnum = ''
        }

        setTimeout(() => {
          that.listLoading = false
        }, 1.5 * 1000)
      })

      // for()
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
      localStorage.setItem('quesNo', row.quesNo)
      localStorage.setItem('selcoures', this.selcoures)

      this.$router.replace('quesbase')
      this.$message('编辑题号为： ' + row.quesNo)
    },
    async addQuestion(index, row) {
      localStorage.setItem('selcoures', this.selcoures)
      this.$router.replace('quesbase')
      localStorage.setItem('quesNo', '0')
    },
    async handleEdit(index, row) {
      this.idx = index
      this.detailData = []

      // const item = this.tableData[index+this.pagesize*(this.cur_page-1)];
      //   const item = this.tableData[index]

      // console.log(index,this.pagesize,this.cur_page,this.tableData[index+this.pagesize*(this.cur_page-1)])
      // console.log(index+this.pagesize*(this.cur_page-1),this.tableData)
      // this.sampleinfo='样本编号：'+item.sampid+','+'样本年度：'+item.year+','+'采样人：'+item.sampler+','+'采样地点：'+item.place+', \n '+'样本来源：'+item.sampsource+','+'样本靶组织：'+item.samptarget;
      // var fil=this.tableData.filter(function(e){return e.sampid==item.sampid});

      // var detail=fil[0]

      // for (var i in detail.detectdata){
      //     var temjson={}
      //     temjson['mname']=detail.detectdata[i].mname;
      //     temjson['dectval']=detail.detectdata[i].mval;
      //     temjson['mmax']=detail.detectdata[i].resdval;
      //     temjson['exceed']=detail.detectdata[i].exceed;
      //     this.detailData.push(temjson);
      // }

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
      this.multipleSelection = val
      // console.log(this.multipleSelection)
    },
    // assignHw() {
    //   var hws = []
    //   for (let i = 0; i < this.multipleSelection.length; i++) {
    //     hws.push(this.multipleSelection[i].quesNo)
    //   }
    //   const data = { 'coures': this.selcoures, 'homework': hws, 'admin': localStorage.getItem('userno'), 'stuclass': this.hwclass.trim(), 'hwidx': this.hwidx.trim() }
    //   assginHomeWork(data).then(response => {
    //     // this.tableData = response.data
    //     // console.log(response.data)
    //     this.$message('作业布置成功')
    //     setTimeout(() => {
    //       this.listLoading = false
    //     }, 1.5 * 1000)
    //   })
    // },
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
