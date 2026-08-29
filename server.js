const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const app = express()
app.use(express.json())

console.log("MONGO_URI exists:", !!process.env.MONGO_URI)
console.log("MONGO_URI starts with:", process.env.MONGO_URI?.substring(0, 20))

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB Error:', err))

app.get('/', (req, res) => {
  res.send('Job Tracker API is running')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})