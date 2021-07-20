<template>
  <div>
    <div>

      <pan-thumb :image="image" />

      <image-cropper
        v-show="imagecropperShow"
        :key="imagecropperKey"
        :width="300"
        :height="300"
        url="http://39.104.151.240:3600/sendstupic"
        lang-type="en"
        :params="form"
        @close="close"
        @crop-upload-success="cropSuccess"
      />
      <el-button type="primary" icon="upload" style="bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
        上传头像
      </el-button>
    </div>

    <div class="form-box">

      <!--<p v-show="showtishi">{{tishi}}</p>-->
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="学号">
          <el-input v-model="form.userno" disabled />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="旧密码">
          <el-input v-model="form.oldpsw" type="password" placeholder="请输入旧密码" />
        </el-form-item>

        <el-form-item label="新密码">
          <el-input v-model="form.newpsw" type="password" placeholder="请输入新密码" />
        </el-form-item>

        <el-form-item label="手机">
          <el-input v-model="form.userphone" placeholder="请输入手机号" />
        </el-form-item>

        <!--<el-form-item label="出生日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>

                </el-form-item>-->
        <el-form-item label="电子邮箱">
          <el-input v-model="form.usermail" />
        </el-form-item>

        <el-form-item label="QQ(选填)">
          <el-input v-model="form.userqq" />
        </el-form-item>

        <!--<el-upload
                    class="upload-demo"
                    drag
                    action="/api/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将照片拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>-->

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { setPerInfo, getPerInfo } from '@/api/hwexp'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data: function() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: '',
      form: {
        flag: false,
        userno: localStorage.getItem('userno'),
        username: '',
        oldpsw: '',
        newpsw: '',
        usermail: '',
        userqq: '',
        userphone: ''

      }
    }
  },

  created() {
    this.getdata()
  },

  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData
    },
    close() {
      this.imagecropperShow = false
    },
    getdata() {
      const data = { 'userno': localStorage.getItem('userno') }
      getPerInfo(data).then(response => {
        this.form = response.data
        const version = Math.random()
        this.image = response.data.pic + '?' + version
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    onSubmit() {
      if (this.form.oldpsw !== '') {
        const data = { 'userno': this.form.userno, 'oldpsw': this.form.oldpsw, 'newpsw': this.form.newpsw, 'userqq': this.form.userqq, 'usermail': this.form.usermail, 'userphone': this.form.userphone }
        setPerInfo(data).then(response => {
          this.$message(response.data)
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      } else {
        alert('请输入密码')
      }
    }
  }
}
</script>
<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
