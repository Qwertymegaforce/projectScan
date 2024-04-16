import React from "react";
import { Link } from "react-router-dom";

export default function AccountButtons(props){
    return(
        <div className="account_buttons_header_div"
        style={props.displaySubMenu?{
            opacity: 0,
            pointerEvents: "none"
        } : null}>
            <Link className="register_button_wrapper_link" to="account/register"><button className="register_button_header">Зарегестрироваться</button></Link>
            <Link to="account/login"><button className="login_button_header">Войти</button></Link>
        </div>
    )
}