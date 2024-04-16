import React from 'react';
import { search_actions } from '../search_utils/search_utils';


const Checkbox = (props) => {
    function toggleCheckbox(){
        props.dispatchSearchState({
            type: search_actions.SET_CHECKBOX,
            data: props.settings
        })
    }

    return (
        <div className='checkbox_component_div' onClick={toggleCheckbox}>
            <div className='checkbox_div' 
            style={!props.stateValue? {borderColor : "rgb(153, 153, 153)"} : {color : "black"}}
            >
                <img src="../../../static/svg/svg_homepage/tariffs/tick.svg" className='search_tick_svg'
                style={!props.stateValue? {display : "none"} : null}
                />
            </div>

            <p 
            style={!props.stateValue? {color : "rgb(153, 153, 153)"} : {color : "black"}}
            >
                {props.content}
            </p>
        </div>
    );
}

export default Checkbox;
