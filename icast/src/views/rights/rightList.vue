<template>
  <div class="rightList">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 权限列表数据展示 -->
    <el-table :data="rightForm" border style="width: 100%" >
      <el-table-column type="index" width="50px"></el-table-column>
      <el-table-column prop="authName" label="权限名称"  width="180px"></el-table-column>
      <el-table-column prop="path" label="途径"  width="180px"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
            <p>{{scope.row.level | levelFormat}}</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRightList } from '@/api/right_index.js'
export default {
  data () {
    return {
      rightForm: []
    }
  },
  // 添加过滤器
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  },
  mounted () {
    getAllRightList('list')
      .then((res) => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.rightForm = res.data.data
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
</style>
