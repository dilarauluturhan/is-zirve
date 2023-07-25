import React, { useState } from 'react';
import JSONJOBS from './db.json';

function SearchBar() {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSearch = (searchTerm) => {
        console.log('Search', searchTerm);
        setValue(searchTerm); // çıkan meskeğe tıkladığımda input'ta aradığım kelimeyi tamamlıyor
    }
    return (
        <>
            <header>
                <img className='logoImg' src='./img/iszirve.png' />
            </header>
            <main>
                <div>
                    <div>
                        <input
                            type='text'
                            value={value}
                            onChange={onChange}
                        />
                        <button onClick={() => onSearch(value)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <div>
                        {JSONJOBS.filter(jobs => {
                            const searchTerm = value.toLowerCase();
                            const title = jobs.title.toLowerCase();

                            return searchTerm && title.startsWith(searchTerm) && title !== searchTerm;
                        })
                            .slice(0, 3) // 3 tane listelesin
                            .map((jobs) => (
                                <div
                                    onClick={() => onSearch(jobs.title)}
                                    key={jobs.id}
                                >
                                    <ul>
                                        <li>{jobs.title}</li>
                                        <li>{jobs.city}</li>
                                    </ul>
                                </div>
                            ))}
                        <a href='#\'>Daha Fazla...</a>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SearchBar;