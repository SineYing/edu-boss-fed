<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="$router.push({name:'menu-create'})">添加菜单</el-button>
    </div>
    <el-table :data="menuList" border style="width: 100%">
      <el-table-column fixed type="index" label="编号" width="50" align="center"></el-table-column>
      <el-table-column prop="name" label="菜单名称"></el-table-column>
      <el-table-column prop="level" label="菜单级数" align="center">
        <template slot-scope="scope">{{scope.row.level == 1?'一级':'二级'}}</template>
      </el-table-column>
      <el-table-column prop="icon" label="前端图标"></el-table-column>
      <el-table-column prop="orderNum" label="排序" width="150" align="right"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteClick(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang='ts'>
import Vue from 'vue'
import { getAllMenus, deleteMenuInfo } from '@/services/menu.ts'
export default Vue.extend({
  name: 'Menu',
  data() {
    return {
      menuList: [],
    }
  },
  methods: {
    handleClick(row: any) {
      console.log(row)
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: row.id,
        },
      })
    },
    async loadMenus() {
      const { data } = await getAllMenus()
      this.menuList = data.data
    },
    deleteClick(id: string) {
      this.$confirm('此操作将永久删除当前菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const { data } = await deleteMenuInfo(id)
          if (data.code === '000000') {
            this.loadMenus()
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },

  created() {
    this.loadMenus()
  },
})
</script>

<style lang="scss" scoped>
</style>
