import React from "react";
import { Link } from "react-router-dom";
import AccountButtons from "./AccountButtons.jsx";
import AccountData from "./AccountData.jsx";
import SubmenuButton from "./SubmenuButton.jsx";


export default function Header(props){


    return(
        <>
            <div className="header_logo_div">
                <img src="../../../static/svg/svg_basecomponents/scan_logo_header.svg" 
                className = "logo_header" 
                style={{
                    opacity: props.displaySubMenu? "0" : "1",
                }}
                />
                <img src="../../../static/svg/svg_basecomponents/scan_logo_footer.svg" 
                className = "logo_header white_logo_header" 
                style={{
                    opacity: props.displaySubMenu? "1" : "0",

                }}
                />
            </div>

            <div className="navigation_buttons_header_div" 
                style={props.displaySubMenu?{
                    opacity: 0,
                    pointerEvents: "none"
                } : null}>
                <Link to="homepage">Главная</Link>
                <a href="#our_tariffs">Тарифы</a>
                <Link to="#">FAQ</Link>
            </div>

            {props.token? <AccountData 
                            token = {props.token} 
                            dispatchAccountState={props.dispatchAccountState}
                            displaySubMenu = {props.displaySubMenu}
                            /> : <AccountButtons displaySubMenu = {props.displaySubMenu}/>}

            <SubmenuButton
                SubMenuButtonRef = {props.SubMenuButtonRef}
                displaySubMenu = {props.displaySubMenu}
                setDisplaySubMenu = {props.setDisplaySubMenu}
                mainRef = {props.mainRef}
                footerRef = {props.footerRef}
            />
        </>
    )
}