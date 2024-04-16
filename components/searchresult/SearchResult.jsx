import React from "react";
import { useLocation, Navigate, useOutletContext } from "react-router";
import SearchResultHeader from "./searchresultcomponents/SearchResultHeader.jsx";
import SearchBrief from "./searchresultcomponents/SearchBrief.jsx";
import SearchDocList from "./searchresultcomponents/SearchDocList.jsx";


export default function SearchResult(){

    const searchData = useLocation()
    const context = useOutletContext()

    if(!context.token){
        return <Navigate replace to="/homepage"/>
    }

    if(!searchData.state){
        return <Navigate replace to="/search"/>
    }


    return(
        <div className="searchresult_component_div">
            <SearchResultHeader/>
            <SearchBrief data={searchData.state.briefData} />
            <SearchDocList 
                data={searchData.state.requestForm} 
                token={context.token}
                dispatchAccountState = {context.dispatchAccountState}
            />
        </div>
    )
}