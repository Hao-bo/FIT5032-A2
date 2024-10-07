const admin = require('firebase-admin')
const fs = require('fs')
const Papa = require('papaparse')

// 初始化 Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json') // 你的 Firebase 管理员密钥文件

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

// 获取 Firestore 数据库实例
const db = admin.firestore()

// 定义 CSV 文件路径和 Firestore 集合名称
const activityFilePath = './Activity.csv'
const volunteerFilePath = './Volunteer.csv'
const activityCollection = 'activities'
const volunteerCollection = 'volunteers'

// 读取 CSV 文件并转换为 JSON 格式
function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        const parsedData = Papa.parse(data, { header: true }).data // 使用 PapaParse 解析 CSV
        resolve(parsedData)
      }
    })
  })
}

// 将 JSON 数据上传到 Firestore 中
async function uploadToFirestore(collectionName, data) {
  const collectionRef = db.collection(collectionName)
  for (const item of data) {
    // 使用 CSV 数据的 `id` 字段作为文档 ID（如果存在）
    const docId = item.id || item.ID || collectionRef.doc().id
    await collectionRef.doc(docId).set(item)
    console.log(`Document ${docId} uploaded to ${collectionName}`)
  }
}

// 执行数据上传
async function main() {
  try {
    // 读取 CSV 文件并转换为 JSON
    const activityData = await readCSV(activityFilePath)
    const volunteerData = await readCSV(volunteerFilePath)

    // 上传数据到 Firestore 中
    await uploadToFirestore(activityCollection, activityData)
    await uploadToFirestore(volunteerCollection, volunteerData)

    console.log('All data successfully uploaded to Firestore')
  } catch (error) {
    console.error('Error uploading data: ', error)
  }
}

// 运行脚本
main()
