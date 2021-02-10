<template>
  <el-container class="wrapper">
    <app-sidebar />
    <el-container direction="vertical">
      <app-navbar />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppSidebar from './components/sidebar.vue'
import AppNavbar from './components/navbar.vue'
export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppSidebar,
    AppNavbar,
  },
})
</script>

<style lang='scss' scoped>
.wrapper {
  height: 100vh;
}
</style>
