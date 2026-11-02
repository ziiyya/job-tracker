const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const cors = require('cors');
app.use(cors());
app.use(express.json())

const JOBS_FILE = path.join(__dirname, 'jobs.json')

if (!fs.existsSync(JOBS_FILE)) {
  fs.writeFileSync(JOBS_FILE, JSON.stringify([]))
}

const getJobs = () => JSON.parse(fs.readFileSync(JOBS_FILE))
const saveJobs = (jobs) => fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2))

// Get all jobs
app.get('/jobs', (req, res) => {
  const jobs = getJobs()
  res.json(jobs)
})

// Add a job
app.post('/jobs', (req, res) => {
  const jobs = getJobs()
  const newJob = {
    id: Date.now(),
    company: req.body.company,
    role: req.body.role,
    status: req.body.status || 'Applied',
    date: new Date().toISOString()
  }
  jobs.push(newJob)
  saveJobs(jobs)
  res.json(newJob)
})

// Update job status
app.put('/jobs/:id', (req, res) => {
  const jobs = getJobs()
  const index = jobs.findIndex(j => j.id == req.params.id)
  if (index === -1) return res.status(404).json({ message: 'Job not found' })
  jobs[index] = { ...jobs[index], ...req.body }
  saveJobs(jobs)
  res.json(jobs[index])
})

// Delete a job
app.delete('/jobs/:id', (req, res) => {
  let jobs = getJobs()
  jobs = jobs.filter(j => j.id != req.params.id)
  saveJobs(jobs)
  res.json({ message: 'Job deleted' })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})