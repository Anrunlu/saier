<template>
  <div>
    <div>

      <el-tag class="tag-title">
        课程选择:
      </el-tag>
      <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
        <el-radio border :label="item" @change="coureschange">{{ item }}</el-radio>
      </el-radio-group><br>
    </div>

    <div>
      <el-radio-group v-model="contentRadio" @change="contentSelect">

        <el-radio border :label="1">课件</el-radio>
        <el-radio border :label="2">主要内容</el-radio>
      </el-radio-group>

    </div>
    <br>

    <div v-show="kejianShow">
      <div>
        <el-tag class="tag-title">
          课件选择:
        </el-tag>
        <el-radio-group v-for="(item,index) in kejianlist" :key="index" v-model="selkj">
          <el-radio border :label="item.title" @change="kjChange">{{ item.title.split('|')[0] }}</el-radio>
        </el-radio-group><br>
      </div>
      <br>
      <div v-show="fortea">
        <!-- <el-radio-group v-model="kejianRadio" @change="kejianSelect">

          <el-radio border label="add">新建课件</el-radio>
          <el-radio border label="edit">修改课件</el-radio>

        </el-radio-group> -->
        <el-button type="success" @click="addKejian">新建课件</el-button>
        <!-- <el-button type="warning" @click="editKejian">修改课件</el-button>  -->
        <el-button type="danger" @click="delKejian">删除课件</el-button>
        <!-- <el-button type="warning" @click="fabuKejian">发布课件</el-button> -->
      </div>
      <div v-show="uploadShow">

        <div style="color:blue;font:bold 50px 宋体;;text-align:center">课件上传</div>
        <uploader :options="options" class="uploader-example" @file-success="onFileSuccess">
          <uploader-unsupport />
          <uploader-drop>
            <p style="color:red">注意：在上传PPT课件时，1. 将PPT课件另存为png格式，得到该课件的一个文件夹（里面是每张PPT的png格式），2. 上传文件夹即可.</p>
            <p>将课件拖到这里或者</p>
            <uploader-btn :directory="true">选择课件文件夹</uploader-btn>
            <uploader-btn :attrs="attrs">选择文件</uploader-btn>
          <!-- <uploader-btn :attrs="attrs">select images</uploader-btn> -->

          </uploader-drop>
          <uploader-list />
        </uploader>
      </div>
      <!-- <div v-show="delKjShow">
        <div style="color:blue;font:bold 50px 宋体;;text-align:center">课件上传</div>
          <el-input v-model="kjtitle" disabled="" class="handle-input mr10" />
      </div> -->
      <div>
        <div style="color:green;font:bold 50px 宋体;;text-align:center">我的课件</div>
        <br>
        <el-row :gutter="8">

          <el-col :span="4">
            <el-button type="warning" @click="preSlide">上一张</el-button>
          </el-col>
          <el-col :span="18">
            <p style="color:red;font:bold 20px 宋体;text-align:center"> {{ kjSlideIdx }}/{{ curKjSlideNum }}</p>
            <img style="width:80%;height:80%;align:center;border:5px solid black" :src="kejianpic">
          </el-col>
          <el-col :span="2">
            <el-button type="warning" @click="nextSlide">下一张</el-button>
          </el-col>
        </el-row>
      </div>

      <el-dialog
        title="请输入课件名称"
        :visible.sync="addKjShow"
        width="30%"
      >
        <el-input v-model="kjtitle" placeholder="请输入课件名称" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="kjTitleConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- <iframe

        :src="mytesturl"
        frameborder="0"
        class="pc iframe"
        scrolling="auto"
        security="restricted"
        sandbox="allow-scripts allow-top-navigation allow-same-origin "
      /> -->
    </div>
    <div v-show="contentShow">
      <div>
        <el-radio-group v-for="item in 18" :key="item" v-model="selchapter">
          <el-radio border :label="item" @change="chapterChange">第{{ item }}章</el-radio>
        </el-radio-group>
      </div><br>
      <mavon-editor ref="md" v-model="chapterContent" placeholder="本章内容正在编写中，请耐心等待..." :editable="hwswitch" height="300px" @imgAdd="$imgAdd" @save="submitChapter" />
      <el-button style="width:100%" :disabled="confirmswitch" type="danger" @click="submitChapter">确认修改</el-button>
    </div>
  </div>

