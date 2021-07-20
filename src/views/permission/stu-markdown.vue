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
          类型选择:
        </el-tag>
        <el-radio-group v-for="item in tapy" :key="item" v-model="seltapy">
          <el-radio border :label="item" @change="changetapy">{{ item }}</el-radio>
        </el-radio-group>
      </div>
      <!--v-show课堂 预习 实验-->
      <div v-show="homework">
        <div>
          <el-tag class="tag-title">
            作业选择:
          </el-tag>
          <el-radio-group v-for="item in hwnum" :key="item" v-model="selhw1">
            <el-radio border :label="item" @change="changehw1">作业{{ item }}</el-radio>

          </el-radio-group>
        </div>
        <p align="center"><font size="12px" color="blue">本次作业成绩：  {{ totalscore }}</font></p>
        <el-button type="warning" icon="upload" :disabled="!hwswitch" style="bottom: 15px; width: 100%" @click="hwsubmit1">
          提交作业
        </el-button>
        <!-- <mavon-editor ref="md" height="300px" @imgAdd="$imgAdd" /> -->
				<!-- 错题解析 -->
				
				
        <div v-for="(item,index) in quesAnswers" :key="index" class="editor-container" @click="showidx(index)">
          <p align="center"><font color="blue">作业题目：  {{ index+1 }}</font></p>
          <mavon-editor :ref="item.itemname" v-model="item.answer" :editable="hwswitch" oncopy="return false" onpaste="return false" oncut="return false" height="300px" @imgAdd="$imgAdd1" />
          <el-row :gutter="8">
            <el-col :span="8">
              <el-input v-model="item.score" size="small" disabled placeholder="" />
            </el-col>
            <el-col :span="16">
              <el-input v-model="item.comment" autosize size="medium" disabled type="textarea" placeholder="" />
            </el-col>
          </el-row>
          <p align="center"><font color="red">作业提交，并且老师批改后，可编辑错题分析</font></p>
          <div v-show="dispdaan">
            <p align="center"><font color="green">作业题目 {{ index+1 }} 错题分析</font></p>
            <mavon-editor v-model="item.cuoti" :editable="true" height="300px" />
			<div>
			  <el-button type="warning" icon="upload" :disabled="false" style="bottom: 15px; width: 100%" @click="cuotisb">
			    提交分析
			  </el-button>
			</div>
          </div>
		
		  <p align="center"><font color="red">作业提交，并且老师批改后，会将题目答案显示在下方</font></p>
		  <div v-show="dispdaan">
		  			<p align="center"><font color="green">作业题目 {{ index+1 }} 答案</font></p>
		  			<mavon-editor v-model="item.daan" :editable="false" height="300px" />
		  </div>
        </div>
		
	 
        <div>
          <el-button type="warning" icon="upload" :disabled="!hwswitch" style="bottom: 15px; width: 100%" @click="hwsubmit1">
            提交作业
          </el-button>
        </div>
      </div>
      <div v-show="preview">
        <div>
          <div>
            <el-tag class="tag-title">
              预习作业选择:
            </el-tag>
            <el-radio-group v-for="item in hwnum" :key="item" v-model="selhw2">
              <el-radio border :label="item" @change="changehw2">预习{{ item }}</el-radio>
            </el-radio-group>
          </div>
          <el-button type="warning" icon="upload" style="bottom: 15px; width: 100%" @click="hwsubmit2">
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
              <br>
              <br>
            </el-col>
          </el-row>
          <div>
            <el-button type="warning" icon="upload" style="bottom: 15px; width: 100%" @click="hwsubmit2">
              提交预习作业
            </el-button>
          </div>
        </div>
      </div>
      <div v-show="experiment">
        <div>
          <el-tag class="tag-title">
            实验报告选择:
          </el-tag>
          <el-radio-group v-for="item in expnum" :key="item" v-model="selexp">
            <el-radio border :label="item" @change="getData3">实验{{ item }}</el-radio>
          </el-radio-group>
        </div>
        <div class="editor-container">
          <el-tag class="tag-title">
            实验报告
          </el-tag>
          <el-button icon="el-icon-edit" type="warning" style="width:100%" @click="saveStuExp3">保存实验</el-button>
          <el-row :gutter="8">
            <el-col :span="8">
              <el-input v-model="score" class="comment" size="small" disabled placeholder="请输入成绩" />
            </el-col>
            <el-col :span="16">
              <el-input v-model="comment"  class="comment" size="medium" type="textarea" disabled placeholder="请输入评语" />
            </el-col>

          </el-row>
          <mavon-editor ref="md" v-model="expcontent" :scroll-style="true" :editable="expswitch" oncopy="return false" oncut="return false" placeholder="test" height="300px" @imgAdd="$imgAdd3" @save="saveStuExp3" />
          <el-button icon="el-icon-edit" type="warning" style="width:100%" @click="saveStuExp3">保存实验</el-button>
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
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import { recImg, getstuownhw, submitstuownhw, getknowsforstu, submitstuyx, getStuExp, saveStuExp,submitstuowncuoti } from '@/api/hwexp'
import 'mavon-editor/dist/css/index.css'
const testcontent = '这是我的实验报告'
const explist = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
export default {
  name: 'MarkdownDemo',
  components: { mavonEditor },
  data() {
    return {
      expswitch: '',
      score: '',
      comment: '',
      expcontent: testcontent,
      expnum: explist,
      selexp: explist[0],
      hwnum: '',
      stutime: '',
      mavonidx: 0,
      selhw1: 1,
      selhw2: 1,
      selhw3: 1,
      dispdaan: false,
      quesAnswers: [],
      selcoures: '',
      totalscore: '',
      knowpoints: [],
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      ratetexts: ['没有听说过', '听说过', '了解一些', '比较了解', '非常了解'],
      coures: [],
      tapy: ['课堂作业','预习作业','实验'],
      seltapy: '',
      homework: true,
      preview: false,
      experiment: false,
      hwswitch: '',
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      }
      // 预习
      // 实验
    }
  },
  computed: {
    language() {
      return this.languageTypeList['en']
    }
  },
  mounted() {
    // 课堂
    this.coures = JSON.parse(localStorage.getItem('coures'))
    if (!this.coures) {
      alert('温馨提示：出现了一个问题，请点击 “我的主页” ')
    }
    this.selcoures = this.coures[0]
    this.getData1()
    this.seltapy = '课堂作业'
    // 预习
    // 实验
  },
  methods: {
    // 公用
    showidx(index) {
      this.mavonidx = index
      // console.log(this.mavonidx)
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
    getHtm() {
      this.html = this.$refs.markdownEditor.getHtml()
      console.log(this.html)
    },
    changetapy() {
      if (this.seltapy === '课堂作业') {
        this.homework = true
        this.preview = false
        this.experiment = false
        this.getData1()
      }
      if (this.seltapy === '预习作业') {
        this.homework = false
        this.preview = true
        this.experiment = false
        this.getData2()
      }
      if (this.seltapy === '实验') {
        this.homework = false
        this.preview = false
        this.experiment = true
        this.getData3()
      }
    },
    changecoures() {
      this.getData1()
    },
    // 课堂
    getData1() {
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'hwidx': this.selhw1 }
      getstuownhw(data).then(response => {
        // this.tableData = response.data
        this.quesAnswers = response.data.answerlist
		
        // console.log(this.quesAnswers)
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

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    changehw1() {
      this.getData1()
    },
    hwsubmit1() {
      // console.log(this.quesAnswers)
      this.getTime()
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'hwidx': this.selhw1, 'answer': this.quesAnswers, 'stutime': this.stutime }
      console.log(data)
      submitstuownhw(data).then(response => {
        // this.tableData = response.data
        this.$message(response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
	cuotisb() {
	  // console.log(this.quesAnswers)
	  this.getTime()
	  const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'hwidx': this.selhw1, 'answer': this.quesAnswers, 'stutime': this.stutime }
	  console.log(data)
	  submitstuowncuoti(data).then(response => {
	    // this.tableData = response.data
	    this.$message(response.data)
	    setTimeout(() => {
	      this.listLoading = false
	    }, 1.5 * 1000)
	  })
	},
    $imgAdd1(pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      formdata.append('userno', localStorage.getItem('userno'))
      formdata.append('expidx', this.selhw)
      formdata.append('coures', this.selcoures)

      // console.log(formdata)
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      recImg(formdata).then(response => {
        this.$refs.itemname[this.mavonidx].$img2Url(pos, response.data)

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 预习
    getData2() {
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'hwidx': this.selhw2 }
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
    changehw2() {
      this.getData2()
    },
    hwsubmit2() {
      // console.log(this.quesAnswers)
      this.getTime()
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'hwidx': this.selhw2, 'answer': this.knowpoints, 'stutime': this.stutime }
      console.log(data)
      submitstuyx(data).then(response => {
        // this.tableData = response.data
        this.$message('预习作业提交完成')
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    // 实验
    getData3() {
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
    saveStuExp3() {
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
    },
    $imgAdd3(pos, $file) {
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
