import React from "react";
import { tariffs } from "../homepage_utils/tariffs_items";
import Tarif from "./Tarif.jsx";


export default function OurTariffs(props){

    const items = tariffs.map((item, index) => 
        <Tarif
            key = {index}
            header = {item.header}
            current = {item.apiName === props.currentTarif? true : false}
            headerTextColor = {item.headerTextColor}
            image = {item.image}
            headerColor = {item.headerColor}
            forWhom = {item.forWhom}
            price = {item.price}
            sale = {item.sale}
            splitPrice = {item.splitPrice}
            offers = {item.offers}
        />
    )

    return(
        <div className="ourtariffs_div" id="our_tariffs">

            <h1>Наши тарифы</h1>

            <div className="ourtariffs_section_div">
                {items}
            </div>

        </div>
    )
}