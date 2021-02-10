<template>
  <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
    <el-form-item label="菜单名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="菜单路径">
      <el-input v-model="form.href"></el-input>
    </el-form-item>
    <el-form-item label="上级菜单">
      <el-select v-model="form.parentId" placeholder="请选择活动区域">
        <el-option
          v-for="item in parentMenuList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="前端图标" prop="icon">
      <el-input v-model="form.icon"></el-input>
    </el-form-item>
    <el-form-item label="是否显示">
      <el-radio-group v-model="form.shown">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序">
      <el-input-number v-model="form.orderNum" :min="1"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button v-if="isEdit">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Form } from 'element-ui'
import { saveOrUpdate, getEditMenuInfo } from '@/services/menu.ts'
export default Vue.extend({
  name: 'MenuCreateOrEdit',
  props: {
    isEdit: Boolean,
  },
  created() {
    this.getMenuInfo()
  },
  data() {
    return {
      form: {
        parentId: 1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: true,
      },
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入描述内容', trigger: 'change' },
        ],
        icon: [{ required: true, message: '请输入图标', trigger: 'blur' }],
      },
      parentMenuList: [],
    }
  },
  methods: {
    onSubmit() {
      ;(this.$refs.ruleForm as Form).validate(async (valid: any) => {
        if (valid) {
          const { data } = await saveOrUpdate(this.form)
          if (data.code === '000000') {
            this.$message.success('保存成功')
            this.$router.back()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getMenuInfo() {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      console.log(data)
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
      if (data.data.parentMenuList) {
        this.parentMenuList = data.data.parentMenuList
      }
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
