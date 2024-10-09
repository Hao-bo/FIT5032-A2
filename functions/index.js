/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
// const multer = require("multer"); // 引入 multer 用于解析 multipart/form-data
// const sgMail = require("@sendgrid/mail");
// const logger = require("firebase-functions/logger");
// 云函数：sendEmail.js
const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY =
  "SG.nkqFc2rRT9KOkufr_ce1gQ.u" + "RjPEJfpJkNXUqHPkJJ2riJQLlQ4O1YclTeXmkx2iOs";
// 使用环境变量来设置 SendGrid API Key
sgMail.setApiKey(SENDGRID_API_KEY);

admin.initializeApp();

// 设置 SendGrid API Key
// const SENDGRID_API_KEY = "SG.nkqFc2rRT9KOkufr_ce1gQ."+
// "uRjPEJfpJkNXUqHPkJJ2riJQLlQ4O1YclTeXmkx2iOs";
// sgMail.setApiKey(SENDGRID_API_KEY);

// 创建一个 Multer 实例，处理附件上传
// const upload = multer({
//  storage: multer.memoryStorage(), // 使用内存存储
// });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
exports.saveUserInfo = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // 检查请求方法是否为 POST
      if (req.method !== "POST") {
        return res.status(400).send("Only POST requests are accepted");
      }

      // 从请求体中获取用户信息
      const {userId, username, email, age, phone, isVolunteer} = req.body;

      // 检查是否提供了所有必需的字段
      if (!userId || !username || !email || !age || !phone) {
        return res.status(400).send("Missing user information");
      }

      // 将用户信息保存到 Firestore 中
      await admin.firestore().collection("users").doc(userId).set({
        username,
        email,
        age,
        phone,
        isVolunteer,
      });

      // 返回成功消息
      return res.status(200).send({
        message: "User information saved successfully!",
      });
    } catch (error) {
      console.error("Error saving user information:", error.message);
      return res.status(500).send("Error saving user information");
    }
  });
});

// 云函数：发送电子邮件
exports.sendEmail = onRequest(
    // {cors: [/firebase\.com$/, "https://flutter.com"]},
    (req, res) => {
    // 允许跨域请求
      cors(req, res, async () => {
        try {
          // 检查请求方法是否为 POST
          if (req.method !== "POST") {
            return res.status(400).send("Only POST requests are accepted");
          }

          // 从请求体中获取邮件信息
          const {to, subject, text} = req.body;

          // 检查是否提供了所有必需的字段
          if (!to || !subject || !text) {
            return res.status(400).send("Missing email information");
          }

          // 配置邮件内容
          const msg = {
            to: to,
            from: "hao_bo1017@163.com", // 替换为你的 SendGrid 验证发送者邮箱
            subject: subject,
            text: text,
            html: `<strong>${text}</strong>`, // 使用 HTML 格式的邮件正文
          };

          // 发送邮件
          await sgMail.send(msg);

          // 返回成功消息
          return res.status(200).send({
            message: "Email sent successfully!",
          });
        } catch (error) {
          console.error("Error sending email:", error.message);
          return res.status(500).send("Error sending email");
        }
      });
    },
);

// 云函数：发送带附件的电子邮件
// exports.sendEmailWithAttachments = onRequest((req, res) => {
//  // 使用 CORS 中间件处理跨域请求
//  cors(req, res, () => {
//    // 处理上传的附件文件
//    upload.array("attachments")(req, res, async (err) => {
//      if (err) {
//        console.error("Error processing file upload: ", err);
//        return res.status(400).send("Error processing file upload");
//      }
//
//      try {
//        // 只接受 POST 请求
//        if (req.method !== "POST") {
//          return res.status(400).send("Only POST requests are accepted");
//        }
//
//        // 从请求体中解析邮件参数
//        const {to, subject, text} = req.body;
//
//        // 检查是否提供了必填的邮件字段
//        if (!to || !subject || !text) {
//          return res.status(400).send(
//              "Missing required email fields (to, subject, text)");
//        }
//
//        // 处理上传的文件并将其转换为 Base64 格式
//        const attachments = req.files.map((file) => ({
//          filename: file.originalname,
//          content: file.buffer.toString("base64"), // 将文件 buffer 转换为 Base64 格式
//          type: file.mimetype,
//          disposition: "attachment",
//        }));
//
//        // 设置邮件内容
//        const msg = {
//          to: to, // 目标收件人
//          from: "hao_bo1017@163.com", // 请将此处替换为已验证的发件人邮箱
//          subject: subject,
//          text: text,
//          html: `<strong>${text}</strong>`, // 邮件的 HTML 格式
//          attachments: attachments, // 添加附件
//        };
//
//        // 发送邮件
//        await sgMail.send(msg);
//
//        // 返回成功消息
//        return res.status(200).send({
//          message: "Email sent successfully!",
//        });
//      } catch (error) {
//        // 捕获并返回错误消息
//        console.error("Error sending email: ", error.message);
//        return res.status(500).send("Error sending email: " + error.message);
//      }
//    });
//  });
// });
