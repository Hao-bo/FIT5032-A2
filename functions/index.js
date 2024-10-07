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

// const logger = require("firebase-functions/logger");

admin.initializeApp();

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
