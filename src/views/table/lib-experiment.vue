<template>
  <div class="components-container">

    <div>
      <div>
        <el-tag class="tag-title">
          课程选择:
        </el-tag>
        <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
          <el-radio border :label="item" @change="getData">{{ item }}</el-radio>

        </el-radio-group>
      </div>

      <div>
        <el-tag class="tag-title">
          实验报告选择:
        </el-tag>
        <el-radio-group v-for="item in expnum" :key="item" v-model="selexp">
          <el-radio border :label="item" @change="getData"> 实验{{ item }}</el-radio>

        </el-radio-group>
      </div>

      <div>
        <el-input v-model="selexpidx" placeholder="请输入实验序号，如 1" class="handle-input mr10" />
        <!-- <el-input v-model="selclass" placeholder="请输入班级" class="handle-input mr10" /> -->
        <el-button icon="el-icon-edit" @click="pubExp">发布实验</el-button>

      </div>

      <div class="editor-container">
        <el-tag class="tag-title">
          实验报告
        </el-tag>
        <el-button icon="el-icon-edit" @click="saveExp">保存实验</el-button>
        <mavon-editor ref="md" v-model="expcontent" :scroll-style="true" placeholder="test" height="300px" @imgAdd="$imgAdd" @save="saveExp" />

      </div>

    </div>

  </div>
</template>

<script>
// import MarkdownEditor from '@/components/MarkdownEditor'
import { mavonEditor } from 'mavon-editor'
import { publishExp, getExpLib, saveExpLib, recImg } from '@/api/hwexp'
import 'mavon-editor/dist/css/index.css'

const content = `
**This is test**

* vue
* element
* webpack

`
const testcontent = '这是我的实验报告'
const explist = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']

export default {
  name: 'MarkdownDemo',
  components: { mavonEditor },
  data() {
    return {
      selclass: '',
      selexpidx: '',
      selcoures: '',
      expcontent: testcontent,
      expnum: explist,
      selexp: explist[0],

      coures: '',
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
    this.coures = JSON.parse(localStorage.getItem('coures'))
    this.selcoures = this.coures[0]
    this.getData()
  },
  methods: {

    getData() {
      this.selexpidx = this.selexp
      const data = { 'coures': this.selcoures, 'expidx': this.selexp, 'couresTea': localStorage.getItem('userno') }
      getExpLib(data).then(response => {
        this.expcontent = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    pubExp() {
      var limitinfo = '您确定要发布\n ' + '实验 ' + this.selexp.toString() + '     ??????'
      var mymessage = confirm(limitinfo)
      if (mymessage === true) {
        const data = { 'stuclass': this.selclass, 'selexpidx': this.selexpidx, 'coures': this.selcoures, 'expidx': this.selexp, 'couresTea': localStorage.getItem('userno') }
        publishExp(data).then(response => {
          this.$message(response.data)
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    },
    saveExp() {
      const data = { 'coures': this.selcoures, 'expidx': this.selexp, 'couresTea': localStorage.getItem('userno'), 'expcontent': this.expcontent }
      saveExpLib(data).then(response => {
        // console.log(response.data)
        this.$message({
          type: 'success',
          message: response.data
        })
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      formdata.append('userno', localStorage.getItem('userno'))
      formdata.append('expidx', this.selexp)
      formdata.append('coures', this.selcoures)

      console.log(formdata)
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      recImg(formdata).then(response => {
        this.$refs.md.$img2Url(pos, response.data)

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
.handle-input {
        width: 300px;
        display: inline-block;
    }
</style>
