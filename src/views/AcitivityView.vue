<template>
  <div class="activity-container">
    <h2>Activity Data</h2>
    <DataTable
      v-if="activityData.length"
      v-model:filters="activityFilters"
      :value="activityData"
      ref="activityTable"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
      tableStyle="min-width: 50rem"
      filterDisplay="row"
      :globalFilterFields="['ActivityName', 'Location', 'Date', 'Time']"
      sortMode="multiple"
    >
      <!-- 全局搜索框和导出按钮 -->
      <template #header>
        <div class="flex justify-between pb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-search"></i>
            </span>
            <InputText v-model="activityFilters.global.value" placeholder="Keyword Search" />
          </div>
          <Button
            icon="pi pi-external-link"
            label="Export"
            class="p-button-danger"
            @click="exportCSV"
          ></Button>
        </div>
      </template>

      <!-- 表格列定义及单列搜索功能 -->
      <Column field="ID" header="ID" style="width: 10%" sortable></Column>

      <Column
        field="ActivityName"
        header="Activity Name"
        style="width: 20%"
        sortable
        exportHeader="Activity Name"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            @input="filterCallback()"
            placeholder="Search by name"
          />
        </template>
      </Column>

      <Column
        field="Location"
        header="Location"
        style="width: 20%"
        sortable
        exportHeader="Activity Location"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            @input="filterCallback()"
            placeholder="Search by location"
          />
        </template>
      </Column>

      <Column field="Date" header="Date" style="width: 20%" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            @input="filterCallback()"
            placeholder="Search by date"
          />
        </template>
      </Column>

      <Column field="Time" header="Time" style="width: 20%" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            @input="filterCallback()"
            placeholder="Search by time"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Papa from 'papaparse'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext' // 引入 InputText 组件

// 定义表格数据和过滤器
const activityData = ref([])
const activityFilters = ref({
  global: { value: null, matchMode: 'contains' },
  ActivityName: { value: null, matchMode: 'startsWith' },
  Location: { value: null, matchMode: 'startsWith' },
  Date: { value: null, matchMode: 'startsWith' },
  Time: { value: null, matchMode: 'startsWith' }
})

const activityTable = ref(null) // 定义 ref 来引用 DataTable 实例

// 解析 CSV 文件的通用函数
const parseCSV = (filePath, callback) => {
  Papa.parse(filePath, {
    download: true,
    header: true,
    complete: (result) => {
      callback(result.data)
    }
  })
}

// 加载 Activity.csv 并解析
onMounted(() => {
  parseCSV('/Activity.csv', (data) => {
    activityData.value = data.map((item) => ({
      ID: item.ID,
      ActivityName: item['Activity name'],
      Location: item.location,
      Date: item.Date,
      Time: item.Time
    }))
  })
})

// 导出 CSV 数据
const exportCSV = () => {
  activityTable.value.exportCSV() // 调用 DataTable 实例的 exportCSV 方法
}
</script>

<style scoped>
.activity-container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  margin-top: 30px;
  margin-bottom: 10px;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.text-end {
  text-align: end;
}

.pb-4 {
  padding-bottom: 1rem;
}
</style>
