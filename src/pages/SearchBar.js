import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JSONJOBS from '../db.json';
import '../style/searchbar.css';

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
        <div>
            <header>
                    <div class="flex-flex flex-direction--column" style={{ minHeight: "100vh", flexGrow: "1" }}>
                        <div class="loginbackground box-background--white padding-top--64">
                            <div class="loginbackground-gridContainer">
                                <div class=" flex-flex" style={{ gridArea: "top / start / 8 / end" }}>
                                    <div
                                        style={{ backgroundImage: "linear-gradient(white 0%, rgb(247, 250, 252) 33%)", flexGrow: "1" }}>
                                    </div>
                                </div>
                                <div class="flex-flex" style={{ gridArea: "4 / 2 / auto / 5" }}>
                                    <div class="box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: "1" }}>
                                    </div>
                                </div>
                                <div class="flex-flex" style={{ gridArea: "6 / start / auto / 2" }}>
                                    <div class="box-background--blue800" style={{ flexGrow: "1" }}></div>
                                </div>
                                <div class="flex-flex" style={{ gridArea: "7 / start / auto / 4" }}>
                                    <div class="box-background--blue animationLeftRight" style={{ flexGrow: "1" }}></div>
                                </div>
                                <div class="flex-flex" style={{ gridArea: "8 / 4 / auto / 6" }}>
                                    <div class="box-background--gray100 animationLeftRight tans3s" style={{ flexGrow: "1" }}>
                                    </div>
                                </div>
                                <div class="flex-flex" style={{ gridArea: "2 / 15 / auto / end" }}>
                                    <div class="box-background--blue800 animationRightLeft tans4s" style={{ flexGrow: "1" }}>
                                    </div>
                                </div>
                                <div class="flex-flex" style={{ gridArea: "3 / 14 / auto / end" }}>
                                    <div class="box-background--blue animationRightLeft" style={{ flexGrow: "1" }}></div>
                                </div>
                                <div class="flex-flex" style={{ gridArea: "4 / 17 / auto / 20" }}>
                                    <div class="box-background--gray100 animationRightLeft tans4s" style={{ flexGrow: "1" }}>
                                    </div>
                                </div>
                                <div class="flex-flex" style={{ gridArea: "5 / 14 / auto / 17" }}>
                                    <div class="box-divider--light-all-2 animationRightLeft tans3s" style={{ flexGrow: "1" }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </header>
            <main className='root'>
                <div className='loginbackground'>
                <h1 className='header'>işZirve</h1>
                    <div className='search'>
                        <input
                            type='text'
                            className='search-input'
                            value={value}
                            onChange={onChange}
                            placeholder='İş bul...'
                        />
                        <button onClick={() => onSearch(value)} className='search-button'>
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
                                    <ul className='jobList'>
                                        <li>{jobs.title}</li>
                                        <li>{jobs.city}</li>
                                        <li>{jobs.date}</li>
                                    </ul>
                                </div>
                            ))}
                        <Link className='moreJobs' to='/joblist'>Daha fazla...</Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SearchBar;