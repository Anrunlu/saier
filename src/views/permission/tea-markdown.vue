<template>
  <div class="components-container">
    
   <div   >
      <div>
      <el-tag class="tag-title">
          课程选择:
      </el-tag>
        <el-row  >
        
          <el-col :span="6" v-for = "item in coures" :key="item">
            <el-button >{{item}}</el-button>
            
          </el-col>
    
        </el-row>
    </div>

    <div>
    <el-tag class="tag-title">
        作业选择:
      </el-tag>
      <el-radio-group v-model="selexp" v-for = "item in expnum" :key="item">
        <el-radio :label=item>实验{{item}}</el-radio>
        
      </el-radio-group>
    </div>
    <div class="editor-container" v-for = "item in quesAnswers" :key="item">
      <el-tag class="tag-title">
        Basic: {{item.ques}}
      </el-tag>
      <mavon-editor v-model="item.answer" height="300px" />
      <el-row :gutter="8">
      <el-col :span="8" >
        <el-input v-model="item.score" size="small"  placeholder="请输入成绩"></el-input>
       </el-col>
      <el-col :span="16" >
        <el-input v-model="item.comment" autosize size="medium" type = "textarea" placeholder="请输入内容"></el-input>
      </el-col>
      
    </el-row> 
    </div>
      
    </div>

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
import 'mavon-editor/dist/css/index.css'

const content = `
**This is test**

* vue
* element
* webpack

`
const testcontent=[{'ques':'这是一个题目','answer':'这是答案','score':90,'comment':'good'},{'ques':'这是一个题目','answer':'这是答案','score':80,'comment':'good'},{'ques':'这是一个题目','answer':'这是答案','score':70,'comment':'good'}]
const queslist=['1','2','3','4','5','6','7','8','9','10','11','12']
const mycoures=['数据挖掘','算法设计与分析']
export default {
  name: 'MarkdownDemo',
  components: { mavonEditor },
  data() {
    return {
      
      quesAnswers: testcontent,
      quesnum: queslist,
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
  methods: {
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
