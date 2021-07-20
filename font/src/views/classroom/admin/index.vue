<template>
  <div>
    <!-- 选课选课件 -->
    <div v-show="button_selsct">
      <div>
        <el-tag class="tag-title">
          课程选择:
        </el-tag>
        <el-radio-group v-for="item in coures" :key="item" v-model="selcoures">
          <el-radio border :label="item" @change="coureschange">{{ item }}</el-radio>
        </el-radio-group><br>
      </div>
      <div>
        <el-tag class="tag-title">
          课件选择:
        </el-tag>
        <el-radio-group v-for="(item,index) in kejianlist" :key="index" v-model="selkj">
          <el-radio border :label="item.title" @change="kjChange">{{ item.title.split('|')[0] }}</el-radio>
        </el-radio-group><br>
      </div>
      <div>
        <el-tag class="tag-title">
          班级选择:
        </el-tag>
        <el-radio-group v-for="item2 in classes" :key="item2.value" v-model="selclass">
          <el-radio border :label="item2.label" @change="changeClass">{{ item2.value }}</el-radio>
        </el-radio-group>
      </div>
      <el-button type="success" @click="toSignin">确定</el-button>
    </div>
    <div v-show="signin">
      <el-button type="success" @click="start" :disabled="signin_button">签到</el-button>
      <el-button type="warning" @click="toKejian">开课</el-button>
      <div style="width: 100%; position: relative">
        <el-table :data="TableData" border stripe style="position: absolute; margin-left: 25%; width: 50%">
          <el-table-column prop="userno" label="未签到学号" style="width: 50%" />
          <el-table-column prop="username" label="未签到姓名" style="width: 50%" />
        </el-table>
      </div>
    </div>
    <div v-show="kejian" style="height: 100%">
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
      <el-button type="warning" @click="toSelect">下课</el-button>
      <div class="chat-box">
        <header>班级聊天室</header>
        <div ref="msg-box" class="msg-box">
          <div class="msg">
            <div class="user-head">
              <span class="left">
                林志炫
                <!--{{ i.content }}-->
              </span>
            </div>
            <div class="user-msg">
              <span class="'left">
                我有个超长长长长长长长长长长长长长长长长长长长长长长长长的问题我有个超长长长长长长长长长长长长长长长长长长长长长长长长的问题
                <!--{{ i.content }}-->
              </span>
            </div>
          </div>
        </div>
        <div class="input-box">
          <input ref="sendMsg" v-model="contentText" type="text" @keyup.enter="sendText()">
          <div class="btn" :class="{['btn-active']:contentText}" @click="sendText()">发送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css'
