import React from "react";


export default function SliderItem(props){
    return(
        <div className="slider_item_div">
            <div className="slider_image_div">
                <img src={props.image} alt="" />
            </div>
            <div className="slider_content_div">
                <p>{props.text}</p>
            </div>
        </div>
    )
}