<template>
  <div>
    <div>

      <el-tag class="tag-title">
        课程选择:
      </el-tag>
      <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
        <el-radio border :label="item">{{ item }}</el-radio>

      </el-radio-group>
    </div>
    <div style="color:black;font:bold 50px 宋体;;text-align:center">题目</div>
    <el-radio-group v-for="(item,index) in questypes" :key="index" v-model="radio" @change="changeHandler">
      <el-radio border :label="item[3]">题目类型{{ item }}</el-radio>
    </el-radio-group>

    <br><br><br><br><br>

    <div v-show="firstshow">
      <div v-if="radio=='1'">
        <h2 align="Center">计算题</h2>
      </div>
      <div v-else-if="radio=='2'">
        <h2 align="Center">简答题</h2>
      </div>
      <div v-else-if="radio=='3'">
        <h2 align="Center">程序题</h2>
      </div>
      <div v-else-if="radio=='4'">
        <h2 align="Center">填空题</h2>
      </div>
      <div v-else-if="radio=='5'">
        <h2 align="Center">选择题</h2>
      </div>

      <div v-else-if="radio=='6'">
        <h2 align="Center">判断题</h2>
      </div>

      <el-form>

        <el-form-item label="题目">
          <!-- <el-input v-model="question" autosize type="textarea" placeholder="请输入题目"></el-input> -->
          <mavon-editor ref="mdq" v-model="question" :scroll-style="true" placeholder="请输入题目" height="300px" @imgAdd="$imgAdd" />
        </el-form-item>

        <el-form-item label="答案">
          <!-- <el-input v-model="answer" autosize type="textarea" placeholder="请输入答案"></el-input> -->
          <mavon-editor ref="mda" v-model="answer" :scroll-style="true" height="300px" @imgAdd="$imgAdda" />
        </el-form-item>

        <el-form-item label="知识点">
          <el-input v-model="knowledge" autosize type="textarea" placeholder="请输入知识点，以空格分开" />
        </el-form-item>
        <el-form-item label="分值">
          <el-input v-model="score" placeholder="请输入题目分值" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div v-show="secondshow">

      <div v-if="radio=='5'">
        <h2 align="Center">选择题</h2>
      </div>

      <el-form>

        <el-form-item label="题目">
          <!-- <el-input v-model="question" autosize type="textarea" placeholder="请输入题目"></el-input> -->
          <mavon-editor ref="mdq" v-model="question" :scroll-style="true" placeholder="输入题目，并在题目结尾，按回车键，然后输入 6个星号 ******，再回车" height="300px" @imgAdd="$imgAdd" />
        </el-form-item>

        <el-form-item label="选项1">
          <el-input v-model="option1" autosize type="textarea" placeholder="请输入选项1" />
        </el-form-item>

        <el-form-item label="选项2">
          <el-input v-model="option2" autosize type="textarea" placeholder="请输入选项2" />
        </el-form-item>

        <el-form-item label="选项3">
          <el-input v-model="option3" autosize type="textarea" placeholder="请输入选项3" />
        </el-form-item>

        <el-form-item label="选项4">
          <el-input v-model="option4" autosize type="textarea" placeholder="请输入选项4" />
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="answer" autosize type="textarea" placeholder="请输入题目答案, 这里输入答案内容，而不是A B C D" />
        </el-form-item>
        <el-form-item label="知识点">
          <el-input v-model="knowledge" autosize type="textarea" placeholder="请输入知识点" />
        </el-form-item>
        <el-form-item label="分值">
          <el-input v-model="score" placeholder="请输入题目分值" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>

      </el-form>
    </div>

  </div>

</template>

<script>
import { getOneQues, addQues, recImg } from '@/api/hwexp'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const questype = ['计算题1', '简单题2', '程序题3', '填空题4', '选择题5', '判断题6']
// const questypename = ['计算题', '简答题', '填空题', '选择题', '编程题', '判断题']