import { dataForKeJian, getClassList, getStuList } from '@/api/hwexp'
export default {
  name: 'AdminClassroom',
  data() {
    return {
      // 判断某部分是否显示的参数
      signin_button: false,
      button_selsct: true,
      signin: false,
      kejian: false,
      // 课件
      kejianpic: '',
      uploadShow: false,
      kjtitle: '',
      kejianlist: [],
      kjSlideIdx: 1,
      curKjSlideNum: 0,
      coures: '',
      selcoures: '',
      selkj: '',
      classes: [],
      selclass: '',
      TableData: [],
      // 关于签到
      wsSign: null,
      // 关于聊天室
      ws: null,
      contentText: '', // input输入的值
      username: 'teacher',
      teacher: '',
      // 关于翻页
      wsPage: ''
    }
  },
  mounted() {
    this.coures = JSON.parse(localStorage.getItem('coures'))
    this.teacher = JSON.parse(localStorage.getItem('userno'))
    this.selcoures = this.coures[0]
    if (localStorage.getItem('type') === 'tea') {
      this.getKjData()
    }
    this.getDatahw()
    // this.mytesturl = '../' + this.selcoures + '_' + this.selchapter.toString() + '/index.html'
  },
  destroyed() {
  },
  methods: {
    // 课程更改
    coureschange() {
      // console.log(this.selcoures)
    //   this.getData()
      if (localStorage.getItem('type') === 'tea') {
        this.getKjData()
        this.getDatahw()
      }
    },
    // 获取专业和课件数据
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
    // 班级改变
    changeClass() {
      localStorage.setItem('selclass', this.selclass)
    },
    // 获取班级列表
    getDatahw() {
      // let data={'site':localStorage.getItem('site')};
      const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures }
      getClassList(data).then(response => {
        this.classes = response.data.classes
      })
    },
    // 选择课件
    kjChange() {
      // console.log(this.selkj)
      this.kjSlideIdx = 1
      this.curKjSlideNum = this.kejianlist.find(item => item.title === this.selkj).num
      // console.log(this.curKjSlideNum, this.kejianlist, this.selkj)
      var version = Math.random()
      this.kejianpic = 'http://www.graph-edu.cn:3600/static/kejian/' + this.selkj.split('|')[1] + '_' + this.selcoures + '_' + this.selkj.split('|')[0] + '_' + '幻灯片' + this.kjSlideIdx + '.PNG?' + version
    },
    // 课件翻页
    preSlide() {
      this.kjSlideIdx = this.kjSlideIdx - 1
      if (this.kjSlideIdx < 1) {
        alert('已是第一张')
        this.kjSlideIdx = 1
      } else {
        var version = Math.random()
        this.kejianpic = 'http://www.graph-edu.cn:3600/static/kejian/' + this.selkj.split('|')[1] + '_' + this.selcoures + '_' + this.selkj.split('|')[0] + '_' + '幻灯片' + this.kjSlideIdx + '.PNG?' + version
        const _this = this
        const params = {
          'page': _this.kjSlideIdx
        }
        _this.wsPage.send(JSON.stringify(params))
      }
    },
    nextSlide() {
      this.kjSlideIdx = this.kjSlideIdx + 1
      if (this.kjSlideIdx >= this.curKjSlideNum) {
        alert('已是最后一张')
        this.kjSlideIdx = this.kjSlideIdx - 1
      } else {
        var version = Math.random()
        const _this = this
        const params = {
          'page': _this.kjSlideIdx
        }
        _this.wsPage.send(JSON.stringify(params))
        if (localStorage.getItem('type') === 'tea') {
          this.kejianpic = 'http://www.graph-edu.cn:3600/static/kejian/' + this.selkj.split('|')[1] + '_' + this.selcoures + '_' + this.selkj.split('|')[0] + '_' + '幻灯片' + this.kjSlideIdx + '.PNG?' + version
        } else {
          this.kejianpic = 'http://www.graph-edu.cn:3600/static/kejian/' + this.selkj.split('|')[1] + '_' + this.selcoures + '_' + this.selkj.split('|')[0] + '_' + '幻灯片' + this.kjSlideIdx + '.PNG?' + version
        }
      }
    },
    // 点击出现签到画面，同时上传课程信息，下载名单
    toSignin() {
      if (this.selclass && this.selkj) {
        this.button_selsct = false
        this.signin = true
        const data = { 'userno': localStorage.getItem('userno'), 'coures': this.selcoures, 'class': this.selclass }
        getStuList(data).then(response => {
          this.TableData = response.data.info
        })
      } else {
        alert('请选择开课信息')
      }
    },
    // 点击签到
    start() {
      this.initWebSocketSign()
      this.signin_button = true
    },
    // 点击出现课件
    toKejian() {
      this.signin = false
      this.kejian = true
      const _this = this
      _this.wsSign.close()
      this.initWebSocket()
    },
    // 点击下课，返回课程选择
    toSelect() {
      const _this = this
      _this.ws.close()
      _this.wsPage.close()
      this.signin_button = false
      this.kejian = false
      this.button_selsct = true
    },
    // 点签到建立ws连接
    initWebSocketSign() {
      const _this = this
      // 判断页面有没有存在websocket连接
      if (window.WebSocket) {
        // IP地址 要与后端配置的一致
        this.wsSign = new WebSocket('ws://127.0.0.1:8080/wsSignTea/' + localStorage.getItem('userno'))
        this.wsSign.onopen = function(e) {
          console.log('签到服务器连接成功')
          const params = {
            coures: _this.selcoures,
            stuclass: _this.selclass
          }
          _this.wsSign.send(JSON.stringify(params))
        }

        this.wsSign.onclose = function(e) {
          console.log('签到服务器连接关闭')
        }
        this.wsSign.onerror = function() {
          console.log('签到服务器连接出错')
        }
        this.wsSign.onmessage = function(e) {
          // 接收服务器返回的数据
          const resData = JSON.parse(e.data)
          // 先判断是否属于当前班级
          if (_this.teacher === resData.teacher) {
            _this.TableData = _this.TableData.filter(function(item) {
              return item.username !== resData.username
            })
          }
        }
      }
    },
    // 点上课建立ws连接
    initWebSocketPage() {
      // 判断页面有没有存在websocket连接
      if (window.WebSocket) {
        // IP地址 要与后端配置的一致
        this.wsPage = new WebSocket('ws://127.0.0.1:8080/wsPageTea/' + localStorage.getItem('userno'))
        this.wsPage.onopen = function(e) {
          console.log('翻页服务器连接成功')
        }

        this.wsPage.onclose = function(e) {
          console.log('翻页服务器连接关闭')
        }
        this.wsPage.onerror = function() {
          console.log('翻页服务器连接出错')
        }
        this.wsPage.onmessage = function(e) {
        }
      }
    },
    // 聊天室滚动条到底部
    scrollBottm() {
      const el = this.$refs['msg-box']
      el.scrollTop = el.scrollHeight
    },
    // 发送聊天信息
    sendText() {
      const _this = this
      _this.$refs['sendMsg'].focus()
      if (!_this.contentText) {
        return
      }
      const params = {
        userName: _this.username,
        msg: _this.contentText,
        teacher: _this.teacher
      }
      _this.ws.send(JSON.stringify(params)) // 调用WebSocket send()发送信息的方法
      _this.contentText = ''
      setTimeout(() => {
        _this.scrollBottm()
      }, 500)
    },
    // 显示聊天消息
    creat_chat(username, msg) {
      // 将聊天记录放入span标签
      const span_tag2 = document.createElement('span')
      span_tag2.innerText = msg
      span_tag2.setAttribute('class', 'left')
      // 将用户名放入span标签
      const span_tag1 = document.createElement('span')
      span_tag1.innerText = username
      span_tag1.setAttribute('class', 'left')
      // 创建聊天信息的div标签
      const div_tag2 = document.createElement('div')
      div_tag2.setAttribute('class', 'user-msg')
      div_tag2.appendChild(span_tag2)
      // 创建用户名的div标签
      const div_tag1 = document.createElement('div')
      div_tag1.setAttribute('class', 'user-head')
      div_tag1.appendChild(span_tag1)
      // 创建总标签
      const div_tag = document.createElement('div')
      // 将聊天记录和用户名添加进来
      div_tag.appendChild(div_tag1)
      div_tag.appendChild(div_tag2)
      div_tag.setAttribute('class', 'msg')
      // 加入聊天室
      const chat_window = document.getElementsByClassName('msg-box')[0]
      chat_window.appendChild(div_tag)
      this.scrollBottm()
    },
    // 点击上课建立聊天室websocket连接
    initWebSocket() {
      const _this = this
      // 判断页面有没有存在websocket连接
      if (window.WebSocket) {
        // IP地址 要与后端配置的一致
        this.ws = new WebSocket('ws://127.0.0.1:8080/ws/' + this.teacher)
        this.ws.onopen = function(e) {
          console.log('聊天服务器连接成功')
        }
        this.ws.onclose = function(e) {
          console.log('聊天服务器连接关闭')
        }
        this.ws.onerror = function() {
          console.log('聊天服务器连接出错')
        }
        this.ws.onmessage = function(e) {
          // 接收服务器返回的数据
          const resData = JSON.parse(e.data)
          // 先判断是否属于当前班级
          if (_this.teacher === resData.teacher) {
            _this.creat_chat(resData.username, resData.msg)
          }
        }
      }
    }
  }
}
</script>

