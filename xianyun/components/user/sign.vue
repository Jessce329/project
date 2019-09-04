<template>
  <div class="sign">
    <el-form ref="SignForm" :model="loginForm" :rules="rules" class="SignForm">
      <el-form-item prop="mobile" class="form-item">
        <el-input v-model="SignForm.mobile" placeholder="手机/用户名" />
      </el-form-item>
      <el-form-item prop="code" class="form-item">
        <el-input v-model="SignForm.code" placeholder="请输入验证码">
          <el-button slot="append" type="info" plain>
            发送验证码
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item prop="username" class="form-item">
        <el-input v-model="SignForm.username" placeholder="你的名字" />
      </el-form-item>
      <el-form-item prop="password" class="form-item">
        <el-input v-model="SignForm.password" placeholder="密码" />
      </el-form-item>
      <el-form-item prop="confirmPwd" class="form-item">
        <el-input v-model="SignForm.confirmPwd" placeholder="确认密码" />
      </el-form-item>
      <el-button
        class="submit"
        type="primary"
        @click="handleSignButton"
      >
        注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      SignForm: {
        mobile: '',
        username: '',
        code: '',
        confirmPwd: '',
        password: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入正确的验证码', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .sign{
        padding: 25px;
    }
    .submit{
        width:100%
    }
</style>
