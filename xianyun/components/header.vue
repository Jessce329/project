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
        <!-- 登录/注册 -->
        <nuxt-link to="/user/login">
          登录 / 注册
        </nuxt-link>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {

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
</style>
