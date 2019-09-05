<template>
  <div class="register">
    <el-form ref="registerForm" :model="registerForm" :rules="rules" class="registerForm">
      <el-form-item prop="username" class="form-item">
        <el-input v-model="registerForm.username" placeholder="手机/用户名" />
      </el-form-item>
      <el-form-item prop="captcha" class="form-item">
        <el-input v-model="registerForm.captcha" placeholder="请输入验证码">
          <el-button slot="append" type="info" plain @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname" class="form-item">
        <el-input v-model="registerForm.nickname" placeholder="你的名字" />
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input v-model="registerForm.password" placeholder="密码" />
      </el-form-item>
      <el-form-item prop="checkPassword" class="form-item">
        <el-input v-model="registerForm.checkPassword" placeholder="确认密码" />
      </el-form-item>
      <el-button
        class="submit"
        type="primary"
        @click="handleregisterButton"
      >
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '', // 用户名手机号
        nickname: '', // 昵称
        captcha: '', // 手机验证码
        password: '', // 密码
        checkPassword: '' // 确认密码
      },
      rules: {
        username: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入正确的验证码', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPassword: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSendCaptcha () {
      if (!this.registerForm.username) {
        this.$confirm('手机号码不能为空', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'wraning'
        })
        return
      }
      if (this.registerForm.username.length !== 11) {
        this.$confirm('请输入正确的手机号', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'wraning'
        })
        return
      }
      this.$axios({
        url: `captchas`,
        method: 'POST',
        data: {
          tel: this.registerForm.username
        }
      }).then((res) => {
        // console.log(res)
        const { code } = res.data
        this.$confirm(`手机模拟的验证码为:${code}`, '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'info'
        })
      })
        .catch((err) => {
          console.log(err)
        })
    },
    handleregisterButton () {
      // console.log(this.registerForm)
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          const { checkPassword, ...props } = this.registerForm
          this.$axios({
            url: 'accounts/register',
            method: 'POST',
            data: props
          }).then((res) => {
            console.log(res)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .register{
        padding: 25px;
    }
    .submit{
        width:100%
    }
</style>
