<template>
  <div class="users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框和搜索按钮 -->
    <el-input
      v-model="userobj.query"
      placeholder="请输入内容"
      class="input-with-select"
      style="width:300px"
    >
      <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
    </el-input>
    <el-button
      type="success"
      style="margin-left:15px;width:100px"
      @click="addDialogFormVisible=true"
    >添加用户</el-button>
    <!-- 表格 -->
    <el-table border :data="userList" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="200"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"    @change="changestate(scope.row.id,scope.row.mg_state)"></el-switch>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑内容" placement="top-start">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-edit"
              @click="showEditForm(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start">
            <el-button
              size="mini"
              type="success"
              plain
              icon="el-icon-share"
              @click="showGrantForm(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除内容" placement="top-start">
            <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="deluser(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userobj.pagenum"
      :page-sizes="[1, 2, 3, 4,5]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户窗口 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm" :label-width="'80px'" ref="addForm" :rules="rules">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户窗口 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="editForm.username" auto-complete="off" disabled style="width:100px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" auto-complete="off" style="width:480px"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off" style="width:480px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配用户角色 -->
    <el-dialog title="分配角色" :visible.sync="grantDialogFormVisible">
      <el-form :model="grantForm">
        <el-form-item label="分配角色">
          <el-input v-model="grantForm.username" auto-complete="off" style="width:100px" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色:">
        <el-select v-model="grantForm.rid" clearable placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.value"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllUserList,
  addUser,
  editUser,
  grantUserRole,
  updateUserState,
  delUserById
} from '@/api/user_index.js'
import { getAllRoleList } from '@/api/role_index.js'
export default {
  inject: ['reload'],
  data () {
    return {
      // 角色列表
      roleList: [],
      // 分配角色 弹框
      grantDialogFormVisible: false,
      grantForm: {
        username: '',
        // 用户id
        id: '',
        // 角色id
        rid: ''
      },
      // 编辑弹框
      editDialogFormVisible: false,
      // 编辑用户
      editForm: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      // 显示表单
      addDialogFormVisible: false,
      // 添加用户
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      userList: [],
      total: 0,
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      }
    }
  },
  methods: {
    // 删除用户
    deluser (id) {
      console.log(id)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUserById(id)
          .then((res) => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message.success('删除成功')
              if (this.userList.length === 1) {
                this.reload()
              } else {
                this.init()
              }
              // this.init()
            } else {
              this.$message.error(res.data.meta.msg)
            }
          })
          .catch((err) => {
            console.log(err)
            this.$message.error('删除失败')
          })
      })
        .catch((err) => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    },
    // 修改用户的状态
    changestate (id, type) {
      // console.log(id, type)
      updateUserState(id, type)
        .then((res) => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success('设置状态成功')
          } else {
            this.$message({
              type: 'error',
              message: res.data.meta.msg
            })
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            type: 'error',
            message: '修改状态失败'
          })
        })
    },
    // 实现分配角色分方法
    grantUser () {
      // console.log(this.grantForm)
      // 判断用户是否徐选择了我们的角色
      if (this.grantForm.rid) {
        grantUserRole(this.grantForm)
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
              this.grantDialogFormVisible = false
              this.init()
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error('分配角色失败')
          })
      } else {
        this.$message.error('请选择角色')
      }
    },
    // 显示分配角色列表
    showGrantForm (row) {
      // console.log(row)
      this.grantDialogFormVisible = true
      this.grantForm.id = row.id
      this.grantForm.username = row.username
      this.grantForm.rid = row.rid
    },
    // 显示编辑用户数据
    showEditForm (row) {
      this.editDialogFormVisible = true
      // console.log(row)
      this.editForm.id = row.id
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
    },
    // 编辑用户
    editUser () {
      editUser(this.editForm)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success('编辑用户成功')
            this.init()
            this.editDialogFormVisible = false
            // 重置表单元素
            this.$refs.editForm.resetFields()
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('编辑用户失败')
        })
    },
    // 添加新用户方法
    add () {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          addUser(this.addForm)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.$message.success(res.data.meta.msg)
                this.init()
                this.addDialogFormVisible = false
                // 清空表单元素
                this.$refs['addForm'].resetFields()
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.error('添加用户失败')
            })
        } else {
          this.$message.warning('请输入必需数据')
        }
      })
    },
    handleSizeChange (val) {
      // 1.修改参数
      this.userobj.pagesize = val
      // 2.重新请求
      this.init()
    },
    handleCurrentChange (val) {
      this.userobj.pagenum = val
      this.init()
    },
    init () {
      getAllUserList(this.userobj)
        // console.log(this.userobj)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.userList = res.data.data.users
            this.total = res.data.data.total
          } else if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg)
            this.$router.push({ name: 'login' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
    // 动态加载数据列表
    getAllRoleList()
      .then((res) => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.roleList = res.data.data
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
