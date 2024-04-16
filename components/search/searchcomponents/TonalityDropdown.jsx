import React from 'react';
import { search_actions } from '../search_utils/search_utils';

const TonalityDropdown = (props) => {

    function setTonality(tonality){
        props.dispatchSearchState({
            type: search_actions.SET_TONALITY,
            data: tonality
        })
    }
    return (
        <div className="tonality_dropdown_div"
        style={!props.display? {display : "none"} : null}
        >
            <p onClick={()=> {setTonality("Любая")}}>Любая</p>
            <p onClick={()=> {setTonality("Позитивная")}}>Позитивная</p>
            <p onClick={()=> {setTonality("Негативная")}}>Негативная</p>
        </div>
    );
}

export default TonalityDropdown;
