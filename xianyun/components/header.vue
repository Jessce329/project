<template>
  <div class="container">
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
        </nuxt-link>
      </div>
      <!-- 菜单栏 -->
      <el-row class="navs" type="flex">
        <nuxt-link to="/">
          首页
        </nuxt-link>
        <nuxt-link to="/post">
          旅游攻略
        </nuxt-link>
        <nuxt-link to="/hotel">
          酒店
        </nuxt-link>
        <nuxt-link to="/air">
          国内机票
        </nuxt-link>
      </el-row>
      <el-row>
        <!-- 登录成功以后的用户下拉框 -->
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <el-row type="flex" align="middle" class="el-dropdown-link ">
            <nuxt-link to="#">
              <img class="userimg" :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar">
              {{ $store.state.user.userInfo.user.nickname }}
              <i class="el-icon-arrow-down el-icon--right" />
            </nuxt-link>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>用户中心</el-dropdown-item>
            <el-dropdown-item @click.native="handleLoginOut">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
          <!-- 其他代码... -->
        </el-dropdown>
        <!-- 登录/注册 -->
        <nuxt-link v-else to="/user/login">
          登录 / 注册
        </nuxt-link>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleLoginOut () {
      const { commit } = this.$store
      commit('user/clearUserInfo')
      this.$message.success('退出成功')
      this.$router.push('/user/login')
    }
  }
}
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        height: 60px;
        line-height: 60px;
        box-shadow: 0 2px 2px #eee
    }
    .main{
        width: 1000px;
        margin:0 auto;
    }
    .navs{
        flex: 1;
        margin-left: 10px;
        a{
            display: block;
            height: 60px;
            line-height: 60px;
            padding: 0 20px;
            box-sizing: border-box;
            &:hover{
                color:#409eff;
                background: #fff;
                border-bottom: 3px solid #409eff
            }
        }
        // 该class是nuxt会去自动匹配nuxt-link的to的值，如果url和to的值相等会自动加上下面的class
        .nuxt-link-exact-active{
            background: #409eff;
            color:#fff;
            &:hover{
                background: #409eff;
                color:#fff;
            }
        }
    }
    .logo{
            padding-top: 10px;
            img{
                width: 156px;
                height: 42px;
                display: block
            }
        }
        .userimg{
          height: 36px;
          width: 36px;
          vertical-align: middle;
          border-radius: 50%;
        }
        .userimg:hover{
          border: 1px solid #409eff
        }
</style>
