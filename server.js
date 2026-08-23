const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Job Tracker API is running')
})

app.get('/jobs', (req, res) => {
    res.json([
        { company: "Google", role: "DevOps Intern", status: "Applied" },
        { company: "Amazon", role: "Cloud Intern", status: "Interview" }
    ])
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})