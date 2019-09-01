<template>
  <div class="add">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" style="height:570px">
      <!-- 步骤 -->
      <el-steps :active="activeName -0" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 4"></el-step>
        <el-step title="步骤 5"></el-step>
      </el-steps>
      <!-- 标签页 -->
      <el-form
        ref="goodsForm"
        :model="goodsForm"
        label-width="80px"
        style="margin-left:40px"
        :rules="rules"
      >
        <el-tabs :tab-position="'left'" style="margin-top:5px" v-model="activeName">
          <el-tab-pane label="基本信息" name="0" disabled class="disable">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="goodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="goodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="goodsForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="goodsForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader :options="cateList" v-model="goodsForm.goods_cat" :props="cataProps"></el-cascader>
            </el-form-item>
            <!-- <el-button type="primary" plain class="fr" @click="nextStep">下一步</el-button> -->
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1" disabled class="disable">
            <!--  <el-button type="primary" plain class="fr" @click="nextStep" >下一步</el-button>
            <el-button type="info" plain class="fr" @click="lastStep">上一步</el-button>-->
            <el-checkbox-group
              v-model="item.attr_vals"
              v-for="item in attrValues"
              :key="item.attr_id"
            >
              <el-checkbox
                border
                :label="subitem"
                v-for="(subitem,index) in item.attr_vals"
                :key="index"
              ></el-checkbox>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2" disabled class="disable">
            <!-- <el-button type="primary" plain  class="fr" @click="nextStep">下一步</el-button>
            <el-button type="info" plain class="fr" @click="lastStep">上一步</el-button>-->
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3" disabled class="disable">
            <!-- <el-button type="primary" plain class="fr" @click="nextStep">下一步</el-button>
            <el-button type="info" plain class="fr"  @click="lastStep">上一步</el-button>-->
            <el-upload
              class="upload-demo"
              :headers="setToken()"
              action="http://localhost:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              accept="image/gif image/jpeg"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4" disabled>
            <!-- <el-button type="primary" plain class="fr" >提交</el-button>
            <el-button type="info" plain class="fr" @click="lastStep">上一步</el-button>-->
            <quillEditor v-model="goodsForm.goods_introduce"></quillEditor>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div v-if="activeName!=='4'" class="button">
        <el-button type="info" plain class="fr" v-show="prve" @click="lastSteps">{{lastStep}}</el-button>
        <el-button type="primary" plain class="fr" @click="nextSteps">{{nextStep}}</el-button>
      </div>
      <div v-else>
        <el-button type="primary" plain class="fr" @click="addGoods">{{nextStep}}</el-button>
        <el-button type="info" plain class="fr" v-show="prve" @click="lastSteps">{{lastStep}}</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { getAllCateList } from '@/api/cate_index.js'
import { getAllParamsList } from '@/api/params_index.js'
export default {
  data () {
    return {
      attrValues: [], // 动态生成的数组,应该是一个数组,包含着所以数据
      // 上传文件是存储的数组
      fileList: [],
      prve: false,
      // 提交按钮
      nextStep: '下一步',
      lastStep: '上一步',
      // 连级列表的商品显示
      cataProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 连级列表的商品显示
      cateList: [],
      // 添加商品的基本信息表
      goodsForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        pics: []
      },
      // 验证规则
      rules: {
        goods_name: [
          { required: true, message: '商品名字不能为空', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '商品价格不能为空', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '商品重量不能为空', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '商品数量不能为空', trigger: 'blur' }
        ]
      },
      // tabPosition: 'left',
      activeName: '0'
    }
  },
  components: {
    quillEditor
  },
  methods: {
    // 上传文件时遇到无效的token值,所以要设置一个拦截器给这个事件,让它获取到token值
    setToken () {
      let token = localStorage.getItem('itcast_token')
      return {
        Authorization: token
      }
    },
    // 文件上传是触发的钩子函数
    beforeUpload (file) {
      // 图片的mime类型都是以image/开头，所以我们可以获取到type数据，进行判断
      if (file.type.indexOf('image/') !== 0) {
        this.$message.error('请选择满足格式要求的图片，如png,jpg,jpeg')
        return false
      }
    },
    // 移出文件时触发
    handleRemove (file, fileList) {
      // console.log(file, fileList)
      if (!file.response) {
        return
      }
      // file就是当前被你移除的图片对象
      // 我们需要获取这个被移除的图片对象，将对应名称的数据从goods_form中删除
      let temp = file.response.data.tmp_path
      for (let i = 0; i < this.goodsForm.pics.length; i++) {
        if (this.goodsForm.pics[i] === temp) {
          this.goodsForm.pics.splice(i, 1)
          break
        }
      }
    },
    // 成功时触发的钩子函数
    handleSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      if (response.meta.status === 200) {
        this.goodsForm.pics.push({ pic: response.data.tmp_path })
      }
    },
    // 上传文件时触发的事件
    handlePreview (file) {
      // console.log(file)
    },
    nextSteps () {
      this.activeName = String(parseInt(this.activeName) + 1)
    },
    lastSteps () {
      this.activeName = String(parseInt(this.activeName) - 1)
    },
    addGoods () {
      console.log(this.goodsForm)
    }
  },
  watch: {
    activeName: function () {
      if (this.activeName === '0') {
        this.prve = false
      } else {
        this.prve = true
      }
      if (this.activeName === '4') {
        this.nextStep = '提交'
        this.lastStep = '上一步'
      } else if (this.activeName < '4') {
        this.lastStep = '上一步'
        this.nextStep = '下一步'
      }
      if (this.activeName === '1') {
        if (this.goodsForm.goods_cat.length !== 3) {
          this.$message.warning('请先选择分类')
          this.activeName = '0'
          return false
        }
        for (var i = 0; i < this.attrValues.length; i++) {
          this.attrValues[i].attr_vals = this.attrValues[i].attr_vals.split(
            ','
          )
        }
        getAllParamsList(this.goodsForm.goods_cat[2], 'many')
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.attrValues = res.data.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  mounted () {
    getAllCateList(3)
      .then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.cateList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
.button {
  display: flex;
  justify-content: center;
}
/deep/.is-disabled {
  color: #000;
}
</style>
