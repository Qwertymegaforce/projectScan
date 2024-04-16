import React from 'react';

const SearchResultHeader = () => {
    return (
        <div className='searchresult_header_component_div'>
            <div className='searchresult_header_div'>
                <h1 className='we_are_searching_sign'>Ищем. Скоро будут результаты</h1>
                <p className='await_results_sign'>Поиск может занять некоторое время, просим сохранять терпение.</p>
            </div>
            <div className="searchresult_header_lady_div">
                <img src="../../../static/svg/svg_searchresult/header_lady.svg" alt="" />
            </div>
        </div>
    );
}

export default SearchResultHeader;
