import React from "react";
import { Link } from "react-router-dom";
import YandexLogo from "../../../static/svg/svg_register/yandex.svg";
import FacebookLogo from "../../../static/svg/svg_register/facebook.svg";
import GoogleLogo from "../../../static/svg/svg_register/google.svg";


export default function ContinueWith(){
    return(
    <div className="continue_with_div">
        <p>Войти через:</p>
        <div className="continue_with_logos_div">
            <Link to="#"><GoogleLogo viewBox="35 0 35 35" className="continue_with_logo"/></Link>
            <Link to="#"><FacebookLogo viewBox="35 0 35 35" className="continue_with_logo"/></Link>
            <Link to="#"><YandexLogo viewBox="35 0 35 35" className="continue_with_logo"/></Link>
        </div>
    </div>
    )
}