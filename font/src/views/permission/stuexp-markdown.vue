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
          <el-radio border :label="item" @change="getData">实验{{ item }}</el-radio>

        </el-radio-group>
      </div>

      <div class="editor-container">
        <el-tag class="tag-title">
          实验报告
        </el-tag>
        <el-button icon="el-icon-edit" type="warning" style="width:100%" @click="saveStuExp">保存实验</el-button>
        <el-row :gutter="8">
          <el-col :span="8">
            <el-input v-model="score" class="comment" size="small" disabled placeholder="请输入成绩" />
          </el-col>
          <el-col :span="16">
            <el-input v-model="comment"  class="comment" size="medium" type="textarea" disabled placeholder="请输入评语" />
          </el-col>

        </el-row>
        <mavon-editor ref="md" v-model="expcontent" :scroll-style="true" :editable="expswitch" oncopy="return false" oncut="return false" placeholder="test" height="300px" @imgAdd="$imgAdd" @save="saveStuExp" />
        <el-button icon="el-icon-edit" type="warning" style="width:100%" @click="saveStuExp">保存实验</el-button>
        <el-row :gutter="8">
          <el-col :span="8">
            <el-input v-model="score" class="comment" size="small" disabled placeholder="请输入成绩" />
          </el-col>
          <el-col :span="16">
            <el-input v-model="comment" autosize size="medium" type="textarea" disabled placeholder="请输入评语" />
          </el-col>

        </el-row>
      </div>

    </div>

    <!--
                    <mavon-editor :scrollStyle="true" placeholder="test"
                        v-model="content" ref="md" @save="submit" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/> -->

    <!-- <div class="editor-container">
      <el-tag class="tag-title">
        Markdown Mode:
      </el-tag>
      <markdown-editor ref="markdownEditor" v-model="content2" :options="{hideModeSwitch:true,previewStyle:'tab'}" height="200px" />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">
        Customize Toolbar:
      </el-tag>
      <markdown-editor v-model="content3" :options="{ toolbarItems: ['heading','bold','italic']}" />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">
        I18n:
      </el-tag>
      <el-alert
        :closable="false"
        title="You can change the language of the admin system to see the effect"
        type="success"
      />
      <markdown-editor ref="markdownEditor" v-model="content4" :language="language" height="300px" />
    </div>

    <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getHtml">
      Get HTML
    </el-button>
    <div v-html="html" /> -->
  </div>
</template>

<script>
// import MarkdownEditor from '@/components/MarkdownEditor'
import { mavonEditor } from 'mavon-editor'
import { getStuExp, saveStuExp, recImg } from '@/api/hwexp'
import 'mavon-editor/dist/css/index.css'

const content = `
**This is test**

* vue
* element
* webpack

`
const testcontent = '这是我的实验报告'
const explist = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const mycoures = ['数据挖掘', '算法设计与分析']
export default {
  name: 'MarkdownDemo',
  components: { mavonEditor },
  data() {
    return {
      expswitch: '',
      score: '',
      comment: '',
      stutime: '',
      expcontent: testcontent,
      expnum: explist,
      selexp: explist[0],
      selcoures: '',
      coures: [],
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
    if (!this.coures) {
      alert('温馨提示：出现了一个问题，请点击 “我的主页” ')
    }
    this.selcoures = this.coures[0]

    this.getData()
  },
  methods: {
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
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
      const data = { 'coures': this.selcoures, 'expidx': this.selexp, 'userno': localStorage.getItem('userno') }
      // console.log(this.selcoures)
      getStuExp(data).then(response => {
        this.expcontent = response.data.expdata
        this.score = response.data.expscore
        this.comment = response.data.expcomment
        this.expswitch = response.data.expswitch
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    saveStuExp() {
      const data = { 'coures': this.selcoures, 'expidx': this.selexp, 'userno': localStorage.getItem('userno'), 'expdata': this.expcontent, 'stutime': 'nouse' }
      saveStuExp(data).then(response => {
        this.$message({
          type: 'success',
          message: response.data
        })
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>

<style scoped>
.input{
 
            color: red;/*输入文字、光标颜色*/
            -webkit-text-fill-color: blue;/*输入文字、placeholder颜色*/
            caret-color: yellow;/*光标颜色*/

}
.editor-container{
  margin-bottom: 30px;
}
.comment{
  height: 40px;
  line-height: 40px;
  font-size: 26px;
  color:rgb(221, 25, 25);
  

}
.tag-title{
  margin-bottom: 5px;
}
</style>
