import React from "react";
import SubmenuScanLogo from "../../../static/svg/svg_basecomponents/submenu_logo.svg";
import SubmenuCloseButton from "../../../static/svg/svg_basecomponents/submenu_close_button.svg";
import { Link } from "react-router-dom";

export default function SubMenu(props){

    return(
        <>
        <div className="submenu_green_bg" style={{
            width: `${props.displaySubMenu? "100" : "0"}%`
        }}>     
        </div>
        <div className="submenu_content_div"
            style={{
                opacity: props.displaySubMenu? 100 : 0,
                zIndex: props.displaySubMenu? 10 : -1,
            }}
        >
            <div className="links_div">
                <Link onClick={()=>{props.SubMenuButtonRef.current.click()}} to={'homepage'}>Главная</Link>
                <Link onClick={()=>{props.SubMenuButtonRef.current.click()}}>Тарифы</Link>
                <Link onClick={()=>{props.SubMenuButtonRef.current.click()}}>FAQ</Link>
            </div>
            {props.token?  null : <div className="submenu_buttons_div" >
                <Link onClick={()=>{props.SubMenuButtonRef.current.click()}} to={"/account/register"}><button className="submenu_register_button">Зарегестрироваться</button></Link>
                <Link onClick={()=>{props.SubMenuButtonRef.current.click()}} to={"/account/login"} className="submenu_login_button_link"><button className="submenu_login_button">Войти</button></Link>
            </div>}
        </div>
        </>
    )
}