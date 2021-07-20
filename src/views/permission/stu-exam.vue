<template>
  <div class="components-container">

    <div>
      <div>
        <el-tag class="tag-title">
          课程选择:
        </el-tag>
        <el-radio-group v-for="(item,index) in coures" :key="index" v-model="selcoures">
          <el-radio border :label="item" @change="changecoures">{{ item }}</el-radio>

        </el-radio-group>
      </div>

      <div>
        <el-tag class="tag-title">
          任务选择:
        </el-tag>
        <el-radio-group v-model="selmis">
          <el-radio border label="hw" @change="selMission">作业任务</el-radio>
          <el-radio border label="exam" @change="selMission">试卷任务</el-radio>
        </el-radio-group>

      </div>
      <div v-show="!misEnable">
        <el-radio-group v-for="item in examTotalNum" :key="item" v-model="selhw">
          <el-radio border :label="item" @change="changehw">考试{{ item }}</el-radio>

        </el-radio-group>
        <p v-show="displaytime" align="center"><font size="10px" color="red">距离考试开始时间：  {{ countDownList }}</font></p>
        <p v-show="!displaytime" align="center"><font size="10px" color="green">距离考试结束时间：  {{ countDownList }}</font></p>
        <div v-show="itemVisible">
          <div style="width:100%;float:right">
            <el-button type="danger" :disabled="!hwswitch" style="bottom: 15px; width: 20%;float:right" @click="hwsubmit">
              提交试卷
            </el-button>
            <el-button type="info" style="bottom: 15px; width: 20%;float:right" @click="examPreview">
              试卷预览
            </el-button>
          </div><br><br>
          <p style="text-align:center;color:blue;font-size:30px;">考试题目：  {{ quesName }}({{ quesScore }}分) {{ quesTime }}</p>

          <!-- <p align="center"><font size="10px" color="red">本题目剩余时间： {{ remain }}</font></p> -->
          <div>
            <el-row :gutter="8">
              <el-col :span="6">
                <el-button type="warning" icon="upload" :disabled="!hwswitch" style="bottom: 15px; width: 100%" @click="getPreQues">
                  上一题<font color="red">（更换题目前，不要忘记保存）</font>
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="success" icon="upload" :disabled="!hwswitch" style="bottom: 15px; width: 100%" @click="hwsubmit">
                  提交本题
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="warning" icon="upload" :disabled="!hwswitch" style="bottom: 15px; width: 100%" @click="getNextQues">
                 <font color="red">（更换题目前，不要忘记保存）</font>下一题
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div v-for="(item,index) in quesAnswers" :key="index" class="editor-container" @click="showidx(index)">
            <p style="text-align:center;color:red;font-size:20px;">第 {{ index+1 }} 小题({{ item.score }}分)</p>
            <mavon-editor :ref="item.itemname" v-model="item.question" :editable="hwswitch" height="300px" @imgAdd="$imgAdd" @save="hwsubmit" />
            <el-row :gutter="8">
              <el-col :span="8">
                <el-input v-model="item.stuscore" size="small" disabled placeholder="" />
              </el-col>
              <el-col :span="16">
                <el-input v-model="item.stucomment" autosize size="medium" disabled type="textarea" placeholder="" />
              </el-col>

            </el-row>

            <!-- <el-row v-for="(knowitem,knowindex) in item.knows" :key="knowindex" :gutter="8">
          <el-col :span="8">
            {{ tete }}dasfasdfadf
            <el-rate v-model="knowitem.value" />
          </el-col>
        </el-row> -->
            <!-- <p align="center"><font color="red">作业提交，并且老师批改后，会将题目答案显示在下方</font></p>
            <div v-show="dispdaan">
              <p align="center"><font size="10" color="green">考试题目 {{ index+1 }} 答案</font></p>
              <mavon-editor v-model="item.daan" :editable="false" height="300px" />
            </div> -->
          </div>
          <!-- <el-row :gutter="8">
          <el-col :span="8">
            <el-input v-model="score" size="small" disabled placeholder="" />
          </el-col>
          <el-col :span="16">
            <el-input v-model="comment" autosize size="medium" disabled type="textarea" placeholder="" />
          </el-col>

        </el-row> -->
          <!-- <div v-for="(item,index) in quesAnswers" :key="index" class="editor-container" @click="showidx(index)">
        <p align="center"><font color="blue">考试题目：  {{ index+1 }}</font></p>
        <mavon-editor :ref="item.itemname" v-model="item.answer" :editable="hwswitch" height="300px" oncopy="return false" onpaste="return false" oncut="return false" @imgAdd="$imgAdd" />
        <el-row :gutter="8">
          <el-col :span="8">
            <el-input v-model="item.score" size="small" disabled placeholder="" />
          </el-col>
          <el-col :span="16">
            <el-input v-model="item.comment" autosize size="medium" disabled type="textarea" placeholder="" />
          </el-col>

        </el-row>
        <p align="center"><font color="red">作业提交，并且老师批改后，会将题目答案显示在下方</font></p>
        <div v-show="dispdaan">
          <p align="center"><font color="green">作业题目 {{ index+1 }} 答案</font></p>
          <mavon-editor v-model="item.daan" :editable="false" height="300px" />
        </div>
       </div> -->
          <div>
            <el-row :gutter="8">
              <el-col :span="6">
                <el-button type="warning" icon="upload" :disabled="!hwswitch" style="bottom: 15px; width: 100%" @click="getPreQues">
                  上一题<font color="red">（更换题目前，不要忘记保存）</font>
                </el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="danger" icon="upload" :disabled="!hwswitch" style="bottom: 15px; width: 100%" @click="hwsubmit">
                  提交答题内容
                </el-button>
              </el-col>
              <el-col :span="6">
                <el-button type="warning" icon="upload" :disabled="!hwswitch" style="bottom: 15px; width: 100%" @click="getNextQues">
                  <font color="red">（更换题目前，不要忘记保存）</font>下一题
                </el-button>
              </el-col>
            </el-row>
          </div>
          <el-dialog title="试卷预览" width="80%" :visible.sync="dialogTableVisible">
            <div style="color:green;font:bold 50px 宋体;;text-align:center">试卷预览</div>
            <div style="color:red;font:bold 30px 宋体;;text-align:center">只能预览，不能修改，若需修改，请关闭后在答题框中修改 </div>
            <mavon-editor v-model="quespreview" oncopy="return false" :editable="false" onpaste="return false" oncut="return false" height="300px" @imgAdd="$imgAdd" />
          </el-dialog>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import MarkdownEditor from '@/components/MarkdownEditor'
