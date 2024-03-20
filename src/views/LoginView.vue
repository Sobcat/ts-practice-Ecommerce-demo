<template>
  <div class="login-container">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules" label-width="auto"
      class="demo-ruleForm">
      <h2>系统登录</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="userpass">
        <el-input v-model="ruleForm.userpass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <div class="button-box">
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
c
<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { LoginForm } from '@/type/login'
import { login } from '@api/login'
import { useRouter } from 'vue-router'

const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<LoginForm>({
  username: '',
  userpass: ''
})
// login(ruleForm)

// type Test = { [find: string]: string }
// type Test1 = { [k: string]: string }

// const test: Test1 = {
//   b: '2',
//   d: '2',
//   c: '2',
// }

//表单验证规则
// const rules = reactive<FormRules<typeof ruleForm>>({
const rules = reactive<FormRules<LoginForm>>({
  username: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 0, max: 7, message: '字符长度不得超过7', trigger: 'blur' }
  ],
  userpass: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 18, message: '密码长度为5~18之间', trigger: 'blur' }
  ]
})
//登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      //登录接口
      login<{ isAuth: boolean }>(ruleForm).then((res) => {
        const { isAuth } = res
        if (isAuth) {
          console.log('登录成功！跳转至首页')
          router.push({ path: '/' })
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
//重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  width: 100%;
  height: 100%;

  .demo-ruleForm {
    margin: auto;
    padding: 20px 40px;
    width: 400px;
    border-radius: 4px;
    border: 1px solid var(--el-border-color-light);

    h2 {
      margin-bottom: 20px;
      text-align: center;
    }

    .button-box {
      width: 100%;
      text-align: right;
    }
  }
}
</style>
