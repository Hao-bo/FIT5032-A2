<script setup>
// import HomePage from './components/HomePage.vue'
// import RegistionForm from './views/RegistionForm.vue'
// import HomePage from './views/HomePage.vue'
import RegistionForm from './views/RegistionForm.vue'
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- <Header />
  <Homepage /> -->
  <!-- <div class="navigate"> -->

  <!-- <header style="height: 11vh">
    <NavBar />
  </header> -->
  <div id="app">
    <!-- 导入并渲染导航栏 -->
    <NavBar />
    <!-- 主内容区域 -->
    <main class="container-padding">
      <router-view></router-view>
    </main>
  </div>

  <!-- A2 layout -->
  <!-- <div class="main-content">
    <RegistionForm />
    <RouterView></RouterView>
  </div> -->

  <!-- <HomePage /> -->
  <!-- <RegistionForm /> -->
</template>

<script>
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style scoped>
/* 避免内容与固定的导航栏重叠 */
.container-padding {
  padding-top: 80px; /* 顶部填充，与导航栏高度一致 */
  padding-left: 10px;
  padding-right: 10px;
}

/* 全局页面布局样式 */
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
}
</style>
