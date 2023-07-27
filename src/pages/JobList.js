import React from 'react';
import JSONJOBS from '../db.json';
import '../style/joblist.css';
import { Link } from 'react-router-dom';

function JobList() {
  return (
    <div className='job-list'>
      <header>
        <h1>İş Zirve</h1>
        <input type='text' />
        <button className='search-button'>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <div className='dropdown'>
          <button className='drop-button'>
            Filtrele
          </button>
          <div className='dropdown-content'>
            <a href='#\'>İsme göre</a>
            <a href='#\'>Tarihe göre en yeni</a>
            <a href='#\'>Tarihe göre en eski</a>
          </div>
        </div>
      </header>
      <main>
        <div>
          {JSONJOBS.map((jobs) => (
            <div key={jobs.id}>
              <ul>
                <li>{jobs.title}</li>
                <li>{jobs.city}</li>
                <li>{jobs.date}</li>
                <div className='underline'></div>
              </ul>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <div className='pagination'>
            <a href='#\'>&laquo;</a>
            <a className='active' href='#\'>1</a>
            <a href='#\'>2</a>
            <a href='#\'>3</a>
            <a href='#\'>4</a>
            <a href='#\'>5</a>
            <a href='#\'>6</a>
            <a href='#\'>&raquo;</a>
        </div>
      </footer>
    </div>
  )
}

export default JobList;