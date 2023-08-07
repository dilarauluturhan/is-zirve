import React, { useState } from 'react';
import JSONJOBS from '../db.json';
import '../style/joblist.css';
import Pagination from './Pagination';

function JobList() {

  const jobsPerPage = 8; // her sayfada kaç iş ilanı gösterileceği
  const [currentPage, setCurrentPage] = useState(1); // şu anki sayfa numarası
  const [filter, setFilter] = useState(''); // filtreleme işlemi için

  // iş ilanlarını filtreleyen fonksiyon
  const filterJobs = (jobList) => {
    switch (filter) {
      case 'title':
        return jobList.sort((a, b) => a.title.localeCompare(b.title));
      case 'new':
        return jobList.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'old':
        return jobList.sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return jobList;
    }
  }

  // iş ilanlarını filtreleyerek şu anki sayfadaki iş ilanlarını almak için
  const currentJobs = filterJobs(JSONJOBS).slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  // toplam sayfa sayısı hesabı
  const totalPages = Math.ceil(JSONJOBS.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    // console.log("Sayfa değiştirildi: ", pageNumber);
    setCurrentPage(pageNumber);
  }

  const handleFilterChange = (selectedFilter) => {
    // console.log("Filtre değiştirildi: ", selectedFilter);
    setFilter(selectedFilter);
    setCurrentPage(1); //filtre değiştiğinde sayfa numarasını sıfırla
  }

  return (
    <div className='job-list'>
      <header>
        <div className='head'>
          <h1>İş Zirve</h1>
          <input type='text' />
          <button className='search-button'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className='dropdown'>
          <button className='drop-button'>
            Filtrele
          </button>
          <div className='dropdown-content'>
            <a href='#\' onClick={() => handleFilterChange('title')}>İsme göre</a>
            <a href='#\' onClick={() => handleFilterChange('new')}>Tarihe göre en yeni</a>
            <a href='#\' onClick={() => handleFilterChange('old')}>Tarihe göre en eski</a>
          </div>
        </div>
      </header>
      <main>
        <div>
          {currentJobs.map((jobs) => (
            <div key={jobs.id}>
              <ul className='job-info'>
                <li className='job-title'>{jobs.title}</li>
                <li className='job-city'>{jobs.city}</li>
                <li className='job-date'>{jobs.date}</li>
              </ul>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </footer>
    </div>
  )
}

export default JobList;