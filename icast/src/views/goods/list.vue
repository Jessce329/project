<template>
  <div class="list">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加商品 -->
    <el-input
      v-model="goodList.query"
      placeholder="请输入内容"
      class="input-with-select"
      style="width:300px"
      @keyup.enter.native="GoodInit"
    >
      <el-button slot="append" icon="el-icon-search" @click="GoodInit"></el-button>
    </el-input>
    <el-button
      type="success" plain
      style="margin-left:15px;width:100px;margin-bottom:10px"
      @click='$router.push({name:"add"})'
     >添加商品</el-button>
    <!-- 商品表格 -->
    <el-table :data="goodForm" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="520"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="80"></el-table-column>
      <el-table-column prop="goods_state" label="商品状态"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="180">
        <template slot-scope="add_time">
          <P>{{add_time.row.add_time | timeFormat}}</P>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑内容" placement="top-start">
            <el-button size="mini" type="primary" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start">
            <el-button size="mini" type="success" plain icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除内容" placement="top-start">
            <el-button size="mini" type="danger" plain icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      </el-table>
      <!-- 分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodList.pagenum"
      :page-sizes="[6, 12, 18]"
      :page-size="goodList.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { getAllGoodsList } from '@/api/goods_index.js'
export default {
  data () {
    return {
      total: 0,
      goodList: {
        query: '',
        pagenum: 1,
        pagesize: 6
      },
      goodForm: []
    }
  },
  filters: {
    timeFormat (time) {
      time = new Date(time * 1000)
      return (
        time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDay()
      )
    }
  },
  methods: {
    handleSizeChange (val) {
    //   console.log(`每页 ${val} 条`)
      this.goodList.pagesize = val
      this.GoodInit()
    },
    handleCurrentChange (val) {
    //   console.log(`当前页: ${val}`)
      this.goodList.pagenum = val
      this.GoodInit()
    },
    // 显示商品列表
    GoodInit () {
      getAllGoodsList(this.goodList)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.goodForm = res.data.data.goods
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.GoodInit()
  }
}
</script>
<style lang="less" scoped>
</style>
