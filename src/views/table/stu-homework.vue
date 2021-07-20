<template>
  <div class="components-container">
    <el-row :gutter="6">
      
      <el-col :span="18">
        <div>
        <p>{{ stuno }}---{{ stuname }}----{{ stutime }}
          <font color="red">{{ cur_page }}/{{ userlist.length }}</font>
        </p>
        <el-tag class="tag-title">
          作业选择:
        </el-tag>
        <el-radio-group v-for="item in hwnum" :key="item" v-model="selhw">
          <el-radio border :label="item" @change="changehw">作业{{ item }}</el-radio>

        </el-radio-group>
         <br>
         <font color="red" size="12">{{ totalscore }}</font><br>
        <el-button type="primary" icon="upload" style="bottom: 15px;margin-left: 40px;" @click="openhw">
          开放作业
        </el-button>
        <el-button type="danger" icon="upload" style="bottom: 15px;margin-left: 40px;" @click="closehw">
          关闭作业
        </el-button>
        <el-button type="warning" style="width:50%" @click="hwsubmit">
          提交批改
        </el-button>
        <el-button type="primary" @click="prestu">
          上一位
        </el-button>
        <el-button type="primary" @click="nextstu">
          下一位
        </el-button>
        
       
        
      </div>
      
      </el-col>
      <el-col :span="6">
    <img style="width:200px;height:200px" :src="stupic">
      </el-col>
    </el-row>
    <div>
      <!-- <div>
        <el-tag class="tag-title">
          课程选择:
        </el-tag>
        <el-radio-group v-for="(item,index) in coures" :key="index" v-model="selcoures">
          <el-radio border :label="item" @change="changecoures">{{ item }}</el-radio>

        </el-radio-group>
      </div> -->

      
      <!-- <mavon-editor ref="md" height="300px" @imgAdd="$imgAdd" /> -->
      <div v-for="(item,index) in quesAnswers" :key="index" class="editor-container" @click="showidx(index)">
        <div style="border:3px solid #00F">
          <p align="center"><font color="red">作业题目：{{index+1}}</font></p>
          <mavon-editor :ref="item.itemname" v-model="item.answer" :editable="hwswitch" height="300px" @imgAdd="$imgAdd" />
          <p align="center"><font color="green">作业题目 {{ index+1 }} 错题分析</font></p>
          <mavon-editor v-model="item.cuoti" :editable="true" height="300px" />
           			 
          
          <el-row :gutter="8">
            <el-col :span="8">
              <el-input v-model="item.score" size="small" placeholder="请输入成绩" />
            </el-col>
            <el-col :span="16">
              <el-input v-model="item.comment" autosize size="medium" type="textarea" placeholder="请输入内容" />
            </el-col>

          </el-row>
          <el-row>
            <el-col>
              <el-slider v-model="item.score" @change="scorechange" />
            </el-col>
            <el-row v-for="(knowitem,knowindex) in item.knows" :key="knowindex" :gutter="8">
              <el-col :span="8">
                {{ knowitem.name }}
                <el-rate v-model="knowitem.value" @change="ratechange" />
              </el-col>
            </el-row>
          </el-row>
        </div>
        <div style="border:3px solid #0F0 ">
          <p align="center"><font color="green">参考答案</font></p>
          <mavon-editor :ref="item.itemname" v-model="item.daan" height="300px" @imgAdd="$imgAdd" />
          <el-button type="danger" style="width:100%" @click="daansubmit">
            修改答案
          </el-button>
        </div>
      </div>
      <div>
        <el-button type="warning" style="width:50%" @click="hwsubmit">
          提交批改
        </el-button>
        <el-button type="primary" @click="prestu">
          上一位
        </el-button>
        <el-button type="primary" @click="nextstu">
          下一位
        </el-button>
        <font color="red">{{ cur_page }}/{{ userlist.length }}</font>
      </div>
    </div>

  </div>
</template>

