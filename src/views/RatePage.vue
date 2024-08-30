<template>
  <div class="container mt-5">
    <h1>Rate the Website</h1>
    <div class="mb-3">
      <label for="advice" class="form-label"
        >Please leave your advice and rate to help us improve</label
      >
      <textarea
        class="form-control"
        id="advice"
        rows="3"
        @blur="() => validateAdvice(true)"
        @input="() => validateAdvice(false)"
        v-model="formData.advice"
      ></textarea>
      <div v-if="errors.advice" class="text-danger">{{ errors.advice }}</div>
    </div>

    <div class="text-center">
      <button class="btn btn-primary" @click="submitRating">Submit</button>
    </div>

    <DataTable v-if="submittedRatings.length" :value="submittedRatings" class="mt-4">
      <Column field="advice" header="Advice"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import {DataTable}
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  advice: ''
})

const errors = ref({
  advice: ''
})

const submittedRatings = ref([])

const validateAdvice = (isBlur) => {
  const adviceText = formData.value.advice
  const wordCount = adviceText.split(/\s+/).filter((word) => word).length

  if (!adviceText) {
    if (isBlur) errors.value.advice = 'Please leave your advice is required.'
  } else if (wordCount < 10) {
    if (isBlur) errors.value.advice = 'Advice must be at least 10 words.'
  } else {
    errors.value.advice = null
  }
}

const submitRating = () => {
  validateAdvice(true)

  if (errors.value.advice) {
    alert('Advice must be more than ten words')
    return
  }

  // push advice to submittedRatings
  submittedRatings.value.push({
    advice: formData.value.advice
  })

  // clear advice
  formData.value.advice = ''
}
</script>
