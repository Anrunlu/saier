<template>
  <div class="components-container">
    <img  :src="stupic">
    <div>
      <!-- <div>
        <el-tag class="tag-title">
          课程选择:
        </el-tag>
        <el-radio-group v-for="(item,index) in coures" :key="index" v-model="selcoures">
          <el-radio border :label="item" @change="changecoures">{{ item }}</el-radio>

        </el-radio-group>
      </div> -->

      <div>
        <el-button type="primary" icon="upload" style="bottom: 15px;margin-left: 40px;" @click="openhw">
          开放作业
        </el-button>
        <el-button type="warning" icon="upload" style="bottom: 15px;margin-left: 40px;" @click="closehw">
          关闭作业
        </el-button>
        <br>
        <el-tag class="tag-title">
          作业选择:
        </el-tag>
        <el-radio-group v-for="item in hwnum" :key="item" v-model="selhw">
          <el-radio border :label="item" @change="changehw">作业{{ item }}</el-radio>

        </el-radio-group>
      </div>
      {{ totalscore }}
      <!-- <mavon-editor ref="md" height="300px" @imgAdd="$imgAdd" /> -->
      <div v-for="(item,index) in quesAnswers" :key="index" class="editor-container" @click="showidx(index)">
        <!-- <el-tag class="tag-title">
          Basic: {{ item.ques }}
        </el-tag> -->
        <mavon-editor :ref="item.itemname" v-model="item.answer" :editable="hwswitch" height="300px" @imgAdd="$imgAdd" />
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
            <el-slider v-model="item.score" />
          </el-col>
          <el-row v-for="(knowitem,knowindex) in item.knows" :key="knowindex" :gutter="8">
            <el-col :span="8">
              {{ knowitem.name }}
              <el-rate v-model="knowitem.value" />
            </el-col>
          </el-row>
        </el-row>

      </div>
      <div>
        <el-button type="primary" icon="upload" style="bottom: 15px;margin-left: 40px;" @click="hwsubmit">
          提交批改
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
// import MarkdownEditor from '@/components/MarkdownEditor'
import { mavonEditor } from 'mavon-editor'
import { recImg, getstuhwfortea, pigaistuhw, hwOpenSwitch, hwCloseSwitch } from '@/api/hwexp'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'MarkdownDemo',
  components: { mavonEditor },
  data() {
    return {
      hwnum: '',
      teatime: '',
      selhw: 1,
      stupic: '',
      quesAnswers: [],
      selcoures: '',
      coures: [],
      totalscore: 0,
      hwswitch: false,
      mavonidx: '',
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
    // this.coures = JSON.parse(localStorage.getItem('coures'))
    this.selcoures = localStorage.getItem('stucoures')
    // console.log(this.selcoures)
    this.getData()
  },
  methods: {
    
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
      const data = { 'userno': localStorage.getItem('stuno'), 'coures': localStorage.getItem('stucoures'), 'hwidx': this.selhw, 'owner': localStorage.getItem('userno') }
      getstuhwfortea(data).then(response => {
        // this.tableData = response.data
        // console.log(response.data)
        this.quesAnswers = response.data.answerlist
        this.hwnum = response.data.hwnum
        this.stupic = response.data.stupic
        this.totalscore = response.data.totalscore
        this.hwswitch = response.data.hwswitch

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
      const data = { 'userno': localStorage.getItem('stuno'), 'coures': localStorage.getItem('stucoures'), 'hwidx': this.selhw, 'answer': this.quesAnswers, 'teatime': this.teatime, 'owner': localStorage.getItem('userno') }
      // console.log(data)
      pigaistuhw(data).then(response => {
        // this.tableData = response.data
        this.$message('批改提交完成')
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
