import React from "react";
import { Link } from "react-router-dom";


export default function Tarif(props){

    return(

        <div className="tarif_div">
            <div className="tarif_header_div" style={{backgroundColor: props.headerColor, color: props.headerTextColor}}>
                <div className="tarif_brief_div">
                    <p className="tarif_name">{props.header}</p>
                    <p className="forWhon_sign">{props.forWhom}</p>
                </div>
                <div className="tarif_icon_div">
                    <img src={props.image} alt="" className="tarif_image"/>
                </div>
            </div>

            <div className="tarif_content_div">
                <div className="tarif_pricing_div">
                    <div className="current_tarif_line" >
                        <div className="current_tarif_div" style={props.current? null : {display: "none"}}>
                            Текущий тариф
                        </div>
                    </div>
                    <div className="tarif_prices_div">
                        <div className="prices_sign">
                            <p>{props.sale}₽</p>
                            <strike>{props.price}₽</strike>
                        </div>
                        <div className="split_price_div">
                            <p>{props.splitPrice}</p>
                        </div>
                    </div>
                </div>

                <div className="tarif_include">
                    <p className="in_tarif_sign">В тариф входит:</p>
                    <div className="tarif_include_data">
                        {props.offers.map((item, index)=> 
                        <p key={index}>
                            <img src="../../../static/svg/svg_homepage/tariffs/tick.svg" className="tick_img" />
                            {item}
                        </p>)}
                    </div>
                </div>

                <div className="button_choice_div">
                    <Link to="#">
                        <button className={props.current? "personal_account_button" : null}>
                            {props.current? "Перейти в личный кабинет" : "Подробнее"}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}