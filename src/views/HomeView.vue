<template>
  <div class="home-container">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"><span class="logo">logo</span></el-col>
          <el-col :span="16">
            <h2>后台管理系统</h2>
          </el-col>
          <el-col :span="4">
            <span class="logout">退出</span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose">
            <el-menu-item v-for="item in menu" :index="item.path" :key="item.path">
              <el-icon><icon-menu /></el-icon>
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const menu = router.getRoutes().filter(v => v.meta.isMenu)

const handleOpen = () => { }
const handleClose = () => { }
</script>

<style scoped lang="scss">
.el-header {
  height: 80px;
  background-color: #333;
  /*   color: #fff; */
}

.logo {
  height: 80px;
}

h2,
.logout {
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.el-menu {
  height: calc(100vh - 80px);
}
</style>
