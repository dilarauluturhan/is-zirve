import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JSONJOBS from '../db.json';
import '../style/joblist.css';
import Pagination from './Pagination';

function JobList() {

  const jobsPerPage = 8; // her sayfada kaç iş ilanı gösterileceği
  const [currentPage, setCurrentPage] = useState(1); // şu anki sayfa numarası
  const [filter, setFilter] = useState(''); // filtreleme işlemi için
  const [searchTerm, setSearchTerm] = useState(''); // arama terimi için

  // iş ilanlarını filtreleyen fonksiyon
  const filterJobs = (jobList) => {
    const filteredList = filter !== 'search' ? jobList : jobList.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()));
    switch (filter) {
      case 'title':
        return filteredList.sort((a, b) => a.title.localeCompare(b.title));
      case 'new':
        return filteredList.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'old':
        return filteredList.sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return filteredList;
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

  const handleSearch = () => {
    setFilter('search');
    setCurrentPage(1);
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }
  return (
    <div className='job-list'>
      <header>
        <div className='head'>
          <Link to='/' className='job-head'>İş Zirve</Link>
          <input 
          type='text'
          value={searchTerm}
          onChange={handleSearchTermChange}
          />
          <button className='search-button' onClick={handleSearch}>
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