// 使用 import 语法引入 SendGrid 邮件库
import sgMail from '@sendgrid/mail'

// 设置 SendGrid API Key（从环境变量中获取）
sgMail.setApiKey('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')

// 定义邮件内容
const msg = {
  to: 'xgon0013@student.monash.edu', // 替换为目标收件人的邮箱地址
  from: 'hao_bo1017@163.com', // 替换为已验证的发件人邮箱地址
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>'
}

// 发送邮件
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error('Error sending email:', error)
  })
