<template>
  <div>
    <div>
      <el-tag class="tag-title">
        作业类型:
      </el-tag>
      <el-radio-group v-model="radio">
        <el-radio border :label="1">预习作业</el-radio>
        <el-radio border :label="2">课堂作业</el-radio>
        <el-radio border :label="3">考试试卷</el-radio>
      </el-radio-group>
    </div>
    <div v-show="radio==1?true:false" class="table">

      <div>
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
    <div v-show="radio===2?true:false" class="table">
      <div>
        <el-tag class="tag-title">
          课程选择:
        </el-tag>
        <el-radio-group v-for="item in coures1" :key="item" v-model="selcoures1">
          <el-radio border :label="item" @change="gethwofcoures1">{{ item }}</el-radio>
        </el-radio-group>
      </div>
      <div>
        <el-select v-model="hwclass1" placeholder="请选择班级">
          <el-option
            v-for="item in classes1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input v-model="hwidx1" placeholder="输入作业索引" class="handle-input mr10" />
        <!-- <el-button icon="el-icon-edit">开放作业</el-button>
        <el-button icon="el-icon-edit">关闭作业</el-button> -->
        <el-input v-model="hwtext1" placeholder="" class="handle-input mr10" />
        <el-button type="warning" icon="el-icon-edit" @click="assignHw1">布置作业</el-button>
        <br>
        <el-radio-group v-for="item in hwnum1" :key="item" v-model="selhw1">
          <el-radio border :label="item" @change="changehw1">作业{{ item }}</el-radio>
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
        <el-radio-group v-for="item in hwnum1" :key="item" v-model="selhw1">
          <el-radio border :label="item" @change="changehw1">作业{{ item }}</el-radio>
        </el-radio-group>
      </div>
      <div class="container">
        <el-button icon="el-icon-edit" @click="addQuestion1">新建题目</el-button><br>
        <div class="handle-box">
          <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
          <!-- <el-select v-model="select_cate" placeholder="筛选抗生素" class="handle-select mr10">
                      <el-option key="1" label="链霉素" value="链霉素"></el-option>
                      <el-option key="2" label="甲硝唑" value="甲硝唑"></el-option>
                  </el-select> -->
          <!-- <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" /> -->
          <!-- <el-button   type="primary" icon="search" @click="search">搜索</el-button>  -->
        </div>
        <el-table ref="multipleTable1" :data="tableData1" border class="table" @selection-change="handleSelectionChange1">
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
              <el-button type="text" icon="el-icon-edit" @click="handleHomework1(scope.$index, scope.row)">题目详情</el-button>
              <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <!-- <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                  </el-pagination> -->
          <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize1" :total="50" style="float:right;" @size-change="handleSizeChange1" @current-change="handleCurrentChange1" />
        </div>
      </div>
      <!-- 编辑弹出框 -->
      <el-dialog :visible.sync="editVisible1" width="50%">
        <el-container>
          <el-header style="text-align: left; font-size: 16px">
            <span>作业详细信息</span>
          </el-header>
          <el-main>
            <el-table :data="detailData1" border class="table">
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
      <el-dialog title="提示" :visible.sync="delVisible1" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="deleteRow1">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-show="radio===3?true:false" class="table">
      <div>
        <!-- <div style="color:black;font:bold 50px 宋体;;text-align:center">题库</div> -->
        <el-tag class="tag-title">
          课程选择:
        </el-tag>
        <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
          <el-radio border :label="item" @change="gethwofcoures">{{ item }}</el-radio>
        </el-radio-group><br>
        <el-tag class="tag-title">
          任务选择:
        </el-tag>
        <el-radio-group v-model="selmis">
          <el-radio border label="hw" @change="selMission">作业任务</el-radio>
          <el-radio border label="exam" @change="selMission">试卷任务</el-radio>
        </el-radio-group>
      </div>
      <div v-show="!misEnable">
        <div class="block">
          <!-- <el-input v-model="hwclass" placeholder="输入班级" class="handle-input mr10" /> -->
          <el-button icon="el-icon-edit" type="success" @click="addNewExam">新建试卷</el-button>
          <el-button icon="el-icon-edit" type="danger" @click="delBaseExam">删除库内试卷</el-button>
          <el-dialog
            title="提示"
            :visible.sync="examNameDialog"
            width="30%"
          >
            <el-input v-model="examName" placeholder="请输入试卷名称" />
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="examNameConfirm">确 定</el-button>
            </span>
          </el-dialog>
          <el-select v-model="examclass" placeholder="请选择班级">
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
            placeholder="选择考试开始时间"
          />
          <!-- <el-radio-group v-model="selexammodel">
            <el-radio border label="1">试卷总时间</el-radio>
            <el-input v-model="examTotalTime" class="handle-input mr10" placeholder="考场时间" />
            <el-radio border label="2">按题目时间</el-radio>
          </el-radio-group> -->
          <el-input v-model="examTotalTime" class="handle-input mr10" placeholder="考场时间" />
          <el-button type="danger" icon="el-icon-edit" @click="assignExam">发布试卷到考场</el-button>
          <br>
          <el-radio-group v-for="item in examnum" :key="item" v-model="examidx">
            <el-radio border :label="item" @change="changeExam">试卷{{ item }}</el-radio>
          </el-radio-group>
        </div>
        <div style="color:black;font:bold 50px 宋体;;text-align:center">{{ examNameCon }}</div>
        <br>
        <el-row :gutter="8">
          <el-col :span="10">
            <el-button icon="el-icon-edit" type="warning" @click="addBigQues">新建大题</el-button>
            <el-button type="primary" @click="examPreview">试卷预览</el-button>
            <el-button type="danger" @click="confirmGen">确认生成</el-button>
            <div style="color:red;font:bold 30px 宋体;text-align:left">总分：{{ totalScore }}分</div>
            <div v-for="(item,index) in bigQues" :key="index">
              <br>
              <el-input v-model="item.quesName" class="handle-input mr10" />
              <el-input v-model="item.quesScore" disabled style="width:80px" />
              <el-input v-model="item.quesTime" placeholder="请在此输入题目要求！！！" style="width:60%" />
              <el-button type="warning" @click="chooseQues(index)">选择题目</el-button>
              <el-button type="success" @click="findQuestion(index)">查看</el-button>
              <el-button type="danger" @click="delQuestion(index)">删除题目</el-button>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="bg-purple-dark">
              <el-button type="success" @click="confirmQuestion">确定选择</el-button>
              <div style="color:blue;font:bold 20px 宋体;text-align:left">{{ tempScore }}分</div>
              <vxe-table
                ref="multipleTable"
                :data="tableData"
                border
                class="table"
                :edit-config="{trigger: 'click', mode: 'cell'}"
                :checkbox-config="{labelField: 'name', strict: true, checkMethod: checkMethod3}"
                @edit-actived="editActivedEvent"
                @edit-closed="editClosedEvent"
                @checkbox-change="handleSelectionChange"
                @checkbox-all="handleSelectionChange"
              >
                <vxe-table-column type="checkbox" width="55" align="center" />
                <vxe-table-column type="seq" title="序号" width="55" />
                <vxe-table-column field="quesSel" width="55" sortable title="已选" />
                <vxe-table-column field="quesNo" width="55" sortable title="题号" />
                <!-- <el-table-column prop="queshw" width="55" sortable label="题目分布" /> -->
                <vxe-table-column field="score" width="55" sortable title="分值" :edit-render="{name: 'input', autoselect: true}" />
                <!-- <vxe-table-column field="time" width="55" sortable title="分钟" :edit-render="{name: 'input', autoselect: true}" /> -->
                <vxe-table-column field="question" title="题干" sortable />
                <!-- <el-table-column prop="answer" label="答案" />
                <el-table-column prop="knowledge" sortable label="知识点" /> -->
                <vxe-table-column title="详细信息" width="100" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="handleHomework(scope.$index, scope.row)">题目详情</el-button>
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
          </el-col>
        </el-row>
      </div>
      <!-- 编辑弹出框 -->
      <el-dialog :visible.sync="examPreVisible" width="80%">
        <div style="color:green;font:bold 50px 宋体;;text-align:center">试卷预览</div>
        <mavon-editor v-model="examContent" :editable="false" height="300px" />
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
  </div>
