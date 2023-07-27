import React from 'react';
import JSONJOBS from '../db.json';
import '../style/joblist.css';

function JobList() {
  return (
    <div className='joblist'>
      <header>
        <h1>İş Zirve</h1>
        <input type='text' />
        <button>Ara</button>
      </header>
      <main>
        <div>
          {JSONJOBS.map((jobs) => (
            <div key={jobs.id}>
              <ul className='jobList'>
                <li>{jobs.title}</li>
                <li>{jobs.city}</li>
                <li>{jobs.date}</li>
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default JobList;