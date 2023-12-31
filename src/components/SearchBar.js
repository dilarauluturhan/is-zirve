import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JSONJOBS from '../db.json';
import '../style/searchbar.css';

function SearchBar() {
    const navigate = useNavigate();

    const [value, setValue] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [searchButtonDisabled, setSearchButtonDisabled] = useState(true); // buton durumu için state

    const onChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        // input değeri değiştiğinde showMore durumunu güncelle
        setShowMore(inputValue.trim() !== '');
        setSearchButtonDisabled(inputValue.trim() === ''); // Input değeri boşsa butonu devre dışı bırak
    }

    const onSearch = (searchTerm) => {
        setValue(searchTerm); // çıkan meskeğe tıkladığımda input'ta aradığım kelimeyi tamamlıyor
        setShowMore(true);
        setSearchButtonDisabled(false); // Butonu aktif hale getir
        navigate(`/joblist?search=${searchTerm}`);
    }

    return (
        <div className='search-bar'>
            <header>
                <div className="flex-flex flex-direction--column" style={{ minHeight: "100vh", flexGrow: "1" }}>
                    <div className="loginbackground box-background--white padding-top--64">
                        <div className="loginbackground-gridContainer">
                            <div className=" flex-flex" style={{ gridArea: "top / start / 8 / end" }}>
                                <div
                                    style={{ backgroundImage: "linear-gradient(white 0%, rgb(247, 250, 252) 33%)", flexGrow: "1" }}>
                                </div>
                            </div>
                            <div className="flex-flex" style={{ gridArea: "4 / 2 / auto / 5" }}>
                                <div className="box-divider--light-all-2 animationLeftRight tans3s" style={{ flexGrow: "1" }}>
                                </div>
                            </div>
                            <div className="flex-flex" style={{ gridArea: "6 / start / auto / 2" }}>
                                <div className="box-background--blue800" style={{ flexGrow: "1" }}></div>
                            </div>
                            <div className="flex-flex" style={{ gridArea: "7 / start / auto / 4" }}>
                                <div className="box-background--blue animationLeftRight" style={{ flexGrow: "1" }}></div>
                            </div>
                            <div className="flex-flex" style={{ gridArea: "8 / 4 / auto / 6" }}>
                                <div className="box-background--gray100 animationLeftRight tans3s" style={{ flexGrow: "1" }}>
                                </div>
                            </div>
                            <div className="flex-flex" style={{ gridArea: "2 / 15 / auto / end" }}>
                                <div className="box-background--blue800 animationRightLeft tans4s" style={{ flexGrow: "1" }}>
                                </div>
                            </div>
                            <div className="flex-flex" style={{ gridArea: "3 / 14 / auto / end" }}>
                                <div className="box-background--blue animationRightLeft" style={{ flexGrow: "1" }}></div>
                            </div>
                            <div className="flex-flex" style={{ gridArea: "4 / 17 / auto / 20" }}>
                                <div className="box-background--gray100 animationRightLeft tans4s" style={{ flexGrow: "1" }}>
                                </div>
                            </div>
                            <div className="flex-flex" style={{ gridArea: "5 / 14 / auto / 17" }}>
                                <div className="box-divider--light-all-2 animationRightLeft tans3s" style={{ flexGrow: "1" }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main className='root'>
                <div className='loginbackground'>
                    <h1 className='header'>işZirve</h1>
                    <p className='subheader'>Kariyerinde zirve yapanlar...</p>
                    <div className='search'>
                        <input
                            type='text'
                            className='search-input'
                            value={value}
                            onChange={onChange}
                            placeholder='İş bul...'
                        />
                        <button 
                        onClick={() => onSearch(value)} 
                        className='search-button'
                        disabled={searchButtonDisabled}
                        >
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
                                    <ul className='job-info'>
                                        <li className='job-title'>{jobs.title}</li>
                                        <li className='job-city'>{jobs.city}</li>
                                        <li className='job-date'>{jobs.date}</li>
                                    </ul>
                                </div>
                            ))}
                        {showMore && (
                            <Link className='more' to='/joblist'>Daha fazla...</Link>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SearchBar;