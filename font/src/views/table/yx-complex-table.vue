<template>
  <div class="dashboard-editor-container">
    <div>
      <el-tag class="tag-title">
        作业类型:
      </el-tag>
      <el-radio-group v-model="radio">
        <el-radio border :label="1">预习作业</el-radio>
        <el-radio border :label="2">课堂作业</el-radio>
        <el-radio border :label="3">实验</el-radio>
        <el-radio border :label="4">考试试卷</el-radio>
      </el-radio-group>
    </div>
    <!-- 预习作业   -->
    <div v-show="radio===1?true:false">
      <!-- <github-corner class="github-corner" /> -->
      <div>
        <el-tag class="tag-title">
          课程选择:
        </el-tag>
        <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
          <el-radio border :label="item" @change="getData">{{ item }}</el-radio>
        </el-radio-group>
      </div>
      <div>
        <!-- <el-button type="primary" icon="upload" style="bottom: 15px; " @click="yuxiinfo">
          查看预习情况
        </el-button> -->
        <el-radio-group v-for="item in yxnum" :key="item" v-model="selyx">
          <el-radio border :label="item" @change="yuxiinfo">预习{{ item }}</el-radio>
        </el-radio-group>
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
          <!-- <el-table-column prop="stuHwScore" label="作业成绩" sortable />
          <el-table-column label="作业批改" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleHomework(scope.$index, scope.row)">开始批改</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <!-- <div class="pagination">
          <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                  </el-pagination>
          <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" :total="50" style="float:right;" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div> -->
      </div>
      <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" />-->
      <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <bar-chart />
      </el-row> -->
      <div id="yuxibar" class="chart-container" />
      <!-- <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart />
          </div>
        </el-col>
      </el-row>
       <el-row :gutter="8">
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
    <!-- 课堂作业   -->
    <div v-show="radio===2?true:false" class="table">
      <div>
        <el-tag class="tag-title">
          课程选择:
        </el-tag>
        <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
          <el-radio border :label="item" @change="coureschange">{{ item }}</el-radio>
        </el-radio-group>
      </div>
      <div>
        <el-select v-model="hwclass" placeholder="请选择班级" @change="changeClass">
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
          <el-select slot="prepend" v-model="examgradeselect" placeholder="请选择分数等级">
            <el-option label="60分以下" value="60分以下" />
            <el-option label="60分-70分" value="60分-70分" />
            <el-option label="70分-80分" value="70分-80分" />
            <el-option label="80分-90分" value="80分-90分" />
            <el-option label="90分-100分" value="90分-100分" />
          </el-select>
          <el-input v-model="examhw_comment" placeholder="请输入评语" class="handle-input mr10" />
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
        <el-table ref="multipleTable" :data="hwTableData" border class="table" @selection-change="handleSelectionChange">
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
    <!-- 实验作业   -->
    <div v-show="radio===3?true:false" class="table">
      <div>
        <el-tag class="tag-title">
          课程选择:
        </el-tag>
        <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
          <el-radio border :label="item" @change="getDataexp">{{ item }}</el-radio>
        </el-radio-group>
      </div>
      <div>
        <el-select v-model="expclass" placeholder="请选择班级" @change="expchangeClass">
          <el-option
            v-for="item in expclasses"
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
        <el-table ref="multipleTable" :data="exptableData" border class="table" @selection-change="exphandleSelectionChange">
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
              <el-button type="text" icon="el-icon-edit" @click="exphandleHomework(scope.$index, scope.row)">开始批改</el-button>
              <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <!-- <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                  </el-pagination> -->
          <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" :total="50" style="float:right;" @size-change="handleSizeChange" @current-change="exphandleCurrentChange" />
        </div>
      </div>
      <!-- 编辑弹出框 -->
      <el-dialog :visible.sync="expeditVisible" width="50%">
        <el-container>
          <el-header style="text-align: left; font-size: 16px">
            <span>作业详细信息</span>
          </el-header>
          <el-main>
            <el-table :data="expdetailData" border class="table">
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
      <el-dialog title="提示" :visible.sync="expdelVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="expdelVisible = false">取 消</el-button>
          <el-button type="primary" @click="expdeleteRow">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 考试作业   -->
    <div v-show="radio===4?true:false" class="table">
      <div>
        <el-tag class="tag-title">
          课程选择:
        </el-tag>
        <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
          <el-radio border :label="item" @change="examcoureschange">{{ item }}</el-radio>
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
        <el-select v-model="examclass" placeholder="请选择班级" @change="examchangeClass">
          <el-option
            v-for="item in examclasses"
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
        <div v-show="examsetcomment">
          <div style="margin-top: 15px;">
            <el-select slot="prepend" v-model="gradeselect" placeholder="请选择分数等级">
              <el-option label="60分以下" value="60分以下" />
              <el-option label="60分-70分" value="60分-70分" />
              <el-option label="70分-80分" value="70分-80分" />
              <el-option label="80分-90分" value="80分-90分" />
              <el-option label="90分-100分" value="90分-100分" />
            </el-select>
            <el-input v-model="hw_comment" placeholder="请输入评语" class="handle-input mr10" />
            <el-button @click="examaddcomment">添加评语 </el-button>
          </div>
          <div>
            <el-input v-model="examselallcontent" type="textarea" rows="6" placeholder="" />
          </div>
          <el-container>
            <el-main>
              <el-table border :data="examcommentData" class="table" @selection-change="examhandleSelectionChange">
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
                    <el-button type="danger" icon="el-icon-delete" @click="examhandledelcomment(scope.$index, scope.row)">删除</el-button>
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
            :data="examtableData"
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
                <vxe-button type="text" icon="el-icon-edit" @click="examhandleHomework(scope.rowIndex, scope.row)">开始批改</vxe-button>
                <!-- <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
              </template>
            </vxe-table-column>
          </vxe-table>
          <div class="pagination">
            <!-- <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                  </el-pagination> -->
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :page-size="exampagesize" :total="50" style="float:right;" @size-change="examhandleSizeChange" @current-change="examhandleCurrentChange" />
          </div>
        </div>
      </div>
      <!-- 编辑弹出框 -->
      <el-dialog :visible.sync="exameditVisible" width="50%">
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
      <el-dialog title="提示" :visible.sync="examdelVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="examdelVisible = false">取 消</el-button>
          <el-button type="primary" @click="examdeleteRow">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
