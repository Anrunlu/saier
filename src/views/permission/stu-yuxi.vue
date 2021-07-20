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
          预习作业选择:
        </el-tag>
        <el-radio-group v-for="item in hwnum" :key="item" v-model="selhw">
          <el-radio border :label="item" @change="changehw">预习{{ item }}</el-radio>

        </el-radio-group>
      </div>

      <el-button type="warning" icon="upload" style="bottom: 15px; width: 100%" @click="hwsubmit">
        提交预习作业
      </el-button>
      <el-tag type="danger">请大家选择对知识点的了解程度</el-tag>
      <el-row v-for="(knowitem,knowindex) in knowpoints" :key="knowindex" :gutter="8">
        <el-col align="center">
          <el-card>{{ knowitem.kname }}
          </el-card>
          <br>
          <el-rate
            v-model="knowitem.value"

            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
          />
          <!-- <el-rate
            v-model="knowitem.value"
          /> -->
          <br>
          <br>
        </el-col>
      </el-row>
      <!-- <div v-for="(item,index) in quesAnswers" :key="index" class="editor-container" @click="showidx(index)">

        <mavon-editor :ref="item.itemname" v-model="item.answer" :editable="hwswitch" height="300px" @imgAdd="$imgAdd" />
        <el-row :gutter="8">
          <el-col :span="8">
            <el-input v-model="item.score" size="small" disabled placeholder="" />
          </el-col>
          <el-col :span="16">
            <el-input v-model="item.comment" autosize size="medium" disabled type="textarea" placeholder="" />
          </el-col>

        </el-row>
      </div> -->
      <div>
        <el-button type="warning" icon="upload" style="bottom: 15px; width: 100%" @click="hwsubmit">
          提交预习作业
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
// import MarkdownEditor from '@/components/MarkdownEditor'
// import { mavonEditor } from 'mavon-editor'
import { recImg, getknowsforstu, submitstuyx } from '@/api/hwexp'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'MarkdownDemo',
  // components: { mavonEditor },
  data() {
    return {
      hwnum: '',
      stutime: '',
      mavonidx: 0,
      selhw: 1,
      quesAnswers: [],
      selcoures: '',
      totalscore: '',
      coures: [],
      knowpoints: [],
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      ratetexts: ['没有听说过', '听说过', '了解一些', '比较了解', '非常了解'],
      hwswitch: '',
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
    // console.log(this.currentIndex)
    this.coures = JSON.parse(localStorage.getItem('coures'))
    if (!this.coures) {
      alert('温馨提示：出现了一个问题，请点击 “我的主页” ')
    }
    this.selcoures = this.coures[0]
    // console.log(this.selcoures)
    this.getData()
  },
  methods: {
    showidx(index) {
      this.mavonidx = index
      console.log(this.mavonidx)
    },
    $imgAdd(pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      formdata.append('userno', localStorage.getItem('userno'))
      formdata.append('expidx', this.selhw)
      formdata.append('coures', this.selcoures)

      console.log(formdata)
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      recImg(formdata).then(response => {
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
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'hwidx': this.selhw }
      getknowsforstu(data).then(response => {
        // this.tableData = response.data
        this.knowpoints = response.data.queslist
        this.hwnum = response.data.hwnum
        // console.log(this.knowpoints)

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
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'hwidx': this.selhw, 'answer': this.knowpoints, 'stutime': this.stutime }
      console.log(data)
      submitstuyx(data).then(response => {
        // this.tableData = response.data
        this.$message('预习作业提交完成')
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
