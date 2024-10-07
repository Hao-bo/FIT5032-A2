<template>
  <div class="volunteer-container">
    <h2>Volunteer Data</h2>
    <DataTable
      v-if="volunteerData.length"
      v-model:filters="volunteerFilters"
      :value="volunteerData"
      ref="volunteerTable"
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 20, 50]"
      tableStyle="min-width: 50rem"
      filterDisplay="row"
      :globalFilterFields="['ID', 'Gender', 'Fullname', 'Location', 'Email']"
      sortMode="multiple"
    >
      <!-- 导出按钮 -->
      <template #header>
        <div class="flex justify-between pb-4">
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
              <i class="pi pi-search"></i>
            </span>
            <InputText v-model="volunteerFilters.global.value" placeholder="Keyword Search" />
          </div>
          <Button
            icon="pi pi-external-link"
            label="Export"
            class="p-button-danger"
            @click="exportCSV"
          ></Button>
        </div>
      </template>

      <!-- 表格列定义 -->
      <Column field="ID" header="ID" style="width: 10%" sortable exportHeader="ID">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            @input="filterCallback()"
            placeholder="Search by ID"
          />
        </template>
      </Column>
      <Column
        field="Fullname"
        header="Full Name"
        style="width: 20%"
        sortable
        exportHeader="Full Name"
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
        exportHeader="Location"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            @input="filterCallback()"
            placeholder="Search by location"
          />
        </template>
      </Column>
      <Column field="Email" header="Email" style="width: 20%" sortable exportHeader="Email">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            @input="filterCallback()"
            placeholder="Search by email"
          />
        </template>
      </Column>
      <Column field="Gender" header="Gender" style="width: 15%" sortable exportHeader="Gender">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            @input="filterCallback()"
            placeholder="Search by gender"
          />
        </template>
      </Column>
      <Column
        field="IsVolunteer"
        header="Is Volunteer"
        style="width: 15%"
        sortable
        exportHeader="Is Volunteer"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            @input="filterCallback()"
            placeholder="Search by volunteer"
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
const volunteerData = ref([])
const volunteerFilters = ref({
  global: { value: null, matchMode: 'contains' },
  ID: { value: null, matchMode: 'startWith' },
  Fullname: { value: null, matchMode: 'startsWith' },
  Location: { value: null, matchMode: 'startsWith' },
  Email: { value: null, matchMode: 'startWith' },
  Gender: { value: null, matchMode: 'startWith' },
  IsVolunteer: { value: null, matchMode: 'startWith' }
})

const volunteerTable = ref(null) // 引用 DataTable 实例

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

// 加载 Volunteer.csv 并解析
onMounted(() => {
  parseCSV('/Volunteer.csv', (data) => {
    volunteerData.value = data.map((item) => ({
      ID: item.id,
      Fullname: item.fullname,
      Location: item.location,
      Email: item.email,
      Gender: item.gender,
      IsVolunteer: item['is Volunteer'] === 'true' ? 'Yes' : 'No'
    }))
  })
})

// 导出 CSV 数据
const exportCSV = () => {
  volunteerTable.value.exportCSV() // 调用 DataTable 实例的 exportCSV 方法
}
</script>

<style scoped>
.volunteer-container {
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
