<template>
  <div class="forget-container">
    <el-container class="forget-form">
      <el-header>
        <el-steps :active="active" finish-status="success" align-center space="500px" style="border-bottom: 3px">
          <el-step title="身份验证" />
          <el-step title="密码重置" />
          <el-step title="重置完成" />
        </el-steps>
      </el-header>
      <el-main style="padding: 5% 18% 0 18%">
        <el-form ref="forgetForm" :model="forgetForm" label-position="left" :rules="forgetRules">
          <div v-if="active === 0" class="form1">
            <el-form-item prop="userno">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="userno"
                v-model="forgetForm.userno"
                placeholder="teacherId"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>
            <el-form-item prop="SMS">
              <span class="svg-container">
                <svg-icon icon-class="guide" />
              </span>
              <el-input
                ref="authCode"
                v-model="forgetForm.SMS"
                placeholder="identifying code"
                name="SMS"
                type="text"
                tabindex="5"
                autocomplete="off"
                style="width: calc(70% - 50px)"
              />
              <el-button style="width:30%;text-align: center;margin-left: -5px;white-space: nowrap;overflow: hidden;" :disabled="flag" @click="sendcode">{{ btntxt }}</el-button>
            </el-form-item>
            <el-button type="primary" style="width:30%;margin:0 35% 0;" @click.native.prevent="toForm2">下一步</el-button>
          </div>
          <div v-if="active === 1" class="form2">
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="forgetForm.password"
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
                  v-model="forgetForm.npassword"
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
            <el-button type="primary" style="width:30%;margin:0 35% 0;" @click.native.prevent="toForm3">下一步</el-button>
          </div>
          <div v-if="active === 2" class="form3">
            <div style="text-align: center; margin:20px 0; color: black">新密码重置成功，请重新登录</div>
            <el-button type="primary" style="width:30%;margin:0 35% 0;" @click.native.prevent="next"><router-link to="/login">重新登录</router-link></el-button>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { forgetSms, forget, newPassword } from '@/api/user'

export default {
  data() {
    const validateUserno = (rule, value, callback) => {
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
      } else if (value !== this.forgetForm.password) {
        callback(new Error('two passwords do not match'))
      } else {
        callback()
      }
    }
    const validateSMS = (rule, value, callback) => {
      if (value === '' || value === undefined || value == null) {
        callback('Please enter the identifying code')
      } else {
        callback()
      }
    }
    return {
      active: 0,
      forgetForm: {
        userno: '',
        password: '',
        npassword: '',
        email: '',
        SMS: '',
        time: 0
      },
      forgetRules: {
        userno: [{ required: true, trigger: 'blur', validator: validateUserno }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        npassword: [{ required: true, trigger: 'blur', validator: validatenPassword }],
        SMS: [{ required: true, trigger: 'blur', validator: validateSMS }]
      },
      btntxt: '发送验证码',
      flag: false,
      passwordType: 'password',
      capsTooltip: false
    }
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    },
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
      if (this.userno === '') {
        this.$message('请输入学号')
      } else {
        this.flag = true
        const data = { 'userno': this.forgetForm.userno }
        forgetSms(data).then(response => {
          this.$message(response.data.message)
          if (response.data.code === '20000') {
            _this.time = 60
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
    toForm2() {
      return new Promise((resolve, reject) => {
        const data = { 'userno': this.forgetForm.userno, 'SMS': this.forgetForm.SMS }
        forget(data).then((response) => {
          if (response.data.code === '20000') {
            this.next()
          } else {
            this.$message('验证码错误，请重试')
          }
        })
      })
    },
    toForm3() {
      const _this = this
      if (this.forgetForm.password !== '' && this.forgetForm.password === this.forgetForm.npassword) {
        const data = { 'userno': this.forgetForm.userno, 'password': this.forgetForm.password }
        newPassword(data).then(
          _this.next()
        )
      } else {
        this.$message('两次密码不一致')
      }
    }
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
  .forget-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.forget-container {
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

.forget-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background-image: url('../../assets/zhini.jpg');
  // overflow: hidden;
  background-position: center;
  background-size:100% 100%;
  .forget-form{
    height:270px;
    width: 35%;
    // background:red;
    top:46%;
    left:31.5%;
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
</style>
