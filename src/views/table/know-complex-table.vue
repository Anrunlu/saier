<template>
  <div class="table">

    <div>
      <div style="color:black;font:bold 50px 宋体;;text-align:center">知识技能库</div>
      <el-tag class="tag-title">
        课程选择:
      </el-tag>
      <el-radio-group v-for="item in coures2" :key="item" v-model="selcoures2">
        <el-radio border :label="item" @change="gethwofcoures2">{{ item }}</el-radio>

      </el-radio-group>
    </div>

    <div v-show="teashow2">

      <!-- <el-input v-model="hwclass" placeholder="输入班级" class="handle-input mr10" /> -->
      <el-select v-model="hwclass2" placeholder="请选择班级">
        <el-option
          v-for="item in classes2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input v-model="hwidx2" placeholder="输入作业索引" class="handle-input mr10" />
      <el-button icon="el-icon-edit" @click="assignYuxi2">布置预习作业</el-button>
      <!-- <el-button icon="el-icon-edit">开放作业</el-button>
      <el-button icon="el-icon-edit">关闭作业</el-button> -->
      <!-- <el-button icon="el-icon-edit" @click="addQuestion">新建题目</el-button>--> <br>
      <el-input v-model="yuxitext2" placeholder="" />
      <!-- <el-radio-group v-for="item in hwnum" :key="item" v-model="selhw">
        <el-radio border :label="item" @change="changehw">作业{{ item }}</el-radio>

      </el-radio-group> -->

    </div>

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
      <el-table ref="multipleTable2" :data="tableData2" border class="table" @selection-change="handleSelectionChange2">
        <el-table-column type="selection2" width="55" align="center" />
        <el-table-column label="序号" width="55">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column prop="kname" width="155" sortable label="知识点" />
        <!-- <el-table-column prop="queshw" width="55" sortable label="题目分布" /> -->
        <el-table-column prop="relative" width="255" sortable label="相关知识点" />
        <el-table-column prop="type" width="55" label="类型" sortable />
        <el-table-column prop="chapter" width="155" label="章节" />
        <el-table-column prop="gloss" sortable label="简介" />
        <el-table-column prop="video" label="视频网址" />

        <!-- <el-table-column label="查看图谱" prop="kid" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleHomework(scope.$index, scope.row)">题目详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagination">
        <!-- <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination> -->
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize2" :total="50" style="float:right;" @size-change="handleSizeChange2" @current-change="handleCurrentChange2" />

      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog :visible.sync="editVisible2" width="50%">
      <el-container>
        <el-header style="text-align: left; font-size: 16px">

          <span>作业详细信息</span>
        </el-header>

        <el-main>
          <el-table :data="detailData2" border class="table">
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
    <el-dialog title="提示" :visible.sync="delVisible2" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const tabled = [{ userno: '2001', username: '李四', stuClass: '软件开发', stuHw: '98' }, { userno: '2001', username: '张三', stuClass: '软件开发', stuHw: '99' }]

