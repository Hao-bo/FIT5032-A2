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
export default {
  data() {
    return {
      email: {
        to: '',
        subject: '',
        text: ''
      }
    }
  },
  methods: {
    // 发送邮件
    async sendEmail() {
      try {
        // 直接发送 email 对象作为请求体
        const response = await fetch('https://sendemail-345mlhejoa-uc.a.run.app', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.email),
          mode: 'cors' // 启用 CORS 模式
        })

        if (response.ok) {
          alert('邮件发送成功')
        } else {
          alert(`发送失败: ${response.statusText}`)
        }
      } catch (error) {
        alert(`Error: ${error.message}`)
      }
    }
  }
}
</script>

<style>
.card {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}
</style>
