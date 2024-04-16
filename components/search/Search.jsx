import React from "react";
import SearchDecoration from "./searchcomponents/SearchDecoration.jsx";
import SearchForm from "./searchcomponents/SearchForm.jsx";
import SearchHeader from "./searchcomponents/SearchHeader.jsx";
import { useOutletContext, Navigate } from "react-router-dom";


export default function Search(){

    const context = useOutletContext()

    

    if(!context.token){
        return <Navigate replace to="/homepage"/>
    }

    return(
        <div className="search_component_div">
            <img src="../../static/svg/svg_search/document.svg" alt="" className="search_document_absolute_img"/>
            <SearchDecoration/>
            <SearchForm token = {context.token} dispatchAccountState={context.dispatchAccountState}/>
            <SearchHeader/>
        </div>
    )
}