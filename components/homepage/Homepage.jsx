import React from "react";
import RequestData from "./homepagecomponents/RequestData.jsx";
import SliderWhyUs from "./homepagecomponents/SliderWhyUs.jsx";
import BigManPicture from "./homepagecomponents/BigManPicture.jsx";
import OurTariffs from "./homepagecomponents/OurTariffs.jsx";
import { useOutletContext } from "react-router-dom";


export default function Homepage(){

    const data = useOutletContext()

    return(
        <>
            <RequestData token={data.token}/>
            <SliderWhyUs/>
            <BigManPicture/>
            <OurTariffs currentTarif = {data.tarif}/>
        </>
    )
}