<template>
  <div v-if="currentUser">
    <h1>Log Out</h1>
    <p>Welcome, {{ currentUser.email }}</p>
    <button @click="logout">Log Out</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

const currentUser = ref(null) // 用于存储当前用户信息
const router = useRouter()
const auth = getAuth()

// 检测用户登录状态
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user // 更新当前用户信息
    } else {
      router.push('/fireLogin') // 如果没有用户登录，重定向到登录页面
    }
  })
})

// 登出函数
const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('Sign out successful!')
      currentUser.value = null // 清空当前用户信息
      router.push('/fireLogin') // 导航到登录页面
    })
    .catch((error) => {
      console.log('Error signing out:', error)
    })
}
</script>
