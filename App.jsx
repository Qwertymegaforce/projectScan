import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Baselayout from "./components/basecomponents/Baselayout.jsx";
import Homepage from "./components/homepage/Homepage.jsx";
import Register from "./components/register/Register.jsx";
import Search from "./components/search/Search.jsx";
import SearchResult from "./components/searchresult/SearchResult.jsx";


export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Baselayout/>}>
                    <Route path="homepage" element={<Homepage/>}/>
                    <Route path="account/:action" element={<Register/>}/>
                    <Route path="search" element={<Search/>}/>
                    <Route path="searchresult" element={<SearchResult/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}