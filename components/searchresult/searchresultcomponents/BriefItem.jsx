import React from 'react';

const BriefItem = (props) => {
    return (
        <div className='brief_item_component' style={
            {
                minWidth: props.windowWidth <= 500? props.tableHeaders.current.offsetWidth : ""
            }
        }>

            <div className='brief_item_data'>
                <p>{props.date}</p>
                <p>{props.totalDocs}</p>
                <p>{props.riskDocs}</p>
            </div>
            
            <img className="gray_rectangle_brief" src="../../../static/svg/svg_searchresult/long_rectangle.svg"/>
        </div>
    );
}

export default BriefItem;
