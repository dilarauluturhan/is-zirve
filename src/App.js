import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar.js';
import JobList from './components/JobList.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<SearchBar />} />
        <Route path='/joblist' element={<JobList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;