<template>
  <div class="login-page">
    <div>
      <h1>Edu Boss 管理系统</h1>
      <div class="login-box">
        <el-alert
          :title="loginMessage"
          :type="loginError?'success':'warning'"
          v-show="loginMessage!==''"
        ></el-alert>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loginLoading"
              class="login-button"
              type="primary"
              @click="submitForm"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      ruleForm: {
        phone: '18201288771',
        password: '111111',
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur',
          },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur',
          },
        ],
      },
      loginError: false,
      loginMessage: '',
      loginLoading: false,
    }
  },
  methods: {
    async submitForm() {
      try {
        // 表单校验
        await (this.$refs.ruleForm as Form).validate()
        // 设置登录状态
        this.loginLoading = true
        const { data } = await login(this.ruleForm)
        // 取消登录状态
        this.loginLoading = false
        // 设置提示信息
        this.loginError = data.success
        this.loginMessage = data.message
        // 保存用户信息，记录登录状态
        this.$store.commit('setUser', data.content)
        // 登录成功跳转页面
        if (data.success) {
          console.log(this.$route.query)
          this.$router.push(this.$route.query.redirect as string || '/')
          // this.$router.push({
          //   name: 'home',
          // })
        }
      } catch (e) {}
    },
  },
})
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  h1 {
    text-align: center;
  }
  .login-box {
    width: 360px;
    margin: 0 auto;
    background: #fff;
    padding: 20px 20px;
  }
  .login-button {
    width: 100%;
  }
}
</style>
