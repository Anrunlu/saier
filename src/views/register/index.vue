<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" autocomplete="on" label-position="left">

      <!-- <div class="title-container">
        <h3 class="title">教学管理系统——测试版</h3>
      </div> -->
      <el-form-item prop="teacherId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="teacherId"
          v-model="registerForm.teacherId"
          placeholder="TeacherId"
          name="teacherId"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="off"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="npassword">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="npassword"
            v-model="registerForm.npassword"
            :type="passwordType"
            placeholder="Confirm-Password"
            name="npassword"
            tabindex="3"
            autocomplete="off"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-tooltip>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="registerForm.email"
          placeholder="Email"
          name="email"
          type="text"
          tabindex="4"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="SMS">
        <span class="svg-container">
          <svg-icon icon-class="guide" />
        </span>
        <el-input
          ref="authCode"
          v-model="registerForm.SMS"
          placeholder="identifying code"
          name="SMS"
          type="text"
          tabindex="5"
          autocomplete="off"
          style="width: calc(70% - 50px)"
        />
        <el-button style="width:30%;text-align: center;margin-left: -5px; white-space: nowrap;overflow: hidden;" :disabled="flag" @click="sendcode">{{ btntxt }}</el-button>
      </el-form-item>
      <el-form-item prop="college">
        <span class="svg-container">
          <svg-icon icon-class="peoples" />
        </span>
        <el-input
          ref="college"
          v-model="registerForm.college"
          placeholder="College"
          name="college"
          type="text"
          tabindex="6"
          autocomplete="off"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">register</el-button>
    </el-form>
    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
// import SocialSign from './components/SocialSignin'
import { registerSms, register } from '@/api/user'

export default {
  name: 'Register',
  // components: { SocialSign },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // 下面是红字报错规则
    const validateId = (rule, value, callback) => {
      if (value === '' || value === undefined || value == null) {
        callback('Please enter the id')
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validatenPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('two passwords do not match'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
      if (value === '' || value === undefined || value == null) {
        callback('Please enter the email address')
      } else {
        if (!reg.test(value)) {
          callback(new Error('Please enter the correct email address'))
        } else {
          callback()
        }
      }
    }
    const validateSMS = (rule, value, callback) => {
      if (value === '' || value === undefined || value == null) {
        callback('Please enter the identifying code')
      } else {
        callback()
      }
    }
    const validateCollege = (rule, value, callback) => {
      if (value === '' || value === undefined || value == null) {
        callback('Please enter the college')
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        teacherId: '',
        username: '',
        password: '',
        npassword: '',
        email: '',
        SMS: '',
        college: '',
        time: 0,
        flag: false
      },
      registerRules: {
        teacherId: [{ required: true, trigger: 'blur', validator: validateId }],
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        npassword: [{ required: true, trigger: 'blur', validator: validatenPassword }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        SMS: [{ required: true, trigger: 'blur', validator: validateSMS }],
        college: [{ required: true, trigger: 'blur', validator: validateCollege }]
      },
      passwordType: 'password',
      capsTooltip: false,
      btntxt: '发送验证码',
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.registerForm.teacherId === '') {
      this.$refs.teacherId.focus()
    } else if (this.registerForm.username === '') {
      this.$refs.username.focus()
    } else if (this.registerForm.password === '') {
      this.$refs.password.focus()
    } else if (this.registerForm.npassword === '') {
      this.$refs.npassword.focus()
    } else if (this.registerForm.email === '') {
      this.$refs.email.focus()
    } else if (this.registerForm.SMS === '') {
      this.$refs.SMS.focus()
    } else if (this.registerForm.college === '') {
      this.$refs.college.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    sendcode() {
      const _this = this
      const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
      if (this.registerForm.email === '') {
        this.$message('请输入邮箱')
      } else if (!reg.test(this.registerForm.email)) {
        this.$message('邮箱格式不正确')
      } else {
        const data = { 'email': this.registerForm.email }
        registerSms(data).then(response => {
          this.$message(response.data.message)
          if (response.data.code === '20000') {
            _this.time = 60
            _this.flag = true
            _this.timer()
          }
        })
      }
    },
    timer() {
      console.log(this.time)
      if (this.time > 0) {
        this.time--
        this.btntxt = this.time + 's后重新获取'
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.flag = false
        this.btntxt = '获取验证码'
      }
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          const data = { 'userno': this.registerForm.teacherId, 'username': this.registerForm.username, 'password': this.registerForm.password, 'email': this.registerForm.email, 'SMS': this.registerForm.SMS, 'college': this.registerForm.college }
          register(data).then(response => {
            this.$message(response.data.message) // 弹窗
            if (response.code === '20000') {
              this.$router.push({ path: '/login' })
            }
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background-position: center;
  background-size:100% 100%;
  .register-form{
    height:240px;
    width: 25%;
    // background:black;
    top:30%;
    left:37%;
    position:absolute;
    margin-top:-55px;
    color: #fff;
    // margin-left:-100px;
    }
  // .login-form {
  //   position: absolute;
  //   width: 520px;
  //   // top:45%;
  //   left:35%;
  //   max-width: 100%;
  //   padding: 160px 35px 0;
  //   margin: 0 auto;
  //   margin-top: 16%;
  //   overflow: hidden;
  // }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
/*el-button默认格式更改*/
.homePage /deep/ .el-button {
    padding: 10px 10px;
}
</style>
