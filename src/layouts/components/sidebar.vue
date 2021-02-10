<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-submenu index="auth">
      <template slot="title">
        <i class="el-icon-lock"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="role">
          <i class="el-icon-setting" />
          角色列表
        </el-menu-item>
        <el-menu-item index="menu">
          <i class="el-icon-setting" />
          菜单列表
        </el-menu-item>
        <el-menu-item index="resource">
          <i class="el-icon-setting" />
          资源列表
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="course">
      <i class="el-icon-film"></i>
      <span slot="title">课程管理</span>
    </el-menu-item>
    <el-menu-item index="user">
      <i class="el-icon-user" />
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-submenu index="ad">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>广告管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="advert">
          <i class="el-icon-user" />广告列表
        </el-menu-item>
        <el-menu-item index="advert-space">
          <i class="el-icon-user" />广告位列表
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  name: 'Siderbar',
  methods: {
    handleOpen(key: string, keyPath: string) {
      console.log(key, keyPath)
    },
    handleClose(key: string, keyPath: string) {
      console.log(key, keyPath)
    },
  },
})
</script>

<style lang='scss' scoped>
.el-menu {
  width: 200px;
}
</style>
