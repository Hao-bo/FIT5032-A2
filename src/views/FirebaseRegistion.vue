<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="username" v-model="username" /></p>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><input type="text" placeholder="Age" v-model="age" /></p>
  <p><input type="text" placeholder="Phone Number" v-model="phone" /></p>
  <p>
    Is volunteer?
    <input type="checkbox" v-model="isVolunteer" />
  </p>
  <p><button @click="register">Register</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const username = ref('')
const email = ref('')
const password = ref('')
const age = ref('') // 添加年龄字段
const phone = ref('') // 添加手机号字段
const isVolunteer = ref(false) // 添加是否志愿者的布尔值
const router = useRouter()
const auth = getAuth()
const db = getFirestore() // 初始化 Firestore 数据库

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Firebase Register Successful!')
      const userId = data.user.uid

      // 调用云函数保存用户信息
      fetch('https://saveuserinfo-345mlhejoa-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          username: username.value,
          email: email.value,
          age: age.value,
          phone: phone.value,
          isVolunteer: isVolunteer.value
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('User data saved through cloud function:', data)
          router.push('/fireLogin')
        })
        .catch((error) => {
          console.log('Error saving user data through cloud function:', error)
        })
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>
