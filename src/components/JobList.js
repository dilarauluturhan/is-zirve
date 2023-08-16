import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import JSONJOBS from '../db.json';
import '../style/joblist.css';
import Pagination from './Pagination';

function JobList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearchTerm = searchParams.get('search') || ''; // URL'den arama terimini çek
  const initialFilter = searchParams.get('filter') || '';

  const jobsPerPage = 8; // her sayfada kaç iş ilanı gösterileceği
  const [currentPage, setCurrentPage] = useState(1); // şu anki sayfa numarası
  const [filter, setFilter] = useState(initialFilter); // filtreleme işlemi için
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm); // arama terimi için
  const [searchButtonDisabled, setSearchButtonDisabled] = useState(true); // butonu disabled yapmak için

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

  const totalPagesForSearch = Math.ceil(filterJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setCurrentPage(1); //filtre değiştiğinde sayfa numarasını sıfırla

    let filterName = '';

    switch (selectedFilter) {
      case 'title':
        filterName = 'isim';
        break;
      case 'new':
        filterName = 'tarih-yeni';
        break;
      case 'old':
        filterName = 'tarih-eski'
        break;
      default:
        break;
    }

    // filtre değiştiğinde JobList sayfasına yönlendirme yap ve filtrenin adını URL'de göster
    navigate(`/joblist?filter=${filterName}`);
  }

  const handleSearch = () => {
    setFilter('search');
    setCurrentPage(1);

    // arama yapıldığında URL'deki sorgu parametrelerini güncelle
    setSearchParams({ search: searchTerm, filter });

    // arama yapıldığında JobList sayfasına yönlendirme yap
    navigate(`/joblist?search=${encodeURIComponent(searchTerm)}&filter=${filter}`);
  }

  const handleSearchTermChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setSearchButtonDisabled(newSearchTerm.trim() === '');

    // input'ta yapılan aramayı URL'de görünür hale getir
    navigate(`/joblist?search=${encodeURIComponent(newSearchTerm)}`);
  }

  const handleFilterReset = () => {
    // filtreyi ve arama terimini sıfırla
    setFilter('');
    setSearchTerm('');

    // URL'deki sorgu parametrelerini güncelle veya kaldır
    setSearchParams({});

    // sayfayı yeniden yükle
    window.location.reload();
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
          <button
            className='search-button'
            onClick={handleSearch}
            disabled={searchButtonDisabled}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className='dropdown'>
          <button className='drop-button'>
            Filtrele
          </button>
          <div className='dropdown-content'>
            <a href='#' onClick={() => handleFilterChange('title')}>İsme göre</a>
            <a href='#' onClick={() => handleFilterChange('new')}>Tarihe göre en yeni</a>
            <a href='#' onClick={() => handleFilterChange('old')}>Tarihe göre en eski</a>
            <a href='#' onClick={() => handleFilterReset()}>Filtreyi sıfırla</a>
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
          // filter eğer search ise yani arama sonucu görüntüleniyorsa totalPagesForSearch aksi durumda tüm iş ilanları için totalPages
          totalPages={filter === 'search' ? totalPagesForSearch : totalPages}
          onPageChange={handlePageChange}
        />
      </footer>
    </div>
  )
}

export default JobList;