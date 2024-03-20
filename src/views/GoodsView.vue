<template>
  <div class="goods-container">
    <div class="search">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="Approved by" clearable />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="form.introduce" placeholder="Approved by" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { getGoods } from "@api/goods";
import { SearchDataInit, type ListData } from "@/type/goods";

const list = ref<ListData[]>([])
const form = reactive(new SearchDataInit())
getGoods<ListData[]>().then(res => {
  list.value = res
  console.log(list.value);

})
const onSubmit = () => { }
</script>

<style scoped></style>