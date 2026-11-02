import { useState, useEffect } from 'react'

const API = 'http://localhost:3000/jobs'
const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected']

function App() {
  const [jobs, setJobs] = useState([])
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Applied')

  const loadJobs = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setJobs(data))
  }

  useEffect(() => {
    loadJobs()
  }, [])

  const addJob = async () => {
    if (!company || !role) return
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, role, status }),
    })
    setCompany('')
    setRole('')
    setStatus('Applied')
    loadJobs()
  }

  const updateStatus = async (job, newStatus) => {
    await fetch(`${API}/${job.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...job, status: newStatus }),
    })
    loadJobs()
  }

  const deleteJob = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    loadJobs()
  }

  return (
    <div className="container">
      <h1>Job Tracker</h1>

      <div className="form">
        <input
          placeholder="Company"
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
        <input
          placeholder="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          {STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={addJob}>Add Job</button>
      </div>

      <div className="job-list">
        {jobs.length === 0 && <p>No jobs yet. Add your first one above.</p>}
        {jobs.map(job => (
          <div className="job-card" key={job.id}>
            <h3>{job.company}</h3>
            <p>{job.role}</p>
            <select
              value={job.status}
              onChange={e => updateStatus(job, e.target.value)}
            >
              {STATUSES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button onClick={() => deleteJob(job.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App