<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple left">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo left-nav"
            mode="vertical"
            :collapse="isCollapse"
            active-text-color="#ffd04b"
            @select="handleSelect"
          >
            <el-submenu index="1">
              <template slot="title">
                我的工作台
              </template>
              <el-menu-item index="1-1">
                选项1
              </el-menu-item>
              <el-menu-item index="1-2">
                选项2
              </el-menu-item>
              <el-menu-item index="1-3">
                选项3
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple right">
          222
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  }
}
</script>
<style scoped lang="less">
  .container{
    width: 1000px;
    margin: 20px auto
  }
  .left-nav{
    width: 100%;
    border: 1px solid #eee
  }
  .right{
    height: 500px;
    background-color: #666;
  }
</style>
