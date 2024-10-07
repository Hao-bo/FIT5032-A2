<template>
  <div class="container mt-5">
    <div class="row">
      <!-- display introduce -->
      <div class="container mt-5 pt-5">
        <section class="intro p-4 bg-light rounded">
          <h2>Introduction</h2>
          <p>
            Welcome to Australian elder help. We are dedicated to providing support and services for
            the elderly in Australia. Whether you are looking to volunteer, need assistance, or want
            to participate in our activities, Please Login and we are here to help.
          </p>
        </section>
      </div>
      <div class="col-md-8 offset-md-2">
        <h1>Login and Registration</h1>
        <form @submit.prevent="register">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="username" class="form-label">Username(Required)</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6">
              <label for="password" class="form-label">Password(Required)</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="age" class="form-label">Age(Required)</label>
              <input
                type="number"
                class="form-control"
                id="age"
                @blur="() => validateAge(true)"
                @input="() => validateAge(false)"
                v-model="formData.age"
              />
              <div v-if="errors.age" class="text-danger">{{ errors.age }}</div>
            </div>
            <div class="col-md-6">
              <label for="email" class="form-label">Email(Required)</label>
              <input
                type="email"
                class="form-control"
                id="email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
                v-model="formData.email"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label for="phone" class="form-label">Phone Number(Required)</label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                @blur="() => validatePhone(true)"
                @input="() => validatePhone(false)"
                v-model="formData.phone"
              />
              <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
            </div>
            <div class="col-md-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isVolunteer"
                  v-model="formData.isVolunteer"
                />
                <label class="form-check-label" for="isVolunteer">Volunteer?</label>
              </div>
            </div>
          </div>

          <!-- <div class="mb-3">
            <label for="reason" class="form-label">Reason for Joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
              v-model="formData.reason"
            ></textarea>
          </div> -->

          <div class="text-center">
            <button type="button" class="btn btn-primary me-2" @click="login">Login</button>
            <button type="button" class="btn btn-secondary me-2" @click="clearForm">Clear</button>
            <button type="submit" class="btn btn-success">Registration</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- <div class="row mt-5" v-if="submittedCards.length">
    <div class="d-flex flex-wrap justify-content-start">
      <div
        v-for="(card, index) in submittedCards"
        :key="index"
        class="card m-2"
        style="width: 18rem"
      >
        <div class="card-header">User Information</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Username: {{ card.username }}</li>
          <li class="list-group-item">Password: {{ card.password }}</li>
          <li class="list-group-item">Age: {{ card.age }}</li>
          <li class="list-group-item">Email: {{ card.email }}</li>
          <li class="list-group-item">Phone Number: {{ card.phone }}</li>
          <li class="list-group-item">Volunteer: {{ card.isVolunteer ? 'Yes' : 'No' }}</li>
          <li class="list-group-item">Gender: {{ card.gender }}</li>
          <li class="list-group-item">Reason: {{ card.reason }}</li>
        </ul>
      </div>
    </div>
  </div> -->

  <!-- <div class="card">
    <DataTable :value="submittedCards" tableStyle="min-width: 25rem">
      <Column field="username" header="Username"></Column>
      <Column field="password" header="Password"></Column>
      <Column field="age" header="Age"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="phone" header="Phone Number"></Column>
      <Column field="isVolunteer" header="Volunteer"></Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="reason" header="Reason"></Column>
    </DataTable>
  </div> -->
</template>

<script setup>
// import router from '@/router'
import { ref, onMounted } from 'vue'
// import router from '@/router'
import { useRouter } from 'vue-router'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/column'

const router = useRouter()

const formData = ref({
  username: '',
  password: '',
  age: '',
  email: '',
  phone: '',
  isVolunteer: false,
  gender: ''
  //reason: ''
})

const errors = ref({
  username: '',
  password: '',
  age: '',
  email: '',
  phone: ''
})

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    age: '',
    email: '',
    phone: '',
    isVolunteer: false,
    gender: ''
    //reason: ''
  }
}

const submittedCards = ref([])

// Get the data from Local Storage and display it
onMounted(() => {
  submittedCards.value = JSON.parse(localStorage.getItem('submittedCards')) || []
})

const register = () => {
  // Check if all fields are valid
  validateName(true)
  validatePassword(true)
  validateAge(true)
  validateEmail(true)
  validatePhone(true)

  // If there are any errors, do not proceed
  if (Object.values(errors.value).some((error) => error)) {
    return
  }

  // Local Storage
  const existingData = JSON.parse(localStorage.getItem('submittedCards')) || []
  existingData.push({ ...formData.value })
  localStorage.setItem('submittedCards', JSON.stringify(existingData))
  submittedCards.value = existingData // Dynamically update data
  clearForm()
}

const login = () => {
  const existingData = JSON.parse(localStorage.getItem('submittedCards')) || []
  const user = existingData.find(
    (user) =>
      user.username === formData.value.username &&
      user.password === formData.value.password &&
      user.phone === formData.value.phone &&
      user.isVolunteer === formData.value.isVolunteer // 新增验证 isVolunteer 的逻辑
  )

  if (user) {
    alert('Login successful!')
    localStorage.setItem('loggedInUser', JSON.stringify(user))
    if (user.isVolunteer) {
      router.push('/volunteer')
    }
  } else {
    alert('Login failed: Incorrect username, password, phone number, or volunteer status')
  }
}

const validateNull = (field, fieldName) => {
  if (!formData.value[field]) {
    errors.value[field] = `${fieldName} is required.`
    return false
  }
  return true
}

const validateName = (blur) => {
  if (!validateNull('username', 'Username')) {
    return
  }
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  if (!validateNull('password', 'Password')) {
    return
  }
  const password = formData.value.password
  const minLength = 3
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}<>]/.test(password)
  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateAge = (blur) => {
  if (!validateNull('age', 'Age')) {
    return
  }
  const age = formData.value.age
  const isVolunteer = formData.value.isVolunteer

  if (isVolunteer && (age < 18 || age > 65)) {
    if (blur) errors.value.age = 'Volunteers must be older than 18 and less than 65 years old'
  } else if (!isVolunteer && age < 0) {
    if (blur) errors.value.age = 'Age cannot be negative'
  } else {
    errors.value.age = null
  }
}

const validatePhone = (blur) => {
  if (!validateNull('phone', 'Phone number')) {
    return
  }
  const phonePattern = /^\d{10}$/
  if (!phonePattern.test(formData.value.phone)) {
    if (blur) errors.value.phone = 'Phone number must be exactly 10 digits'
  } else {
    errors.value.phone = null
  }
}

const validateEmail = (blur) => {
  if (!validateNull('email', 'Email')) {
    return
  }
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(formData.value.email)) {
    if (blur) errors.value.email = 'Invalid email format'
  } else {
    errors.value.email = null
  }
}
</script>

<style scoped>
@media (min-width: 600px) {
  .col-md-6 {
    flex: 0 0 auto;
    width: 50%;
  }
}
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