<style>
.chat-box {
  margin: 0 auto;
  background: #fafafa;
  position: fixed;
  height: 50%;
  width: 20%;
  max-width: 700px;
  right: 0;
  bottom: 0;
}
.chat-box header {
    position: fixed;
    width: 20%;
    height: 3rem;
    background: #409eff;
    max-width: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    font-size: 1rem;
    right: 0;
}
.chat-box .msg-box {
  position: absolute;
  height: calc(100% - 6.5rem);
  width: 100%;
  margin-top: 3rem;
  overflow-y: scroll;
}
.chat-box .msg-box .msg {
  width: 95%;
  min-height: 2.5rem;
  margin: 1rem 0.5rem;
  position: relative;
  display: flex;
  justify-content: flex-start !important;
}
.chat-box .msg-box .msg .user-msg {
  width: 80%;
  /*// position: absolute;*/
  word-break: break-all;
  position: relative;
  z-index: 5;
  margin-left: 1rem;
}
.chat-box .msg-box .msg .user-msg span{
  display: inline-block;
  padding: 0.5rem 0.7rem;
  border-radius: 0.5rem;
  margin-top: 0.2rem;
  font-size: 0.88rem;
  background: #409eff;
}
.left {
    animation: toLeft 0.5s ease both 1;
}
.right {
    display: inline-block;
    padding: 0.5rem 0.7rem;
    border-radius: 0.5rem;
    margin-top: 0.2rem;
    font-size: 0.88rem;
    background: #53a8ff;
    color: white;
    animation: toright 0.5s ease both 1;
}
@keyframes toLeft {
    0% {
      opacity: 0;
      transform: translateX(-10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
}
 @keyframes toright {
    0% {
      opacity: 0;
      transform: translateX(10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
}
.chat-box .msg-box .msg .user-head {
  min-width: 2.5rem;
  width: 4.5rem;
  height: 2.5rem;
  background: red;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /*// position: absolute;*/
}
.chat-box .msg-box .msg .user-head .head {
  width: 1.2rem;
  height: 1.2rem;
}
.chat-box .input-box {
  padding: 0 0.5rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3.5rem;
  background: #fafafa;
  box-shadow: 0 0 5px #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chat-box .input-box input {
    height: 2.3rem;
    display: inline-block;
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-radius: 0.2rem;
    font-size: 0.88rem;
}
.chat-box .input-box .btn {
    height: 2.3rem;
    min-width: 4rem;
    background: #e0e0e0;
    padding: 0.5rem;
    font-size: 0.88rem;
    color: white;
    text-align: center;
    border-radius: 0.2rem;
    margin-left: 0.5rem;
    transition: 0.5s;
}
.chat-box .input-box .btn-active {
  background: #409eff;
}
</style>