import { dataForYx, getyxinfos } from '@/api/hwexp'
import echarts from 'echarts'
import { expOpenBatchSwitch, expCloseBatchSwitch, getExpList } from '@/api/hwexp'
import { getHwList, getallcomment, extendExamTime, addonecomment, delonecomment, delStuExam, hwOpenBatchSwitch, getStuExamForTea, hwCloseBatchSwitch } from '@/api/hwexp'
// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

export default {
  name: 'DashboardAdmin',
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
    // PanelGroup,
    // BarChart
    // PieChart
  },
  data() {
    return {
      radio: 1,
      // 预习
      coures: '',
      selcoures: '',
      yxnum: '',
      selyx: 1,
      tableData: [],
      knowsData: [],
      knowsStar: [],
      charSeries: [],
      // lineChartData: lineChartData.newVisitis
      // 课堂作业
      url: './vuetable.json',
      hwclass: '所有班级',
      classes: [],
      hwTableData: [],
      commentData: [],
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
      idx: -1,
      // 实验作业
      expselclass: '',
      expclass: '所有班级',
      expclasses: [],
      expswitch: '',
      expidx: '',
      exptableData: [],
      expdetailData: [],
      expcur_page: 1,
      exppagesize: 20,
      expmultipleSelection: [],
      expselect_cate: '',
      expselect_word: '',
      expdel_list: [],
      expis_search: false,
      expeditVisible: false,
      expdelVisible: false,
      expdataBak: [],

      expform: {
        name: '',
        date: '',
        address: ''
      },
      idx1: -1,
      // 考试
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
      examclasses: [],
      examidx: 1,
      examTotalNum: 1,
      examnum: 1,
      selmis: 'exam',
      examtableData: [],
      examcommentData: [],
      examdetailData: [],
      examcur_page: 1,
      exampagesize: 20,
      exammultipleSelection: [],
      examselect_cate: '',
      examselect_word: '',
      examdel_list: [],
      examis_search: false,
      exameditVisible: false,
      examdelVisible: false,
      examdataBak: [],
      examhw_class: '',
      examhw_idx: '',
      examsetcomment: false,
      examgradeselect: '',
      examhw_comment: '',
      examselallcontent: '评语',
      examform: {
        name: '',
        date: '',
        address: ''
      },
      idx2: -1
    }
  },
  computed: {
    data() {
      return this.hwTableData.filter((d) => {
        let is_del = false

        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true
            break
          }
        }
        if (!is_del) {
          if (d.userno.indexOf(this.select_cate) > -1 &&
                            (d.username.indexOf(this.expselect_word) > -1 ||
                                d.stuClass.indexOf(this.select_word) > -1) ||
                                d.stuHw.indexOf(this.select_word) > -1
          ) {
            return d
          }
        }
      })
    },
    expdata() {
      return this.exptableData.filter((d) => {
        let is_del = false

        for (let i = 0; i < this.expdel_list.length; i++) {
          if (d.name === this.expdel_list[i].name) {
            is_del = true
            break
          }
        }
        if (!is_del) {
          if (d.userno.indexOf(this.select_cate) > -1 &&
                            (d.username.indexOf(this.expselect_word) > -1 ||
                                d.stuClass.indexOf(this.expselect_word) > -1) ||
                                d.stuExp.indexOf(this.expselect_word) > -1
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
      this.getDatahw()
      this.getDataexp()
      this.getDataexam()
    }
  },
  created() {

  },
  mounted() {
    // 预习
    this.coures = JSON.parse(localStorage.getItem('coures'))
    this.selcoures = this.coures[0]
    this.getData()
    // 课堂
    this.getDatahw()
    this.selallcontent = localStorage.getItem('gradecomments')
    // 实验
    this.expclass = localStorage.getItem('selclass')
    this.getDataexp()
    // 考试
    this.getExamData()
    this.countDown()
    this.examselallcontent = localStorage.getItem('gradecomments')
  },
  methods: {
    // 预习
    dataForBar() {
      for (var i = 0; i < this.tableData.length; i++) {
        this.knowsData.push[this.tableData[i].kname]
      }
    },
    drawBar(xdata, ydata) {
      const barBox = echarts.init(document.getElementById('yuxibar'))
      const option = {
        title: {
          text: '预习作业星级分布',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: xdata,
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
            name: '预习三星分布',
            type: 'bar',
            barWidth: '50%',
            data: ydata,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = ['#006699']
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
      barBox.setOption(option, true)
      window.addEventListener('resize', function() { barBox.resize() })
    },

    yuxiinfo() {
      const _this = this
      const data1 = { 'userno': localStorage.getItem('userno'), 'coures': _this.selcoures, 'yxidx': this.selyx }
      getyxinfos(data1).then(response => {
        _this.tableData = response.data.yxinfo
        _this.knowsData = []
        _this.knowsStar = []

        for (var i = 0; i < _this.tableData.length; i++) {
          _this.knowsData.push(_this.tableData[i].kname)

          _this.knowsStar.push(_this.tableData[i].star_5)
        }
        _this.drawBar(_this.knowsData, _this.knowsStar)

        // this.radio=response.data.radio
        // if(this.radio==2) {self.firstshow=false;self.secondshow=true;}
        setTimeout(() => {
          _this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    },
    getData() {
      const _this = this
      _this.selyx = 1
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'yxidx': _this.selyx }
      // 这里用Get,可以获取到本地的json文件中的内容。
      dataForYx(data).then(response => {
        _this.yxnum = response.data.yxnum
        _this.tableData = response.data.yxinfo
        _this.knowsData = []
        _this.knowsStar = []

        for (var i = 0; i < _this.tableData.length; i++) {
          _this.knowsData.push(_this.tableData[i].kname)
          if (!_this.tableData[i].star_5) { _this.tableData[i].star_5 = 0 }
          _this.knowsStar.push(_this.tableData[i].star_4 + _this.tableData[i].star_5)
        }
        _this.drawBar(_this.knowsData, _this.knowsStar)

        // _this.coures = response.data.coures
        // _this.selcourse = _this.coures[0]

        // localStorage.setItem('coures', JSON.stringify(_this.coures))
        // localStorage.setItem('type', response.data.type)

        // this.radio=response.data.radio
        // if(this.radio==2) {self.firstshow=false;self.secondshow=true;}
        setTimeout(() => {
          _this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 课堂
    // ****************************************************************************
    changeClass() {
      localStorage.setItem('selclass', this.hwclass)
      this.getDatahw()
    },
    handleconfirmcomment() {

      // localStorage.setItem('comments', this.selallcontent)
    },
    handledelcomment(index, row) {
      const data = { 'hw': this.selcoures, 'userno': localStorage.getItem('userno'), 'grade': row.grade, 'comment': row.comment }
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
      this.getDatahw()
    },

    handleSizeChange(size) {
      this.pagesize = size
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val
      this.getDatahw()
    },
    // 获取 easy-mock 的模拟数据
    getDatahw() {
      // let data={'site':localStorage.getItem('site')};
      if (localStorage.getItem('selclass')) {
        this.hwclass = localStorage.getItem('selclass')
      }
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'stuclass': this.hwclass }

      getHwList(data).then(response => {
        this.hwTableData = response.data.info
        this.classes = response.data.classes
        var userlist = []
        for (var u = 0; u < this.hwTableData.length; u++) {
          userlist.push(this.hwTableData[u].userno)
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
        this.hwTtableData = lily
      } else this.hwTtableData = this.dataBak
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
      const item = this.hwTtableData[index]

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
      this.$set(this.hwTtableData, this.idx, this.form)
      this.editVisible = false
      this.$message.success(`修改第 ${this.idx + 1} 行成功`)
    },
    // 确定删除
    deleteRow() {
      this.hwTtableData.splice(this.idx, 1)
      this.$message.success('删除成功')
      this.delVisible = false
    },
    // 实验
    // ********************************************************************************
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
    exphandleSizeChange(size) {
      this.exppagesize = size
    },
    // 分页导航
    exphandleCurrentChange(val) {
      this.expcur_page = val
      this.getDataexp()
    },
    expchangeClass() {
      localStorage.setItem('selclass', this.expclass)
      this.getDataexp()
    },
    // 获取 easy-mock 的模拟数据
    getDataexp() {
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'stuclass': this.expclass }

      getExpList(data).then(response => {
        this.exptableData = response.data.info
        this.expclasses = response.data.classes

        var userlist = []
        for (var u = 0; u < this.exptableData.length; u++) {
          userlist.push(this.exptableData[u].userno)
        }
        localStorage.setItem('tableidx', userlist)
        // console.log(response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    expsearch() {
      this.expis_search = true
      if (this.expselect_word) {
        var lily = this.expdataBak.filter((p) => {
          return p.season === this.expselect_word
        })
        this.exptableData = lily
      } else this.exptableData = this.expdataBak
    },
    expformatter(row, column) {
      return row.address
    },
    expfilterTag(value, row) {
      return row.tag === value
    },
    async exphandleHomework(index, row) {
      localStorage.setItem('stuno', row.userno)
      localStorage.setItem('stuname', row.username)
      localStorage.setItem('stucoures', this.selcoures)
      localStorage.setItem('useridx', index)

      // console.log(this.selclass)
      this.$router.replace('stuexps')
      this.$message('编辑题号为： ' + row.userno + '|' + row.username)
    },
    async exphandleEdit(index, row) {
      this.idx1 = index
      this.expdetailData = []

      // const item = this.tableData[index+this.pagesize*(this.cur_page-1)];
      const item = this.exptableData[index]

      this.editVisible = true
    },
    expOpenBatch() {
      const data = { 'stuClass': this.expselclass, 'coures': this.selcoures, 'expidx': this.expidx, 'couresTea': localStorage.getItem('userno') }
      expOpenBatchSwitch(data).then(response => {
        // console.log(response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    expCloseBatch() {
      const data = { 'stuClass': this.expselclass, 'coures': this.selcoures, 'expidx': this.expidx, 'couresTea': localStorage.getItem('userno') }
      expCloseBatchSwitch(data).then(response => {
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    exphandleDelete(index, row) {
      this.idx1 = index
      this.expdelVisible = true
    },
    expdelAll() {
      const length = this.expmultipleSelection.length
      let str = ''
      this.expdel_list = this.del_list.concat(this.expmultipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.expmultipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.expmultipleSelection = []
    },
    exphandleSelectionChange(val) {
      this.expmultipleSelection = val
    },
    // 保存编辑
    expsaveEdit() {
      this.$set(this.exptableData, this.idx1, this.expform)
      this.expeditVisible = false
      this.$message.success(`修改第 ${this.idx1 + 1} 行成功`)
    },
    // 确定删除
    expdeleteRow() {
      this.exptableData.splice(this.idx1, 1)
      this.$message.success('删除成功')
      this.expdelVisible = false
    },
    // 考试
    // ********************************************************************
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
    examchangeClass() {
      this.getExamData()
      this.countDown()
      // console.log(this.examclass)
    },
    getExamData() {
      const that = this

      const data = { 'size': that.exampagesize, 'page': that.cur_page, 'coures': that.selcoures, 'userno': localStorage.getItem('userno'), 'examidx': this.examidx, 'stuclass': this.examclass }
      getStuExamForTea(data).then(response => {
        if ((response.data !== 'error') && (response.data !== '')) {
          that.examTotalNum = response.data.examTotalNum
          that.examnum = response.data.examnum
          that.examtableData = response.data.info
          that.examclasses = response.data.classes
          that.examStartTime = that.timestampToTime(parseInt(response.data.examStartTime))
          that.examEndTime = that.timestampToTime(parseInt(response.data.examEndTime))
          // console.log(this.examStartTime, this.examEndTime)
          that.queses = []
          for (let i = 0; i < that.examnum; i++) {
            that.queses.push({ 'prop': (i + 1).toString(), 'label': (i + 1).toString() })
          }
          var userlist = []
          for (var u = 0; u < that.examtableData.length; u++) {
            userlist.push(that.examtableData[u].stuno)
          }
          localStorage.setItem('tableidx', userlist)
        } else {
          that.$message.error('没有试卷')
          that.examTotalNum = ''
          that.examtableData = []
          that.examclasses = []
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
    examhandleconfirmcomment() {

      // localStorage.setItem('comments', this.selallcontent)
    },
    examhandledelcomment(index, row) {
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
      this.examcommentData.splice(this.idx, 1)
      // this.delVisible = true
    },

    examgetcomment() {
      const data = { 'coures': this.selcoures, 'userno': localStorage.getItem('userno') }
      getallcomment(data).then(response => {
        this.examcommentData = response.data
        // console.log(response.data)
        this.$message('评语获取完成')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    examaddcomment() {
      const data = { 'coures': this.selcoures, 'userno': localStorage.getItem('userno'), 'grade': this.examgradeselect, 'comment': this.examhw_comment }
      addonecomment(data).then(response => {
        // this.tableData = response.data
        // console.log(response.data)
        this.$message('评语添加完成')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      this.examgetcomment()
    },
    examhandlesetcomment() {
      // console.log('adfadf')
      if (!this.examsetcomment) {
        this.examsetcomment = true
        this.examgetcomment()
      } else {
        this.examsetcomment = false
      }
    },
    examhwopenbatch() {
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
    examhwclosebatch() {
      const data = { 'stuClass': this.examhw_class, 'coures': this.selcoures, 'hwidx': this.examhw_idx, 'owner': localStorage.getItem('userno') }
      hwCloseBatchSwitch(data).then(response => {
        // this.tableData = response.data
        // console.log(response.data)
        this.$message('作业关闭成功')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    examcoureschange() {
      // console.log(this.selcoures)
      this.examclass = '所有班级'
      this.getExamData()
      this.countDown()
    },

    examhandleSizeChange(size) {
      this.exampagesize = size
    },
    // 分页导航
    examhandleCurrentChange(val) {
      this.examcur_page = val
      this.getDataexam()
    },
    // 获取 easy-mock 的模拟数据
    getDataexam() {
      // let data={'site':localStorage.getItem('site')};
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures }

      getHwList(data).then(response => {
        this.examtableData = response.data
        var userlist = []
        for (var u = 0; u < this.examtableData.length; u++) {
          userlist.push(this.examtableData[u].userno)
        }
        localStorage.setItem('tableidx', userlist)
        // console.log(response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    examsearch() {
      this.examis_search = true
      if (this.examselect_word) {
        var lily = this.examdataBak.filter((p) => {
          return p.season === this.examselect_word
        })
        this.examtableData = lily
      } else this.examtableData = this.examdataBak
    },
    async handleSortChange() {
      console.log(this.$refs.multipleTable)
      // console.log(this.tableData)
    },
    async examhandleHomework(index, row) {
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
    async examhandleEdit(index, row) {
      this.idx = index
      this.examdetailData = []

      // const item = this.tableData[index+this.pagesize*(this.cur_page-1)];
      const item = this.examtableData[index]

      this.exameditVisible = true
    },
    examhandleDelete(index, row) {
      this.idx = index
      this.delVisible = true
    },
    examdelAll() {
      const length = this.exammultipleSelection.length
      let str = ''
      this.del_list = this.examdel_list.concat(this.exammultipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.exammultipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.exammultipleSelection = []
    },
    examhandleSelectionChange(val) {
      this.examselallcontent = ''
      const obj = {}
      val = val.reduce((item, next) => {
        obj[next.grade] ? '' : obj[next.grade] = true && item.push(next)
        return item
      }, [])
      this.exammultipleSelection = val
      for (var v = 0; v < val.length; v++) {
        this.selallcontent = this.examselallcontent + val[v].grade + ':' + val[v].comment + '\n'
      }
      localStorage.setItem('gradecomments', this.examselallcontent)
    },
    // 保存编辑
    examsaveEdit() {
      this.$set(this.examtableData, this.idx2, this.examform)
      this.exameditVisible = false
      this.$message.success(`修改第 ${this.idx2 + 1} 行成功`)
    },
    // 确定删除
    examdeleteRow() {
      this.examtableData.splice(this.idx2, 1)
      this.$message.success('删除成功')
      this.examdelVisible = false
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
.el-radio{
  margin: 0;
}

.el-radio.is-bordered + .el-radio.is-bordered{
  margin: 0;
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
