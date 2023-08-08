import React from 'react';
import '../style/pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const numOfPages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className='pagination'>
            <p className='page'>Sayfa</p>
            <div className='page-number'>{currentPage}</div>
            <a
                href='#\'
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <i class="fa-solid fa-circle-arrow-left fa-xl" style={{ color: "#22333c" }}></i>
            </a>

            {
                numOfPages.map((page) => {
                    return (
                        <div>
                            <a
                                key={page}
                                className={`page-item ${currentPage === page ? 'active' : ''}`}
                                href='#\'
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </a>
                        </div>
                    )
                })
            }

            <a
                href='#\'
                className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <i class="fa-solid fa-circle-arrow-right fa-xl" style={{ color: "#22333c" }}></i>
            </a>
        </div>
    )
}

export default Pagination;
