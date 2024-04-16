import React from "react";
import KeyCharacters from "../../static/svg/svg_register/key_characters.svg";
import Locker from "../../static/svg/svg_register/locker.svg";
import { NavLink, useParams, Navigate, useOutletContext} from "react-router-dom";
import LoginForm from "./registercomponents/LoginForm.jsx";
import RegisterForm from "./registercomponents/RegisterForm.jsx";
import {button_styles, reducer} from "./register_utils/register_utils.js";
import ContinueWith from "./registercomponents/ContinueWith.jsx";


export default function Register(){

    const params = useParams()

    const context = useOutletContext()


    if (context.token){
        return <Navigate replace to="/homepage"/>
    }


    const [state, dispatch] = React.useReducer(reducer, {
        login : {
            LOGIN: "",
            PASSWORD: "", 
            NO_LOGIN_INPUT_ERRORS: true,
        },
    })

    return(

            <div className="account_grid">

                <div className="need_authorize_sign_div"><h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1></div>

                <div className="keycharacters_div"><KeyCharacters viewBox = "0 0 400 400" className="key_characters"/></div>

                <div className="account_form_div">

                <Locker className="locker_logo" viewBox = "0 0 100 100"/>
                    
                    <div className="account_form_button_div">

                        <NavLink 
                            style = {params.action === "login"? button_styles : null} 
                            to="/account/login">
                            Войти
                        </NavLink>

                        <NavLink 
                            style = {params.action === "register"? button_styles : null} 
                            to="/account/register">
                            Зерегистрироваться
                        </NavLink>

                    </div>

                    {params.action === "login"? 
                        <LoginForm 
                            accountDispatch = {context.dispatchAccountState} 
                            parentState = {state.login} 
                            dispatch = {dispatch}
                            /> : <RegisterForm />}

                    <ContinueWith/>

                </div>

            </div>

    )
}