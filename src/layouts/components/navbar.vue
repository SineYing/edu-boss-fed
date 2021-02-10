<template>
  <div class="el-header">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">活动管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="loadLogout">
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="32" :src="userInfo.portrait" />
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{userInfo.weixinNickName}} | {{userInfo.userName}}</el-dropdown-item>
        <el-dropdown-item divided command="e">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getUserInfo, logout } from '@/services/user'
export default Vue.extend({
  name: 'Navbar',
  data() {
    return {
      squareUrl: '@/assets/img/avatar.png',
      userInfo: {},
    }
  },
  created() {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo() {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    loadLogout(command: string) {
      this.$confirm('确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          if (command === 'e') {
            const { data } = await logout()
            if (data.success) {
              this.$store.commit('setUser', null)
              this.$router.push('/login')
            }
          }
          this.$message({
            type: 'success',
            message: '退出成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已退出',
          })
        })
    },
  },
})
</script>

<style lang='scss' scoped>
.el-header {
  background-color: #c3d0e2;
  color: #333;
  text-align: center;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
