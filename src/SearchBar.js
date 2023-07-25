import React from 'react';
import JSONJOBS from './db.json';

function SearchBar() {
    return (
        <>
            <header>
                <img className='logoImg' src='./img/iszirve.png' />
            </header>
            <main>
                <input className='searchInput' type='text' placeholder='İş bul...' />
                {JSONJOBS.map((val, i) => {
                    return (
                        <div>
                            <p className='searchResult'>{val.title}</p>
                        </div>
                    )
                })}
                <button className='searchButton'>Ara</button>
            </main>
        </>
    )
}

export default SearchBar;