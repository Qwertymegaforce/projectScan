import React from 'react';

const SearchHeader = () => {
    return (
        <div className='search_header_component_div'>
            <h1 className="search_needed_data_sign">
                Найдите необходимые данные в пару кликов.
            </h1>

            <p className="bigger_better_sign">
                Задайте параметры поиска. <br />
                Чем больше заполните, тем точнее поиск.
            </p>
        </div>
    );
}

export default SearchHeader;
