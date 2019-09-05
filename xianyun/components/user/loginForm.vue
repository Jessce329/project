<template>
  <div class="containner">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" class="loginForm">
      <el-form-item prop="username" class="form-item">
        <el-input v-model="loginForm.username" placeholder="手机/用户名" />
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input v-model="loginForm.password" placeholder="密码" />
      </el-form-item>
      <p class="form-text">
        <nuxt-link to="#">
          忘记密码
        </nuxt-link>
      </p>
      <el-button
        class="submit"
        type="primary"
        @click="handleLoginButton"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '13800138000',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名或者手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLoginButton () {
      // console.log(this.loginForm)
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          /* this.$axios({
            url: '/accounts/login',
            method: 'POST',
            data: this.loginForm
          }).then((res) => {
            console.log(res)
          }) */
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            this.$message({
              message: '登录成功，正在跳转',
              type: 'success'
            })
            // 跳转到首页
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.containner{
  padding: 25px;
}
.form-item{
  margin-bottom: 15px;
}
.form-text{
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 2
}
.submit{
  width: 100%
}
</style>
