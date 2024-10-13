<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h4 class="text-center">Send Email</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="sendEmail">
              <div class="form-group mb-3">
                <label for="to">Recipient's email</label>
                <input
                  id="to"
                  type="email"
                  class="form-control"
                  v-model="email.to"
                  placeholder="Please enter Recipient's email address"
                  required
                />
              </div>

              <div class="form-group mb-3">
                <label for="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  class="form-control"
                  v-model="email.subject"
                  placeholder="Please enter subject"
                  required
                />
              </div>

              <div class="form-group mb-3">
                <label for="text">Content</label>
                <textarea
                  id="text"
                  class="form-control"
                  v-model="email.text"
                  placeholder="Please enter content"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div class="text-center">
                <button type="submit" class="btn btn-primary">Send Email</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const email = ref({
      to: '',
      subject: '',
      text: ''
    })

    const sendEmail = async () => {
      try {
        const response = await fetch('https://sendemail-345mlhejoa-uc.a.run.app/sendEmail', {
          method: 'POST', //          https://sendemail-345mlhejoa-uc.a.run.app
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(email.value)
        })

        if (response.ok) {
          alert('send successful')
        } else {
          alert(`send default: ${response.statusText}`)
        }
      } catch (error) {
        alert(`Error: ${error.message}`)
      }
    }

    return {
      email,
      sendEmail
    }
  }
}
</script>

<style>
.card {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}
</style>