</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { recImg, submitchaptercontent, getchaptercontent, dataForKeJian, kejianHandle, stuGetKjChap } from '@/api/hwexp'

export default {
  name: 'Mykejian',
  components: { mavonEditor },
  data() {
    return {
      kejianpic: '',
      kejianRadio: '',
      handle: '',
      fortea: false,
      uploadShow: false,
      addKjShow: false,
      delKjShow: false,
      kjtitle: '',
      kejianlist: [],
      kjSlideIdx: 1,
      curKjSlideNum: 0,
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: 'http://39.104.151.240:9000/kejianupload',
        testChunks: false, // 不校验
        chunkSize: '10240000',
        simultaneousUploads: 3,
        query: {// 传参
          kejianidx: 1,
          userno: localStorage.getItem('userno'),
          coures: '',
          kjtitle: ''
        }
      },
      attrs: {
        accept: 'image/*'// 接受文件类型
      },
      mytesturl: '',
      coures: '',
      selcoures: '',
      chapterContent: '',
      selkj: '',
      selchapter: 1,
      hwswitch: false,
      confirmswitch: true,
      contentRadio: 1,
      contentShow: false,
      kejianShow: true
      //   toolbars: {
      //     readmodel: true,
      //     preview: true,
      //     subfield: true

    //   }
    }
  },
  mounted() {
    this.coures = JSON.parse(localStorage.getItem('coures'))
    this.selcoures = this.coures[0]
    if (localStorage.getItem('type') === 'tea') {
      this.fortea = true
      this.hwswitch = true
      this.confirmswitch = false
      this.options.query.kejianidx = 1
      this.options.query.coures = this.selcoures
      this.getChapterData()
      this.getKjData()
    } else {
      this.fortea = false
      this.stuGetData()
    }

    // this.mytesturl = '../' + this.selcoures + '_' + this.selchapter.toString() + '/index.html'
  },
  methods: {

    preSlide() {
      this.kjSlideIdx = this.kjSlideIdx - 1
      if (this.kjSlideIdx < 1) {
        alert('已是第一张')
      } else {
        var version = Math.random()

        this.kejianpic = 'http://www.graph-edu.cn:3600/static/kejian/' + this.selkj.split('|')[1] + '_' + this.selcoures + '_' + this.selkj.split('|')[0] + '_' + '幻灯片' + this.kjSlideIdx + '.PNG?' + version
      }
    },
    nextSlide() {
      this.kjSlideIdx = this.kjSlideIdx + 1
      if (this.kjSlideIdx >= this.curKjSlideNum) {
        alert('已是最后一张')
      } else {
        var version = Math.random()
        if (localStorage.getItem('type') === 'tea') {
          this.kejianpic = 'http://www.graph-edu.cn:3600/static/kejian/' + this.selkj.split('|')[1] + '_' + this.selcoures + '_' + this.selkj.split('|')[0] + '_' + '幻灯片' + this.kjSlideIdx + '.PNG?' + version
        } else {
          this.kejianpic = 'http://www.graph-edu.cn:3600/static/kejian/' + this.selkj.split('|')[1] + '_' + this.selcoures + '_' + this.selkj.split('|')[0] + '_' + '幻灯片' + this.kjSlideIdx + '.PNG?' + version
        }
      }
    },
    kjChange() {
      // console.log(this.selkj)
      this.kjSlideIdx = 1
      this.curKjSlideNum = this.kejianlist.find(item => item.title === this.selkj).num
      // console.log(this.curKjSlideNum, this.kejianlist, this.selkj)
      var version = Math.random()
      this.kejianpic = 'http://www.graph-edu.cn:3600/static/kejian/' + this.selkj.split('|')[1] + '_' + this.selcoures + '_' + this.selkj.split('|')[0] + '_' + '幻灯片' + this.kjSlideIdx + '.PNG?' + version
    },
    kjTitleConfirm() {
      if (this.kjtitle === '') {
        alert('如果上传新课件，请填写课件名称；如果修改课件，请选择要修改的课件')
      } else {
        this.addKjShow = false
        this.uploadShow = true
        this.options.query.kjtitle = this.kjtitle
        const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'kjtitle': this.kjtitle, 'handle': this.handle }
        kejianHandle(data).then(response => {
        // this.tableData = response.data
          this.kejianlist = response.data

          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      }
    },
    // kejianSelect() {
    //   if ((this.kejianRadio === 'add') || (this.kejianRadio === 'edit')) {
    //     this.addKjShow = true
    //     this.delKjShow = false
    //   } else {
    //     this.addKjShow = false
    //     this.delKjShow = true
    //   }
    // },
    delKejian() {
      this.handle = 'del'
      this.addKjShow = false
      this.delKjShow = true
      this.kjtitle = this.selkj
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'kjtitle': this.kjtitle, 'handle': this.handle }
      kejianHandle(data).then(response => {
        // this.tableData = response.data
        this.kejianlist = response.data

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    addKejian() {
      this.handle = 'add'
      this.kjtitle = ''
      this.addKjShow = true
      this.delKjShow = false
      // const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'kjtitle': this.kjtitle, 'handle': this.handle }
      // kejianHandle(data).then(response => {
      //   // this.tableData = response.data
      //   this.kejianlist = response.data

      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    },
    editKejian() {
      this.handle = 'edit'
      this.addKjShow = true
      this.delKjShow = false
      if (this.selkj) {
        this.kjtitle = this.selkj
      } else {
        this.kjtitle = ''
        // console.log(this.kjtitle)
      }
      // const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'kjtitle': this.kjtitle, 'handle': this.handle }
      // kejianHandle(data).then(response => {
      //   // this.tableData = response.data
      //   this.kejianlist = response.data

      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })
    },
    onFileSuccess(rootFile, file, message, chunk) {
      // console.log('complete', rootFile, file, message, chunk)

    },
    getKjData() {
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures }

      dataForKeJian(data).then(response => {
        // this.tableData = response.data
        this.kejianlist = response.data
        // console.log(this.kejianlist)

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    submitChapter() {
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'chapidx': this.selchapter, 'content': this.chapterContent }
      submitchaptercontent(data).then(response => {
        // this.tableData = response.data
        this.$message(response.data)

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    chapterChange() {
      // this.options.query.kejianidx = 1
      if (localStorage.getItem('type') === 'tea') {
        this.getChapterData()
      // this.getKjData()
      } else {
        this.stuGetData()
      }
    },

    contentSelect() {
      this.kejianShow = !this.kejianShow
      this.contentShow = !this.contentShow
      this.options.query.kejianidx = this.selchapter
      this.options.query.coures = this.selcoures
      if (localStorage.getItem('type') === 'tea') {
        if (this.contentRadio === 1) {
          this.getKjData()
        } else {
          this.getChapterData()
        }
      } else {
        this.stuGetData()
      }
    },
    coureschange() {
      // console.log(this.selcoures)
    //   this.getData()
      if (localStorage.getItem('type') === 'tea') {
        this.getChapterData()
        this.getKjData()
      } else {
        this.stuGetData()
      }
    },
    stuGetData() {
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'chapidx': this.selchapter }
      stuGetKjChap(data).then(response => {
        // this.tableData = response.data
        this.chapterContent = response.data.chapter
        this.kejianlist = response.data.kejian
        // console.log(response.data)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getChapterData() {
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'chapidx': this.selchapter }
      getchaptercontent(data).then(response => {
        // this.tableData = response.data
        this.chapterContent = response.data

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
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
    }

  }

}
</script>

<style >
.iframe {
    position: absolute;
    left: 5%;
    right: 5%;
    top: 20%;
    bottom: 10%;
    width: 80%;
    height: 80%;
    background: #fff;
    overflow-y: hidden;
}
.uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .handle-input {
        width: 300px;
        display: inline-block;
    }
  .mr10{
        margin-right: 10px;
    }

</style>
