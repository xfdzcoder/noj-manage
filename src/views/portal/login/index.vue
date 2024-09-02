<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-title">登录</div>
      <el-form :model="loginForm" :rules="rules" hide-required-asterisk>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="loginForm.email" placeholder=""></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="loginForm.password" placeholder="" show-password></el-input>
        </el-form-item>
      </el-form>
      <div class="login-btn">
        <el-button @click="showCode = true" type="warning">点击验证</el-button>
        <el-button type="primary" @click="onLogin">登录</el-button>
      </div>
<!--      <div class="register-link">-->
<!--        <el-link @click="goToRegister">没有账号？注册</el-link>-->
<!--      </div>-->
    </div>
    <Vcode :show="showCode" @success="codeValidSuccess" />
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import Vcode from 'vue3-puzzle-vcode'
import { login } from '@/api/manage-user/index.js'
import { useUserInfoStore } from '@/store/userInfo.js'
import { useRouter } from 'vue-router'
import { useCommunityInfoStore } from '@/store/community.js'

defineOptions({
  name: 'Login'
})

const router = useRouter()
const showCode = ref(false)
const loginForm = ref({
  email: '1507410636@qq.com',
  password: '123456',
  code: false
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const codeValidSuccess = () => {
  loginForm.value.code = true
  showCode.value = false
}


const onLogin = () => {
  const form = loginForm.value
  if (!form.code) {
    ElMessage.error('请先进行人机验证')
  }
  if (!form.email || !form.password) {
    ElMessage.error('请填写完整的登录信息')
    return
  }
  // 登录逻辑处理
  login(form)
    .then(res => {
      const { resolveLoginRes } = useUserInfoStore()
      resolveLoginRes(res)
      const communityInfoStore = useCommunityInfoStore()
      const { init } = communityInfoStore
      init()
        .then(() => {
          ElMessage.success('登录成功')
          router.push('/')
        })
    })
}

const goToRegister = () => {
  // 跳转到注册页面逻辑
  ElMessage.info('跳转到注册页面')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--noj-main-bg-color);
}

.login-card {
  width: 20vw;
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--noj-dialog-bg-color);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
  color: #FFFFFF;
}

.el-form {
  width: 100%;
}

.el-form-item {
  width: 100%;
}

.login-btn button {
  width: 5vw;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  align-self: flex-end;
}
</style>