import { getknowlib, assignyx } from '@/api/hwexp'
export default {
  name: 'Hwtable',
  data() {
    return {
      url: './vuetable.json',
      hwclass2: '',
      hwidx2: '',
      tableData2: tabled,
      coures2: '',
      selcoures2: '',
      detailData2: [],
      cur_page2: 1,
      pagesize2: 20,
      multipleSelection2: [],
      select_cate2: '',
      select_word2: '',
      del_list2: [],
      is_search2: false,
      editVisible2: false,
      delVisible2: false,
      dataBak2: [],
      hwinfo2: [],
      hwnum2: 0,
      hwtext2: '',
      selhw2: '',
      allhwdata2: [],
      yuxitext2: '',
      teashow2: false,
      classes2: [],

      form2: {
        name: '',
        date: '',
        address: ''
      },
      idx2: -1
    }
  },
  computed: {
    data2() {
      return this.tableData2.filter((d) => {
        let is_del = false

        for (let i = 0; i < this.del_list2.length; i++) {
          if (d.name === this.del_list2[i].name) {
            is_del = true
            break
          }
        }
        if (!is_del) {
          if (d.userno.indexOf(this.select_cate) > -1 &&
                            (d.username.indexOf(this.select_word2) > -1 ||
                                d.stuClass.indexOf(this.select_word2) > -1) ||
                                d.stuHw.indexOf(this.select_word2) > -1
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
   this.coures2 = JSON.parse(localStorage.getItem('coures'))
    if (localStorage.getItem('type') === 'tea') {
      this.teashow2 = true
    } else {
      this.teashow2 = false
    }
    // console.log(this.coures)
    this.selcoures2 = this.coures2[0]
    this.getData2()
  },
  methods: {
    changehw2() {
      this.tableData2 = this.allhwdata2[parseInt(this.selhw2) - 1]
      console.log(this.tableData2)
      // var info
      // info = this.hwinfo[parseInt(this.selhw) - 1]
      // this.hwtext = info.toString()
    },
    gethwofcoures2() {
    //   console.log(this.selcoures)
      this.getData2()
    },
    toggleSelection2(rows) {
      if (rows) {
        // console.log(rows)
        rows.forEach(row => {
          this.$refs.multipleTable2.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable2.clearSelection()
      }
    },
    handleSizeChange2(size) {
      this.pagesize2 = size
    },
    // 分页导航
    handleCurrentChange2(val) {
      this.cur_page2 = val
      this.getData2()
    },
    // 获取 easy-mock 的模拟数据
    getData2() {
      const that = this
      // let data={'site':localStorage.getItem('site')};
      const data = { 'coures': that.selcoures2, 'userno': localStorage.getItem('userno') }
      //   this.coures = localStorage.getItem('coures')
      //   console.log(this.coures)
      that.hwnum = ''
      getknowlib(data).then(response => {
        that.tableData2 = response.data.message
        that.classes2 = response.data.classes
        that.hwinfo2 = response.data.hwcontent

        setTimeout(() => {
          that.listLoading = false
        }, 1.5 * 1000)
      })

      // getallhws(data).then(response => {
      //   // console.log(response.data)
      //   that.allhwdata = response.data
      //   that.hwnum = that.allhwdata.length.toString()
      //   // console.log(that.hwnum)
      //   if (that.hwnum === '0') {
      //     that.hwnum = ''
      //   }

      //   setTimeout(() => {
      //     that.listLoading = false
      //   }, 1.5 * 1000)
      // })

      // for()
    },
    search2() {
      this.is_search2 = true
      if (this.select_word2) {
        var lily = this.dataBak2.filter((p) => {
          return p.season === this.select_word2
        })
        this.tableData2 = lily
      } else this.tableData2 = this.dataBak2
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    async handleHomework2(index, row) {
      localStorage.setItem('quesNo', row.quesNo)
      localStorage.setItem('selcoures', this.selcoures2)

      this.$router.replace('quesbase')
      this.$message('编辑题号为： ' + row.quesNo)
    },
    async addQuestio2n(index, row) {
      localStorage.setItem('selcoures', this.selcoures2)
      this.$router.replace('quesbase')
      localStorage.setItem('quesNo', '0')
    },
    async handleEdit2(index, row) {
      this.idx2 = index
      this.detailData2 = []

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

      this.editVisible2 = true
    },
    handleDelete2(index, row) {
      this.idx2 = index
      this.delVisible2 = true
    },
    delAll2() {
      const length = this.multipleSelection2.length
      let str = ''
      this.del_list2 = this.del_list2.concat(this.multipleSelection2)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection2[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection2 = []
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val
      if (val.length !== 0) {
        var kglist = []
        for (let i = 0; i < this.multipleSelection2.length; i++) {
          if (this.multipleSelection2[i].relative) {
            var kgs = this.multipleSelection2[i].relative.trim().split(' ')
            if (kgs.length) {
              for (var kg in kgs) {
                if (!kglist.includes(kgs[kg])) {
                  kglist.push(kgs[kg])
                  this.yuxitext2 = kglist.toString()
                }
              }
            }
          }
        }
        // console.log(val)
      } else {
        this.yuxitext2 = ''
      }
    },
    assignYuxi2() {
      const data = { 'coures': this.selcoures2, 'yuxiwork': this.yuxitext2, 'admin': localStorage.getItem('userno'), 'stuclass': this.hwclass2.trim(), 'hwidx': this.hwidx2.trim() }
      //   console.log(data)
      assignyx(data).then(response => {
        // this.tableData = response.data
        this.$message('作业布置成功')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 保存编辑
    saveEdit2() {
      this.$set(this.tableData2, this.idx2, this.form2)
      this.editVisible2 = false
      this.$message.success(`修改第 ${this.idx2 + 1} 行成功`)
    },
    // 确定删除
    deleteRow2() {
      this.tableData.splice(this.idx2, 1)
      this.$message.success('删除成功')
      this.delVisible2 = false
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
