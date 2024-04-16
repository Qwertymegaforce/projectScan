import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./basecomponentscomponents/Header.jsx";
import Footer from "./basecomponentscomponents/Footer.jsx";
import { accountDispatch } from "./basecomponents_utils/basecomponents_utils.js";
import { account_actions } from "./basecomponents_utils/basecomponents_utils.js";
import SubMenu from "./basecomponentscomponents/SubMenu.jsx";


export default function Baselayout(){

    const location = useLocation()
    const navigate = useNavigate()

    React.useEffect(()=>{
        if(location.pathname === "/"){
           navigate("/homepage")
        }
    }, [])



    const [accountState, dispatchAccountState] = React.useReducer(accountDispatch, {
        token: localStorage.getItem('login_token')? `Bearer ${JSON.parse(localStorage.getItem('login_token')).accessToken}` : null,
        tarif: "beginner", 
        expire: localStorage.getItem('login_token')? new Date(JSON.parse(localStorage.getItem("login_token")).expire) : null
    })

    React.useEffect(()=>{
        const time_now = new Date()
        if(accountState.expire) {
            time_now.getTime() > accountState.expire.getTime()? dispatchAccountState({type: account_actions.LOGOUT,}) : null
        }
    }, [])

    const[displaySubMenu, setDisplaySubMenu] = React.useState(false)

    const mainRef = React.useRef()
    const footerRef = React.useRef()
    const SubMenuButtonRef = React.useRef()

    return(
        <>  
            <header>
                <Header 
                    token={accountState.token} 
                    dispatchAccountState={dispatchAccountState}
                    displaySubMenu = {displaySubMenu}
                    setDisplaySubMenu = {setDisplaySubMenu}
                    mainRef = {mainRef}
                    footerRef = {footerRef}
                    SubMenuButtonRef = {SubMenuButtonRef}
                />
            </header>
            <SubMenu
               displaySubMenu = {displaySubMenu}
               token = {accountState.token}
               setDisplaySubMenu = {setDisplaySubMenu}
               SubMenuButtonRef = {SubMenuButtonRef}
            />
            <main ref={mainRef}>
                <Outlet context={{...accountState, dispatchAccountState: dispatchAccountState}}/>
            </main>
            <footer ref={footerRef}>
                <Footer/>
            </footer>
        </>
    )
}