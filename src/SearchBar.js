import React, { useState } from 'react';
import JSONJOBS from './db.json';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <>
            <header>
                <img className='logoImg' src='./img/iszirve.png' />
            </header>
            <main>
                <input
                    className='searchInput'
                    type='text'
                    placeholder='İş bul...'
                    onChange={e => { setSearchTerm(e.target.value) }}
                />
                {JSONJOBS.filter((val) => {
                    if (searchTerm == "") {
                        return val
                    } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((val, i) => {
                    return (
                        <div key={i}>
                            <ul>
                                <li className='resultTitle'>{val.title}</li>
                                <li className='resultCity'>{val.city}</li>
                            </ul>
                        </div>
                    )
                })}
                <button className='searchButton'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </main>
        </>
    )
}

export default SearchBar;