</template>

<script>
const tabled = [{ userno: '2001', username: '李四', stuClass: '软件开发', stuHw: '98' }, { userno: '2001', username: '张三', stuClass: '软件开发', stuHw: '99' }]
// import 'vue-element-extends/lib/index.css'
// import { ElxEditable, ElxEditableColumn } from 'vue-element-extends'

import { getQuesBase, assginHomeWork, generateExam, getExam, delExam, assignStuExam } from '@/api/hwexp'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { getallhws } from '@/api/hwexp'
import { getknowlib, assignyx } from '@/api/hwexp'

export default {
  name: 'Hwtable',
  components: { mavonEditor },
  data() {
    return {
      radio: 1,
      // 预习
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
      idx2: -1,
      // 课堂
      // url: './vuetable.json',
      hwclass1: '',
      hwidx1: '',
      tableData1: tabled,
      coures1: '',
      selcoures1: '',
      detailData1: [],
      cur_page1: 1,
      pagesize1: 20,
      multipleSelection1: [],
      select_cate1: '',
      select_word1: '',
      del_list1: [],
      is_search1: false,
      editVisible1: false,
      delVisible1: false,
      dataBak1: [],
      hwinfo1: [],
      hwnum1: '',
      hwtext1: '',
      selhw1: '',
      allhwdata1: [],
      classes1: [],

      form1: {
        name: '',
        date: '',
        address: ''
      },
      idx1: -1,
      // 考试
      totalScore: 0,
      examName: '',
      examNameCon: '',
      examPreVisible: false,
      examNameDialog: false,
      examclass: '',
      examYmdTime: '',
      examTotalTime: 120,
      examidx: 1,
      misEnable: true,
      selmis: 'exam',
      selexammodel: '1',
      examnum: 0,
      examContent: '',
      examtime: '',
      tableTempData: [],
      quesSel: '',
      checkBoxEnable: true,
      tempScore: 0,
      tempTime: 0,
      quesTimeStamp: 0,
      bigQues: [],
      quesNum: 0,
      quesIdx: 0,
      bigQuesBak: [],

      hwclass: '',
      hwidx: '',
      tableData: [],
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
      selhw: 1,
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
    },
    // 课堂作业
    data1() {
      return this.tableData1.filter((d) => {
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
    },
    // 预习作业
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

  },
  created() {
    // this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
  },
  mounted() {
    // 预习
    this.coures2 = JSON.parse(localStorage.getItem('coures'))
    if (localStorage.getItem('type') === 'tea') {
      this.teashow2 = true
    } else {
      this.teashow2 = false
    }
    // console.log(this.coures)
    this.selcoures2 = this.coures2[0]
    this.getData2()
    // 课堂
    this.coures1 = JSON.parse(localStorage.getItem('coures'))
    // console.log(this.coures)
    this.selcoures1 = this.coures1[0]
    this.getData1()
    // 考试
    this.coures = JSON.parse(localStorage.getItem('coures'))
    if (!this.coures) {
      alert('温馨提示：出现了一个问题，请点击 “我的主页” ')
    }
    // console.log(this.coures)
    this.selcoures = this.coures[0]
    this.getData()
    if (this.selmis === 'exam') {
      this.misEnable = false
      this.changeExam()
    }
  },
  methods: {
    // 预习
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
      console.log(data)
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
    },
    // 课堂
    changehw1() {
      this.tableData1 = this.allhwdata1[parseInt(this.selhw1) - 1]
    },
    gethwofcoures1() {
    //   console.log(this.selcoures)
      this.getData1()
    },
    toggleSelection1(rows) {
      if (rows) {
        // console.log(rows)
        rows.forEach(row => {
          this.$refs.multipleTable1.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable1.clearSelection()
      }
    },
    handleSizeChange1(size) {
      this.pagesize1 = size
    },
    // 分页导航
    handleCurrentChange1(val) {
      this.cur_page1 = val
      this.getData1()
    },
    // 获取 easy-mock 的模拟数据
    getData1() {
      const that = this
      if (localStorage.getItem('selclass')) {
        that.expclass1 = localStorage.getItem('selclass')
      }
      // let data={'site':localStorage.getItem('site')};
      const data = { 'size': that.pagesize1, 'page': that.cur_page1, 'coures': that.selcoures1, 'userno': localStorage.getItem('userno') }
      //   this.coures = localStorage.getItem('coures')
      //   console.log(this.coures)
      that.hwnum1 = ''
      getQuesBase(data).then(response => {
        that.tableData1 = response.data.question
        that.hwinfo1 = response.data.hwcontent

        setTimeout(() => {
          that.listLoading = false
        }, 1.5 * 1000)
      })

      getallhws(data).then(response => {
        // console.log(response.data)
        that.allhwdata1 = response.data.allhws
        that.classes1 = response.data.classes
        that.hwnum1 = that.allhwdata1.length
        // console.log(that.hwnum)
        if (that.hwnum1 === '0') {
          that.hwnum1 = ''
        }

        setTimeout(() => {
          that.listLoading = false
        }, 1.5 * 1000)
      })

      // for()
    },
    search1() {
      this.is_search1 = true
      if (this.select_word1) {
        var lily = this.dataBak1.filter((p) => {
          return p.season === this.select_word1
        })
        this.tableData1 = lily
      } else this.tableData1 = this.dataBak1
    },
    async handleHomework1(index, row) {
      localStorage.setItem('quesNo', row.quesNo)
      localStorage.setItem('selcoures', this.selcoures1)

      this.$router.replace('quesbase')
      this.$message('编辑题号为： ' + row.quesNo)
    },
    async addQuestion1(index, row) {
      localStorage.setItem('selcoures', this.selcoures1)
      this.$router.replace('quesbase')
      localStorage.setItem('quesNo', '0')
    },
    async handleEdit1(index, row) {
      this.idx1 = index
      this.detailData1 = []

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

      this.editVisible1 = true
    },
    handleDelete1(index, row) {
      this.idx1 = index
      this.delVisible1 = true
    },
    delAll1() {
      const length = this.multipleSelection1.length
      let str = ''
      this.del_list1 = this.del_list1.concat(this.multipleSelection1)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection1[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection1 = []
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val
      // console.log(this.multipleSelection)
    },
    assignHw1() {
      var hws = []
      for (let i = 0; i < this.multipleSelection1.length; i++) {
        hws.push(this.multipleSelection1[i].quesNo)
      }
      const data = { 'coures': this.selcoures1, 'homework': hws, 'admin': localStorage.getItem('userno'), 'stuclass': this.hwclass1.trim(), 'hwidx': this.hwidx1.trim() }
      assginHomeWork(data).then(response => {
        // this.tableData = response.data
        // console.log(response.data)
        this.$message('作业布置成功')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 保存编辑
    saveEdit1() {
      this.$set(this.tableData1, this.idx1, this.form1)
      this.editVisible1 = false
      this.$message.success(`修改第 ${this.idx1 + 1} 行成功`)
    },
    // 确定删除
    deleteRow1() {
      this.tableData1.splice(this.idx1, 1)
      this.$message.success('删除成功')
      this.delVisible1 = false
    },
    // 考试
    delBaseExam() {
      const that = this
      that.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { 'size': that.pagesize, 'page': that.cur_page, 'coures': that.selcoures, 'userno': localStorage.getItem('userno'), 'examidx': this.examidx }
        delExam(data).then(response => {
          that.$message.success(response.data)
          that.examidx = 1
          that.changeExam()

          setTimeout(() => {
            that.listLoading = false
          }, 1.5 * 1000)
        })
      }).catch(() => {
      })
    },
    changeExam() {
      const that = this
      const data = { 'size': that.pagesize, 'page': that.cur_page, 'coures': that.selcoures, 'userno': localStorage.getItem('userno'), 'examidx': this.examidx }
      //   this.coures = localStorage.getItem('coures')
      //   console.log(this.coures)
      that.tableData = []
      that.examnum = ''
      this.tempScore = 0
      getExam(data).then(response => {
        // console.log(response.data)
        if (response.data.examnum) {
          that.examnum = response.data.examnum
        }
        that.bigQues = response.data.info
        this.totalScore = 0
        for (let i = 0; i < this.bigQues.length; i++) {
          this.totalScore = this.totalScore + this.bigQues[i].quesScore
        }

        that.examName = that.bigQues[0].examName
        for (let i = 0; i < this.tableTempData.length; i++) {
          this.tableTempData[i].quesSel = ''
          for (let j = 0; j < this.bigQues.length; j++) {
            for (let k = 0; k < this.bigQues[j].quesmany.length; k++) {
              if (this.tableTempData[i].quesNo === this.bigQues[j].quesmany[k].quesNo) {
                this.tableTempData.quesSel = j
              }
            }
          }
        }

        setTimeout(() => {
          that.listLoading = false
        }, 1.5 * 1000)
      })
    },
    addNewExam() {
      this.examNameDialog = true
      this.examName = ''
      // console.log(this.tableTempData)
    },
    examNameConfirm() {
      this.examNameDialog = false
      this.examidx = this.examnum + 1
      // console.log(this.examidx)
      this.examNameCon = this.examName
      this.bigQues = []
      this.quesNum = 0
      this.$message.success('可以建立试卷了！！！')
    },
    selMission() {
      if (this.selmis === 'hw') {
        this.misEnable = true
        this.getData()
      } else {
        this.tempScore = 0
        this.misEnable = false
        this.getData()
      }
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
    examPreview() {
      this.examPreVisible = true
      let mavonstr = '# ' + this.selcoures + '  ' + this.examNameCon + '试卷' + '\n'
      // console.log(this.bigQues)
      for (let i = 0; i < this.bigQues.length; i++) {
        mavonstr = mavonstr + '## ' + '(' + this.bigQues[i].quesScore + '分' + ')' + this.bigQues[i].quesName + '  ' + this.bigQues[i].quesTime + '\n'
        if ('quesmany' in this.bigQues[i]) {
          for (let j = 1; j <= this.bigQues[i].quesmany.length; j++) {
          // console.log(this.bigQues[i].quesmany)
            mavonstr = mavonstr + '(' + this.bigQues[i].quesmany[j - 1].score + '分' + ') ' + j + '、' + this.bigQues[i].quesmany[j - 1].question + '\n'
          }
        } else {
          mavonstr = mavonstr + '第 ' + (i + 1).toString() + ' 大题没有小题' + '\n'
        }
      }
      // console.log(mavonstr)
      this.examContent = mavonstr
    },
    addBigQues() {
      this.quesNum = this.quesNum + 1
      const quesinfo = {}
      quesinfo.examName = this.examNameCon
      quesinfo.quesName = '第' + this.quesNum.toString() + '大题'
      quesinfo.quesScore = 10
      quesinfo.quesTime = ''
      this.bigQues.push(quesinfo)
      this.tempScore = 0
      this.tempTime = 0
    },
    delQuestion(idx) {
      const that = this
      that.$confirm('确定要删除这个大题吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const seltemp = []
        for (let i = 0; i < this.tableTempData.length; i++) {
          for (let k = 0; k < this.bigQues[idx].quesmany.length; k++) {
            if (this.tableTempData[i].quesNo === this.bigQues[idx].quesmany[k].quesNo) {
              this.tableTempData[i].quesSel = ''
              seltemp.push(this.tableTempData[i])
            }
          }
        }
        that.bigQues.splice(idx, 1,)
        this.totalScore = 0
        for (let i = 0; i < this.bigQues.length; i++) {
          this.totalScore = this.totalScore + this.bigQues[i].quesScore
        }
        this.$refs.multipleTable.clearCheckboxRow(seltemp, true)
        // this.tableData = this.tableTempData
      }).catch(() => {
      })
    },
    chooseQues(idx) {
      this.checkBoxEnable = true
      this.quesIdx = idx
      this.tempScore = 0
      this.tempTime = 0
      this.$refs.multipleTable.clearCheckboxRow()
      // console.log(this.bigQues)
      const seltemp = []

      for (let i = 0; i < this.tableTempData.length; i++) {
        // this.tableTempData[i].quesSel = ''
        for (let j = 0; j < this.bigQues.length; j++) {
          if ('quesmany' in this.bigQues[j]) {
            for (let k = 0; k < this.bigQues[j].quesmany.length; k++) {
            // console.log(this.bigQues[j].quesmany)
              if (this.tableTempData[i].quesNo === this.bigQues[j].quesmany[k].quesNo) {
                this.tableTempData[i].quesSel = this.bigQues[j].quesmany[k].quesSel

                if (this.tableTempData[i].quesSel === this.quesIdx + 1) {
                  this.tempScore = this.tempScore + parseInt(this.bigQues[this.quesIdx].quesmany[k].score)
                  seltemp.push(this.tableTempData[i])
                }
              }
            }
          }
        }
      }

      // console.log(this.quesIdx, seltemp)
      this.$refs.multipleTable.setCheckboxRow(seltemp, true)

      this.tableData = this.tableTempData
      // console.log(this.tableTempData)
    },
    checkMethod3() {
      return this.checkBoxEnable
    },
    findQuestion(idx) {
      this.tableData = this.bigQues[idx].quesmany
      this.tempScore = 0
      var seltemp = []
      for (let i = 0; i < this.tableData.length; i++) {
        // this.tableTempData[i].quesSel = ''
        for (let j = 0; j < this.bigQues.length; j++) {
          if ('quesmany' in this.bigQues[j]) {
            for (let k = 0; k < this.bigQues[j].quesmany.length; k++) {
            // console.log(this.bigQues[j].quesmany)
              if (this.tableData[i].quesNo === this.bigQues[j].quesmany[k].quesNo) {
                this.tableData[i].quesSel = this.bigQues[j].quesmany[k].quesSel

                if (this.tableData[i].quesSel === idx + 1) {
                  this.tempScore = this.tempScore + parseInt(this.bigQues[idx].quesmany[k].score)
                  seltemp.push(this.tableData[i])
                }
              }
            }
          }
        }
      }
      this.$refs.multipleTable.setCheckboxRow(seltemp, true)

      // this.checkBoxEnable = false
      // return false
      // console.log(idx, this.bigQues)
    },
    assignExam() {
      if (this.selexammodel === '1') {
        if (this.examYmdTime !== '') {
          // var sftime = { 'startTime': this.timestampToTime(this.examYmdTime), 'endTime': this.timestampToTime((parseInt(this.examYmdTime)) + this.examTotalTime * 1000 * 60).toString() }
          var sftime = { 'startTime': this.examYmdTime.toString(), 'endTime': (parseInt(this.examYmdTime) + this.examTotalTime * 1000 * 60).toString() }
          // console.log(this.examYmdTime)

          this.bigQuesBak = [...this.bigQues]

          for (let i = 0; i < this.bigQuesBak.length; i++) {
            // console.log(this.bigQuesBak[i])
            for (let j = 0; j < this.bigQuesBak[i].quesmany.length; j++) {
              this.bigQuesBak[i].quesmany[j].answer = ''
            }
          }
          this.bigQuesBak.splice(this.bigQuesBak.length, 1, sftime)
          // console.log(this.bigQues.pop())
          // console.log(this.bigQues)
          const data = { 'size': this.pagesize, 'page': this.cur_page, 'coures': this.selcoures, 'userno': localStorage.getItem('userno'), 'examidx': this.examidx, 'stuclass': this.examclass, 'examwork': this.bigQuesBak }

          assignStuExam(data).then(response => {
            this.$message.success(response.data)

            setTimeout(() => {
              this.listLoading = false
            }, 1.5 * 1000)
          })
        }
      }
    },

    changehw() {
      this.tableData = this.allhwdata[parseInt(this.selhw) - 1]
    },
    gethwofcoures() {
    //   console.log(this.selcoures)
      this.tempScore = 0
      this.examidx = 1
      this.tableData = []
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
      // this.getData()
    },
    getQuesData() {
      // const that = this
      // let data={'site':localStorage.getItem('site')};
      const data = { 'size': this.pagesize, 'page': this.cur_page, 'coures': this.selcoures, 'userno': localStorage.getItem('userno') }
      //   this.coures = localStorage.getItem('coures')
      //   console.log(this.coures)

      getQuesBase(data).then(response => {
        this.tableTempData = response.data.question
        // console.log(this.tableTempData)

        // this.tableData = this.tableTempData
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    getData() {
      const that = this
      // let data={'site':localStorage.getItem('site')};
      const data = { 'size': that.pagesize, 'page': that.cur_page, 'coures': that.selcoures, 'userno': localStorage.getItem('userno'), 'examidx': this.examidx }
      //   this.coures = localStorage.getItem('coures')
      //   console.log(this.coures)
      that.examnum = ''
      getExam(data).then(response => {
        // console.log(response.data)
        if (response.data !== 'error') {
          that.examnum = response.data.examnum
          that.bigQues = response.data.info
          this.totalScore = 0
          for (let i = 0; i < this.bigQues.length; i++) {
            this.totalScore = this.totalScore + this.bigQues[i].quesScore
          }
          that.examNameCon = that.bigQues[0].examName
          that.classes = response.data.classes
        } else {
          that.$message.error('还没有试卷！')
          that.classes = []
        }
        setTimeout(() => {
          that.listLoading = false
        }, 1.5 * 1000)
      })

      that.getQuesData()
      // getallhws(data).then(response => {
      //   // console.log(response.data)
      //   that.allhwdata = response.data.allhws
      //   that.classes = response.data.classes
      //   that.hwnum = that.allhwdata.length
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
    confirmGen() {
      // for (let i = 0; i < this.bigQues.length; i++) {
      //   for (let j = 0; j < this.bigQues[i].quesmany.length; j++) {
      //     // delete this.bigQues[i].quesmany[j].answer
      //     // delete this.bigQues[i].quesmany[j].knowledge
      //     // delete this.bigQues[i].quesmany[j].quesSel
      //     // delete this.bigQues[i].quesmany[j].question
      //     // delete this.bigQues[i].quesmany[j]._XID
      //   }
      // }
      // console.log('bigQues', this.bigQues)

      if (this.bigQues) {
        for (let i = 0; i < this.bigQues.length; i++) {
          if (!this.bigQues[i].hasOwnProperty('quesmany')) {
            alert('注意！！！！第 ' + (i + 1).toString() + ' 大题是空题')
            this.bigQues[i].quesmany = []
          }
        }
        // console.log('bigQues', this.bigQues)
        const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'exam': this.bigQues, 'examidx': this.examidx }

        generateExam(data).then(response => {
          this.examnum = response.data.examnum
          this.$message.success(response.data.info)

          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    },
    confirmQuestion() {
      const quesinfo = {}
      // console.log('ok')
      let temp = {}

      quesinfo.quesScore = this.tempScore
      // quesinfo.quesTime = this.tempTime

      quesinfo.quesmany = this.multipleSelection
      temp = this.bigQues[this.quesIdx]// + quesinfo.quesmany
      // console.log(temp,quesinfo)
      this.bigQues.splice(this.quesIdx, 1, Object.assign(temp, quesinfo))
      // this.findQuestion(this.quesIdx)
      for (let i = 0; i < this.multipleSelection.length; i++) {
        for (let j = 0; j < this.tableTempData.length; j++) {
          if ((this.tableTempData[j].quesNo === this.multipleSelection[i].quesNo) || (this.tableTempData[j].quesSel === this.quesIdx + 1)) {
            this.tableTempData[j].quesSel = ''
          }
        }
      }
      for (let i = 0; i < this.multipleSelection.length; i++) {
        for (let j = 0; j < this.tableTempData.length; j++) {
          if (this.tableTempData[j].quesNo === this.multipleSelection[i].quesNo) {
            this.tableTempData[j].quesSel = this.quesIdx + 1
          }
        }
      }
      this.totalScore = 0
      for (let i = 0; i < this.bigQues.length; i++) {
        this.totalScore = this.totalScore + this.bigQues[i].quesScore
      }
      // console.log('table', this.tableTempData)
    },
    editActivedEvent({ row, column }) {
      // console.log(row, column)
      this.tempScore = this.tempScore - row.score
      this.tempTime = this.tempTime - row.time
    },
    editClosedEvent({ row, column }) {
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.tempScore = this.tempScore + parseInt(this.multipleSelection[i].score)
        this.tempTime = this.tempTime + parseInt(this.multipleSelection[i].time)
      }
    },
    handleSelectionChange({ checked, records, rowIndex }) {
      this.tempScore = 0
      this.tempTime = 0
      this.multipleSelection = records

      // console.log(checked ? '勾选事件' : '取消事件', records)
      // console.log(this.tempScore, this.multipleSelection)
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.tempScore = this.tempScore + parseInt(this.multipleSelection[i].score)
        this.tempTime = this.tempTime + parseInt(this.multipleSelection[i].time)
      }
      // console.log(this.tempScore, this.multipleSelection)
    },
    assignHw() {
      var hws = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        hws.push(this.multipleSelection[i].quesNo)
      }
      const data = { 'coures': this.selcoures, 'homework': hws, 'admin': localStorage.getItem('userno'), 'stuclass': this.hwclass.trim(), 'hwidx': this.hwidx.trim() }(data).then(response => {
        // this.tableData = response.data
        this.$message('作业布置成功')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
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
    .el-radio{
      margin: 0;
    }

    .el-radio.is-bordered + .el-radio.is-bordered{
      margin: 0;
    }
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 120px;
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
    .bg-purple-dark {
    background: #99a9bf;
  }
</style>
