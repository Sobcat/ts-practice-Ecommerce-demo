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
    <div class="list">
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="userId" label="userId" width="180" />
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="title" label="title" />
        <el-table-column prop="introduce" label="introduce" />
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="form.count" v-model:page-size="form.pagesize"
        v-model:current-page="form.page" @change="change" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { getGoods } from "@api/goods";
import { SearchDataInit, type ListData } from "@/type/goods";

const list = ref<ListData[]>([])
const form = reactive(new SearchDataInit())
function getGoodsData() {
  getGoods<ListData[]>(form).then(res => {
    list.value = res
    form.count = 20
  })
}
getGoodsData()
const onSubmit = () => {

}
const change = () => {
  getGoodsData()
}
</script>

<style scoped></style>