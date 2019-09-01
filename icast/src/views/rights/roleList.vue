<template>
  <div class="roleList">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色 -->
    <el-button type="success" plain @click="addDialogFormVisible= true">角色名称</el-button>
    <!-- 弹出添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="添加角色" prop="roleName">
          <el-input v-model="addForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 数据表格 -->
    <el-table :data="roleForm" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="first in scope.row.children"
            :key="first.id"
            style="border-bottom:1px dashed #666;margin-bottom:15px"
          >
            <el-col :span="4">
              <el-tag closable :type="'success'">{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id">
                <el-col :span="4">
                  <el-tag closable :type="'info'">{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    :type="'primary'"
                    v-for="third in second.children"
                    :key="third.id"
                    style="margin-right:5px;margin-bottom:10px"
                    @close="delRole(scope.row,third.id)"
                  >{{second.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="scope.row.children.length === 0">请分配权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑内容" placement="top-start">
            <el-button
              size="mini"
              type="primary"
              plain
              icon="el-icon-edit"
              @click="showEditRoles(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="角色授权" placement="top-start">
            <el-button
              size="mini"
              type="success"
              plain
              icon="el-icon-share"
              @click="showGrantDialog(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除内容" placement="top-start">
            <el-button
              size="mini"
              type="danger"
              plain
              icon="el-icon-delete"
              @click="delRoles(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 显示授权列表 -->
    <el-dialog title="授权分配" :visible.sync="roleDialogVisible">
      <el-tree
        :data="rightForm"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-expand-all="true"
        :default-checked-keys="charArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 展示编辑框 -->
    <el-dialog title="编辑角色" :visible.sync="editDialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getAllRoleList,
  delRightByRoleId,
  grantRoleById,
  addRoles,
  delRoles,
  editRoles
} from '@/api/role_index.js'
import { getAllRightList } from '@/api/right_index.js'
export default {
  data () {
    return {
      // 显示编辑弹框
      editDialogFormVisible: false,
      editForm: {
        roleDesc: '',
        id: '',
        roleName: ''
      },
      // 弹出删除角色对话框
      addDialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      roleId: '',
      roleDialogVisible: false,
      roleForm: [],
      rightForm: [],
      charArr: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      }
    }
  },
  methods: {
    // 显示编辑框
    showEditRoles (row) {
      this.editDialogFormVisible = true
      this.editForm.id = row.id
      this.editForm.roleName = row.roleName
      this.editForm.roleDesc = row.roleDesc
    },
    editRoles () {
      editRoles(this.editForm.id, this.editForm)
        .then((res) => {
          console.log(res)
          if (res.data.meta.status === 200) {
            console.log(res)
            this.$message.success('修改成功')
            this.editForm = res.data.data
            this.editDialogFormVisible = false
            this.init()
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message.error(err.data.meta.msg)
        })
    },
    // 删除角色方法
    delRoles (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '删除提示', {
        confirmButtonText: '确定',
        cancleButtonText: '取消'
      }).then(res => {
        delRoles(id)
          .then(res => {
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
              this.init()
            } else {
              this.$message.error('删除失败')
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    // 添加角色方法
    addRoles () {
      console.log(this.addForm)
      addRoles(this.addForm)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 201) {
            this.$message.success(res.data.meta.msg)
            this.init()
            this.addDialogFormVisible = false
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('删除失败')
        })
    },
    // 角色授权
    async grantRole () {
      // console.log(this.$refs.tree.getCheckedNodes())
      // console.log(this.$refs.tree.getHalfCheckedKeys())
      // console.log(this.$refs.tree.getCheckedKeys())
      // 1.获取当前用户所选的权限id,进行拼接,用","进行分割
      let arr = this.$refs.tree.getCheckedNodes()
      // 用一个空数组进行接收
      let temp = []
      // 2.遍历数组进行拼接
      for (let i = 0; i < arr.length; i++) {
        temp.push(arr[i].id + ',' + arr[i].pid)
      }
      // console.log(temp)
      // 3.将拼接的数组元素再转为字符串
      temp = temp.join(',').split(',')

      //  4.数组才能去重  new Set(数组)可以去除数组中的重复数据，它的返回值是一个Set对象
      temp = [...new Set(temp)]
      // console.log(temp.join(','), 11111111111111)

      let res = await grantRoleById(this.roleId, temp.join(','))
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        this.roleDialogVisible = false
        this.init()
      } else {
        this.$message.error(res.data.meta.msg)
      }
    },
    // 弹出角色对话框
    showGrantDialog (row) {
      // console.log(row)
      this.roleId = row.id
      this.roleDialogVisible = true
      getAllRightList('list').then(res => {
        // console.log(res)
      })
      this.charArr.length = 0
      // 获取当前权限的id,将它添加到charArr中
      // 1.用传统方法
      // row.children.forEach(first => {
      //   if (first.children.length > 0) {
      //     first.children.forEach(second => {
      //       if (second.children.length > 0) {
      //         second.children.forEach(third => {
      //           this.charArr.push(third.id)
      //         })
      //       }
      //     })
      //   }
      // })
      // 2.用递归方法做
      let _this = this
      function role (arr) {
        arr.forEach(e => {
          if (e.children && e.children.length !== 0) {
            role(e.children)
          } else {
            _this.charArr.push(e.id)
          }
        })
      }
      role(row.children)
    },
    // 删除觉得权限
    delRole (row, rightId) {
      // console.log(row, rightId)
      delRightByRoleId(row.id, rightId)
        .then(res => {
          console.log(res)
          row.children = res.data.data
          this.$message.success('删除权限成功')
        })
        .catch(err => {
          console.log(err)
          this.$message.error('删除权限失败')
        })
    },
    init () {
      getAllRoleList()
        .then(res => {
          // console.log(res)
          this.roleForm = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
    getAllRightList('tree')
      .then(res => {
        // console.log(res)
        this.rightForm = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
</style>