export default {
  name: 'QuestionBase',
  components: { mavonEditor },
  props: ['famsg'],
  data() {
    return {

      selcoures: '',
      selexp: '题库',
      coures: ['算法设计与分析', '数据挖掘'],
      quescoures: '',
      questypes: questype,
      radio: questype[0],
      active: 1,
      firstshow: true,
      secondshow: false,
      quesNo: '',
      question: '',
      answer: '',
      knowledge: '',
      score: '',
      option1: '',
      option2: '',
      option3: '',
      option4: ''

    }
  },
  mounted() {
    this.coures = JSON.parse(localStorage.getItem('coures'))
    // console.log(this.coures)
    this.selcoures = this.coures[0]

    this.getData()
  },

  methods: {
    $imgAdd(pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      formdata.append('userno', localStorage.getItem('userno'))
      formdata.append('expidx', this.selexp)
      formdata.append('coures', this.selcoures)

      console.log(formdata)
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      recImg(formdata).then(response => {
        this.$refs.mdq.$img2Url(pos, response.data)

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    $imgAdda(pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      formdata.append('userno', localStorage.getItem('userno'))
      formdata.append('expidx', this.selexp)
      formdata.append('coures', this.selcoures)

      console.log(formdata)
      // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
      recImg(formdata).then(response => {
        this.$refs.mda.$img2Url(pos, response.data)

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    changeHandler(value) {
      var self = this
      if ((self.radio === '1') || (self.radio === '3') || (self.radio === '4') || (self.radio === '2') || (self.radio === '6')) { self.firstshow = true; self.secondshow = false }
      if (self.radio === '5') { self.firstshow = false; self.secondshow = true }
      // console.log('改变之后的值是:' + value)
      this.quesNo = ''
      this.question = ''
      this.answer = ''
      this.knowledge = ''
      this.score = ''
      this.option1 = ''
      this.option2 = ''
      this.option3 = ''
      this.option4 = ''
    },
    getData() {
      const quesNo = localStorage.getItem('quesNo')
      this.quesNo = quesNo
      if (quesNo !== '0') {
        if (quesNo[0] === 'p') {
          this.radio = '3'
        } else if (quesNo[0] === 'c') {
          this.radio = '1'
        } else if (quesNo[0] === 'a') {
          this.radio = '2'
        } else if (quesNo[0] === 'f') {
          this.radio = '4'
        } else if (quesNo[0] === 's') {
          this.radio = '5'
        } else if (quesNo[0] === 'j') {
          this.radio = '6'
        }
        // console.log(localStorage.getItem('coures'))
        const data = { 'quesNo': localStorage.getItem('quesNo') }
        // 这里用Get,可以获取到本地的json文件中的内容。
        getOneQues(data).then(response => {
          if (this.radio === '5') {
            this.firstshow = false
            this.secondshow = true
            this.question = response.data.question.pre_ques
          } else {
            this.question = response.data.question
          }
          this.answer = response.data.answer
          this.knowledge = response.data.knowledge
          this.score = response.data.score
          this.quescoures = response.data.coures
          if (response.data.question.sel_ques) {
            this.option1 = response.data.question.sel_ques[0]

            this.option2 = response.data.question.sel_ques[1]

            this.option3 = response.data.question.sel_ques[2]

            this.option4 = response.data.question.sel_ques[3]
          }
          // console.log(this.option1)
          // this.radio=response.data.radio
          // if(this.radio==2) {self.firstshow=false;self.secondshow=true;}
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else {
        this.radio = '1'
        console.log(this.radio)
      }
    },
    showdetail() {
      this.$router.replace('/stupapertable')
    },
    onSubmit() {
      const data = { 'quesNo': this.quesNo, 'radio': this.radio, 'userno': localStorage.getItem('userno'), 'question': this.question, 'answer': this.answer, 'knowledge': this.knowledge.trim(), 'score': this.score, 'option1': this.option1, 'option2': this.option2, 'option3': this.option3, 'option4': this.option4, 'coures': this.selcoures }

      addQues(data).then(response => {
        if (response.code === 20000) {
          this.$message('提交成功')
          this.question = ''
          this.answer = ''
          this.knowledge = ''
          this.score = ''
          this.option1 = ''
          this.option2 = ''
          this.option3 = ''
          this.option4 = ''
          this.quesNo = ''
          // localStorage.removeItem('examno')
          // alert('题目编辑完成')
        } else {
          this.$message('提交失败')
        }
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
