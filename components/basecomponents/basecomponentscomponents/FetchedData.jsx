import React from 'react';


const FetchedData = (props) => {

    return (
        <>
        <div className="companies_div">
            <div className="companies_div_sign">
                <p>Использовано компаний</p>
            </div>
            <div className="companies_div_number">
                <p className='used_companies_sign'>{props.used}</p>
            </div>
        </div>
        <div className="companies_div">
            <div className="companies_div_sign">
                <p>Лимит по компаниям</p>    
            </div>
            <div className="companies_div_number">
                <p className='left_companies_sign'>{props.limit}</p>
            </div>
        </div>
        </>
    );
}

export default FetchedData;