<script>
// import MarkdownEditor from '@/components/MarkdownEditor'
import { mavonEditor } from 'mavon-editor'
import { recImg, getstuhwfortea, pigaistuhw, hwOpenSwitch, hwCloseSwitch, changedaan } from '@/api/hwexp'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'MarkdownDemo',
  components: { mavonEditor },
  data() {
    return {
      imgs: [],
      stuno: '',
      stuname: '',
      userlist: '',
      stutime: '',
      cur_page: parseInt(localStorage.getItem('useridx')),
      hwnum: '',
      teatime: '',
      selhw: 1,
      stupic: '',
      quesAnswers: [],
      scorecomm: '',
      ratecomm: '',
      selcoures: '',
      coures: [],
      totalscore: 0,
      hwswitch: false,
      mavonidx: '',
      gradecomments: {},
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
  mounted() {
    this.userlist = localStorage.getItem('tableidx').split(',')
    // console.log(this.userlist)
    // this.coures = JSON.parse(localStorage.getItem('coures'))
    this.selcoures = localStorage.getItem('stucoures')
    /* var temp = localStorage.getItem('gradecomments').split('\n')
    for (var g = 0; g < temp.length - 1; g++) {
      this.gradecomments[temp[g].split(':')[0]] = temp[g].split(':')[1]
    } */

    // console.log(this.gradecomments)
    this.getData()
  },
  methods: {
    daansubmit() {
      const data = { 'quesNo': this.quesAnswers[this.mavonidx].quesNo, 'daan': this.quesAnswers[this.mavonidx].daan }
      changedaan(data).then(response => {
        // this.tableData = response.data
        
        this.$message(response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    prestu() {
      if (this.cur_page >= 1) {
        this.cur_page = this.cur_page - 1
        localStorage.setItem('useridx', this.cur_page)
        this.getData()
      } else {
        alert('已是第一位同学')
      }
    },
    nextstu() {
      if (this.cur_page < this.userlist.length - 1) {
        this.cur_page = this.cur_page + 1
        localStorage.setItem('useridx', this.cur_page)
        this.getData()
      } else {
        alert('已是最后一位同学')
      }
    },
    ratechange() {
      var tempcomment = ''

      // console.log(this.quesAnswers[this.mavonidx].knows)
      for (var r = 0; r < this.quesAnswers[this.mavonidx].knows.length; r++) {
        // console.log(this.quesAnswers[this.mavonidx].knows[r])
        tempcomment = tempcomment + ';  ' + this.quesAnswers[this.mavonidx].knows[r].name + this.rate2comment(this.quesAnswers[this.mavonidx].knows[r].value)
      }
      this.ratecomm = tempcomment
      this.quesAnswers[this.mavonidx].comment = this.scorecomm + this.ratecomm
      // this.quesAnswers[this.mavonidx].comment = this.rate2comment(this.quesAnswers[this.mavonidx].value)
    },
    scorechange() {
      // console.log(this.mavonidx)
      // console.log(this.quesAnswers[this.mavonidx])
      // console.log(this.ratecomment)
      this.ratecomm = ''
      this.scorecomm = this.score2comment(this.quesAnswers[this.mavonidx].score)
      // console.log(this.mavonidx)
      this.quesAnswers[this.mavonidx].comment = this.scorecomm + this.ratecomm
    },
    rate2comment(rate) {
      var ratecomment
      switch (rate) {
        case 1: ratecomment = '：掌握不好，1星'; break
        case 2: ratecomment = '：掌握一般，2星'; break
        case 3: ratecomment = '：掌握不错，3星'; break
        case 4: ratecomment = '：掌握良好，4星'; break
        case 5: ratecomment = '：掌握很好，5星'; break
      }
      return ratecomment
    },
    score2comment(score) {
      var scorecomment
      if (score < 60) {
        scorecomment = this.gradecomments['60分以下']
      } else if (score < 70) {
        scorecomment = this.gradecomments['60分-70分']
      } else if (score < 80) {
        scorecomment = this.gradecomments['70分-80分']
      } else if (score < 90) {
        scorecomment = this.gradecomments['80分-90分']
      } else if (score <= 100) {
        scorecomment = this.gradecomments['90分-100分']
      }
      return scorecomment
    },

    // deleteImg: function(index) {
    //       this.imgs.splice(index, 1)
    //     },
    //     // 图片click
    //     imgClick: function() {
    //       document.getElementById('uploadFile').click()
    //     },
    //     // 点击选中图片
    //     readLocalFile: function() {
    //       var localFile = document.getElementById('uploadFile').files[0]
    //       var reader = new FileReader()
    //       var content

    //       var current = this
    //       reader.onload = function(event) {
    //         content = event.target.result
    //         current.imgs.push(content) // 获取图片base64代码
    //       }
    //       reader.onerror = function(event) {
    //         alert('error')
    //       }
    //       content = reader.readAsDataURL(localFile, 'UTF-8')
    //       this.$imgAdd(1, localFile)
    //       var sss = document.getElementById('uploadFile').value
    //       console.log(sss)
    //     },

    openhw() {
      const data = { 'userno': localStorage.getItem('stuno'), 'coures': localStorage.getItem('stucoures'), 'hwidx': this.selhw, 'owner': localStorage.getItem('userno') }
      hwOpenSwitch(data).then(response => {
        // this.tableData = response.data
        this.hwswitch = response.data
        this.$message('作业打开')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    closehw() {
      const data = { 'userno': localStorage.getItem('stuno'), 'coures': localStorage.getItem('stucoures'), 'hwidx': this.selhw, 'owner': localStorage.getItem('userno') }
      hwCloseSwitch(data).then(response => {
        // this.tableData = response.data
        this.hwswitch = response.data
        this.$message('作业关闭')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    showidx(index) {
      this.mavonidx = index
      // console.log(this.mavonidx)
    },
    $imgAdd(pos, $file) {
      // console.log(pos)
      const that = this
      var formdata = new FormData()
      formdata.append('file', $file)
      formdata.append('userno', localStorage.getItem('userno'))
      formdata.append('expidx', this.selhw)
      formdata.append('coures', this.selcoures)

      // console.log(formdata)
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      recImg(formdata).then(response => {
        that.$refs.itemname[this.mavonidx].$img2Url(pos, response.data)

        setTimeout(() => {
          that.listLoading = false
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
      _this.teatime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
      // _this.sendtime = yy + '-' + mm + '-' + dd
    },
    getData() {
	
      const data = { 'userno': this.userlist[this.cur_page], 'coures': localStorage.getItem('stucoures'), 'hwidx': this.selhw, 'owner': localStorage.getItem('userno') }
	   console.log(data)
      getstuhwfortea(data).then(response => {
        // this.tableData = response.data
        // console.log(response.data)
        this.quesAnswers = response.data.answerlist
        this.hwnum = response.data.hwnum
        this.stupic = response.data.stupic
        this.totalscore = response.data.totalscore
        this.hwswitch = response.data.hwswitch
        this.stuno = response.data.stuno
        this.stuname = response.data.stuname
        this.stutime = response.data.stutime

        // console.log(this.quesAnswers)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    changecoures() {
      this.getData()
    },
    changehw() {
      this.getData()
    },
    hwsubmit() {
      // console.log(this.quesAnswers)
      this.getTime()
      const data = { 'userno': this.userlist[this.cur_page], 'coures': localStorage.getItem('stucoures'), 'hwidx': this.selhw, 'answer': this.quesAnswers, 'teatime': this.teatime, 'owner': localStorage.getItem('userno') }
      // console.log(data)
      pigaistuhw(data).then(response => {
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
