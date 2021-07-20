<template>
  <div class="components-container">
    <el-row :gutter="6">

      <el-col :span="20">
        <span>{{ stuno }}   {{ stuname }}  ----实验提交时间：{{ exptime }}</span>
        <font color="red">{{ cur_page }}/{{ userlist.length }}</font>
        <div style="height:150px">
          <el-tag class="tag-title">
            实验报告选择:
          </el-tag>
          <el-radio-group v-for="item in expnum" :key="item" v-model="selexp">
            <el-radio border :label="item" @change="getData">实验{{ item }}</el-radio>

          </el-radio-group>

        </div>
        <el-row :gutter="6">
          <el-col :span="4">
            <el-input v-model="score" size="small" placeholder="请输入成绩" />
          </el-col>
          <el-col :span="5">
            <el-input v-model="comment" autosize size="medium" type="textarea" placeholder="请输入评语" />
          </el-col>
          <el-col :span="3">
            <el-button type="warning" icon="el-icon-edit" @click="commentSubmit">提交批改</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="prestu">
              上一位
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="nextstu">
              下一位
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-edit" @click="expOpen">开放实验</el-button>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-edit" @click="expClose">关闭实验</el-button>
          </el-col>
        </el-row>

      </el-col>
      <el-col :span="4">
        <img style="width:200px;height:200px" :src="imgUrl">
      </el-col>
    </el-row>

    <div>

      <div class="editor-container">

        <!-- <el-radio-group v-for="item in scorel" :key="item" v-model="scorev">
          <el-radio border :label="item" @change="correct">{{ item }}</el-radio>
        </el-radio-group> -->

        <el-slider v-model="score" />
        <mavon-editor v-model="expcontent" :editable="expswitch" height="300px" @save="commentSubmit" />
        <el-row :gutter="6">
          <el-col :span="4">
            <el-input v-model="score" size="small" placeholder="请输入成绩" />
          </el-col>
          <el-col :span="5">
            <el-input v-model="comment" autosize size="medium" type="textarea" placeholder="请输入评语" />
          </el-col>
          <el-col :span="3">
            <el-button type="warning" icon="el-icon-edit" @click="commentSubmit">提交批改</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="prestu">
              上一位
            </el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="nextstu">
              下一位
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-edit" @click="expOpen">开放实验</el-button>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-edit" @click="expClose">关闭实验</el-button>
          </el-col>
        </el-row>
        <div>
          <div>
            <!-- <el-radio-group v-for="item in scorel" :key="item" v-model="scorev">
              <el-radio border :label="item" @change="correct">{{ item }}</el-radio>

            </el-radio-group> -->
            <el-slider v-model="score" />
          </div>
          <el-tag class="tag-title">
            实验报告选择:
          </el-tag>
          <el-radio-group v-for="item in expnum" :key="item" v-model="selexp">
            <el-radio border :label="item" @change="getData">实验{{ item }}</el-radio>
          </el-radio-group>
        </div>
        <span>{{ stuno }}   {{ stuname }}  ----实验提交时间：{{ exptime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import MarkdownEditor from '@/components/MarkdownEditor'
// eslint-disable-next-line no-unused-vars
import { getExpList, getStuExpForTea, expCommentSubmit, expOpenSwitch, expCloseSwitch } from '@/api/hwexp'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// eslint-disable-next-line no-unused-vars
const content = `
**This is test**

* vue
* element
* webpack

`
// eslint-disable-next-line no-unused-vars
const testcontent = localStorage.getItem('stuno')
const scorelist = [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -12, -14, -15, -18, -19, -20]
const explist = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const mycoures = ['数据挖掘', '算法设计与分析']
export default {
  name: 'MarkdownDemo',
  components: { mavonEditor },
  data() {
    return {
      imgUrl: '',
      score: 100,
      comment: 'good',
      expswitch: '',
      stuno: '',
      stuname: '',
      exptime: '',
      expcontent: '',
      expnum: explist,
      cur_page: parseInt(localStorage.getItem('useridx')),
      userlist: '',
      scorel: scorelist,
      scorev: '',
      selexp: explist[0],
      selcourse: mycoures[0],
      coures: mycoures,
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
    this.getData()
  },
  methods: {
    prestu() {
      if (this.cur_page >= 1) {
        this.cur_page = this.cur_page - 1
        localStorage.setItem('useridx', this.cur_page)
        this.getData()
      } else {
        alert('已是第一位同学')
      }
      // console.log(this.cur_page)

      // let data={'userno':this.hwdata.userno,'hwswitch':false,'hwindex':this.value};
      // this.$axios.post('http://39.104.151.240:5000/hwcontrol',data).then((res)=>{

      //   console.log(res)

      // //this.$axios.post('http://192.168.101.2:5000/rec_hwanswer',data).then((res)=>{
      // alert('作业已打开');

      // });
    },
    nextstu() {
      // console.log(this.userlist.length)
      if (this.cur_page < this.userlist.length - 1) {
        this.cur_page = this.cur_page + 1
        localStorage.setItem('useridx', this.cur_page)
        this.getData()
        // console.log(this.teaid)
      } else {
        alert('已是最后一位同学')
      }
      // console.log(this.cur_page)
      //   let data={'userno':this.hwdata.userno,'hwswitch':true,'hwindex':this.value};
      // this.$axios.post('http://39.104.151.240:5000/hwcontrol',data).then((res)=>{

      //   console.log(res)
      // //this.$axios.post('http://192.168.101.2:5000/rec_hwanswer',data).then((res)=>{
      // alert('作业已关闭');

      // });
    },
    getData() {
      const data = { 'userno': this.userlist[this.cur_page], 'coures': localStorage.getItem('stucoures'), 'expidx': this.selexp, 'couresTea': localStorage.getItem('userno'), 'cur_page': this.cur_page }
      getStuExpForTea(data).then(response => {
        this.expcontent = response.data.expwork.expdata
        this.exptime = response.data.expwork.stutime
        this.score = response.data.expwork.expscore
        this.comment = response.data.expwork.expcomment
        this.expswitch = response.data.expwork.expswitch
        this.stuno = response.data.stuno
        this.stuname = response.data.stuname
        this.imgUrl = response.data.imgUrl
        // console.log(response.data.expwork)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    correct() {
      console.log(this.scorev)
      this.score = (100 + this.scorev).toString()
      this.commentSubmit()
      this.scorev = ''
    },
    commentSubmit() {
      const data = { 'userno': this.userlist[this.cur_page], 'coures': localStorage.getItem('stucoures'), 'expidx': this.selexp, 'couresTea': localStorage.getItem('userno'), 'expcomment': this.comment, 'expscore': this.score, 'expcontent': this.expcontent }
      console.log(data)
      expCommentSubmit(data).then(response => {
        this.$message({
          type: 'success',
          message: '提交批改成功'
        })
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
        // eslint-disable-next-line indent
        })
    },
    expOpen() {
      const data = { 'userno': localStorage.getItem('stuno'), 'coures': localStorage.getItem('stucoures'), 'expidx': this.selexp, 'couresTea': localStorage.getItem('userno') }
      expOpenSwitch(data).then(response => {
        this.expswitch = response.data
        this.$message({
          type: 'success',
          message: '实验打开成功'
        })

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    expClose() {
      const data = { 'userno': localStorage.getItem('stuno'), 'coures': localStorage.getItem('stucoures'), 'expidx': this.selexp, 'couresTea': localStorage.getItem('userno') }
      expCloseSwitch(data).then(response => {
        this.expswitch = response.data
        this.$message({
          type: 'success',
          message: '实验关闭成功'
        })
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
