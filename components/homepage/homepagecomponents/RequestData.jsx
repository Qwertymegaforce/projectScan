import React from "react";
import ComputerMan from "../../../static/svg/svg_homepage/computerman.svg"
import { Link } from "react-router-dom";

export default function RequestData(props){
    return(
        <div className="request_data_div">

            <div className="request_data_text_div">
                <h1>Cервис по поиску <br /> публикаций <br /> о компании <br /> по её ИНН</h1>
                <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                {props.token? <Link to="/search"><button>Запросить данные</button></Link> : null}
            </div>

            <div className="computermanpicture_div">
                <ComputerMan className="computerman_picture" viewBox="0 0 700 700"/>
            </div>

        </div>
    )
}