import { mavonEditor } from 'mavon-editor'
import { recImg, getstuownhw, stuGetOwnExam, submitstuownhw, stuExamOwnPre, submitstuownexam } from '@/api/hwexp'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'MarkdownDemo',
  components: { mavonEditor },
  data() {
    return {
      selmis: 'exam',
      misEnable: true,
      isEnd: false,
      dialogTableVisible: false,
      quesScore: '',
      quespreview: '',
      countDownList: '00天00时00分00秒',
      examStartTime: '2020-5-1 8:30:00',
      examEndTime: '',
      quesEndTime: '2020-5-1 8:30:00',
      displaytime: true,
      quesidx: 0,
      quesName: '',
      examnum: '',
      examTotalNum: '',
      itemVisible: false,
      itemWarning: false,
      count: 0,
      remain: 0,
      comment: '',
      examitem: '',
      examAnswer: '',
      score: '',
      hwnum: '',
      stutime: '',
      mavonidx: 0,
      selhw: 1,
      dispdaan: false,
      quesAnswers: [], // 这里的命名其实就是作业和考试题目相关内容。
      selcoures: '',
      totalscore: '',
      coures: [],
      hwswitch: true,
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList['en']
    }
  },
  created() {

  },
  mounted() {
    // console.log(this.currentIndex)

    this.coures = JSON.parse(localStorage.getItem('coures'))
    if (!this.coures) {
      alert('温馨提示：出现了一个问题，请点击 “我的主页” ')
    }
    this.selcoures = this.coures[0]

    if (this.selmis === 'exam') {
      this.misEnable = false
      this.getQuesData()
      this.countDown()
    }
  },
  methods: {

    examPreview() {
      this.dialogTableVisible = true
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'examidx': this.selhw }
      stuExamOwnPre(data).then(response => {
        // console.log(response.data)
        if (response.data !== 'error') {
          this.quespreview = response.data
        } else {
          this.$message.error('试卷获取出现问题！！！')
        }

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    selMission() {
      if (this.selmis === 'hw') {
        this.misEnable = true
        // this.getData()
      } else {
        this.misEnable = false
        this.getQuesData()
        this.countDown()
      }
    },
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
    countItemDown() {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        const newTime = new Date().getTime()
        // 对结束时间进行处理渲染到页面
        const endTime = new Date(this.quesEndTime).getTime()
        let obj = null

        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          const time = (endTime - newTime) / 1000
          // 获取天、时、分、秒
         const day = parseInt(time / (60 * 60 * 24))
         const hou = parseInt(time % (60 * 60 * 24) / 3600)
         const min = parseInt(time % (60 * 60 * 24) % 3600 / 60)
         const sec = parseInt(time % (60 * 60 * 24) % 3600% 60) 
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
          this.itemVisible = true
          clearInterval(interval)
          this.countItemDown()
        }
        this.remain = obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
        if ((!this.itemWarning) && (parseInt(obj.min) === 0)) {
          // alert('还有一分钟')
          this.itemWarning = true
        }
      }, 1000)
    },
    getPreQues() {
      // this.hwsubmit()
      if (this.quesidx > 0 && this.quesidx < this.examnum - 1) {
        this.quesidx = this.quesidx - 1
        this.getQuesData()
      } else {
        alert('这已是第一道大题')
      }
    },
    getNextQues() {
      // this.hwsubmit()
      if (this.quesidx < this.examnum - 2) {
        this.quesidx = this.quesidx + 1
        this.getQuesData()
        this.countItemDown()
      } else {
        alert('这已是最后一道大题')
      }
    },
    getQuesData() {
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'examidx': this.selhw, 'quesidx': this.quesidx }
      stuGetOwnExam(data).then(response => {
        // console.log(response.data)
        if (response.data !== 'error') {
          this.quesAnswers = response.data.examinfo.quesmany
          // console.log(this.quesAnswers)
          this.quesName = response.data.examinfo.quesName
          this.quesScore = response.data.examinfo.quesScore
          this.quesTime = response.data.examinfo.quesTime
          this.examnum = response.data.examnum
          this.examTotalNum = response.data.examTotalNum
          this.examStartTime = this.timestampToTime(parseInt(response.data.examStartTime))
          this.examEndTime = this.timestampToTime(parseInt(response.data.examEndTime))
          // this.quesEndTime = this.timestampToTime(parseInt(response.data.examinfo.quesTime))
        } else {
          this.$message.error('目前还没有试卷！！！')
        }

        // this.quesEndTime = this.timestampToTime(response.data.examinfo.quesTime)
        // this.tableData = response.data
        // this.quesAnswers = response.data.answerlist
        // this.totalscore = response.data.totalscore
        // console.log('aaa', response.data)
        // if ('daan' in response.data.answerlist[0]) {
        //   this.dispdaan = true
        // } else {
        //   this.dispdaan = false
        //   this.totalscore = '未批改'
        // }
        // this.hwnum = response.data.hwnum

        // this.hwswitch = response.data.hwswitch

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    countDownEnd(it) {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        const newTime = new Date().getTime()
        // 对结束时间进行处理渲染到页面
        // console.log(this.examEndTime)
        const endTime = new Date(this.examEndTime).getTime()
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
          this.itemVisible = true

          clearInterval(interval)
          this.hwswitch = false
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
          this.itemVisible = true
          clearInterval(interval)
          this.displaytime = false
          this.hwswitch = true
          this.countDownEnd()
          // this.countItemDown()
        }
        this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
      }, 1000)
    },

    showidx(index) {
      this.mavonidx = index
      // console.log(this.mavonidx)
    },
    $imgAdd(pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      formdata.append('userno', localStorage.getItem('userno'))
      formdata.append('expidx', this.selhw)
      formdata.append('coures', this.selcoures)

      // console.log(formdata)
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      recImg(formdata).then(response => {
        console.log(this.mavonidx)
        this.$refs.itemname[this.mavonidx].$img2Url(pos, response.data)

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getTime: function() {
      var _this = this
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const hh = new Date().getHours()
      const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
      _this.stutime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
      // _this.sendtime = yy + '-' + mm + '-' + dd
    },
    getData() {
      // console.log('test')
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'hwidx': this.selhw }
      getstuownhw(data).then(response => {
        // this.tableData = response.data
        if (response.data !== 'error') {
          this.quesAnswers = response.data.answerlist
          this.totalscore = response.data.totalscore
          // console.log('aaa', response.data)
          if ('daan' in response.data.answerlist[0]) {
            this.dispdaan = true
          } else {
            this.dispdaan = false
            this.totalscore = '未批改'
          }
          this.hwnum = response.data.hwnum

          this.hwswitch = response.data.hwswitch
        } else {
          this.$message.error('没有试卷！！')
        }

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    changecoures() {
      this.getData()
    },
    changehw() {
      // console.log(this.quesidx)
      this.getQuesData()
      this.displaytime = true
      this.itemVisible = false
      this.countDown()
    },
    hwsubmit() {
      // console.log(this.quesAnswers)
      this.getTime()
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'examidx': this.selhw, 'answer': this.quesAnswers, 'quesidx': this.quesidx, 'examendtime': this.examEndTime }
      // console.log(data)
      submitstuownexam(data).then(response => {
        // this.tableData = response.data
        this.$message(response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
    }
  }
}
</script>

<style scoped>
.editor-container{
  margin-bottom: 30px;
}
.tag-title{
  margin-bottom: 5px;
}
</style>
