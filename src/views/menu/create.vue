<template>
  <el-card class="box-card">
    <create-or-edit />
  </el-card>
</template>

<script lang='ts'>
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'
export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreateOrEdit,
  },
})
</script>

<style lang="scss" scoped>
</style>
