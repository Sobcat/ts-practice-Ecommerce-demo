<template>
  <div class="login-container">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
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

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<LoginForm>({
  username: '',
  userpass: ''
})

// const rules = reactive<FormRules<typeof ruleForm>>({
const rules = reactive<FormRules<LoginForm>>({
  username: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  userpass: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  console.log(111, formEl)
}
const resetForm = (formEl: FormInstance | undefined) => {}
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
