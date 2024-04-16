import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { ACTIONS } from "../register_utils/register_utils";
import { HTTPS, DOMAIN, API, LOGIN} from "../../../baseutils/paths";
import { account_actions } from "../../basecomponents/basecomponents_utils/basecomponents_utils";


export default function LoginForm(props){

    const LOGIN_DATA_NOT_EMPTY = props.parentState.LOGIN && props.parentState.PASSWORD? true : false;

    const navigate = useNavigate();

    function sendLoginData(){
        
        fetch(HTTPS + DOMAIN + API + LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                login: props.parentState.LOGIN,
                password: props.parentState.PASSWORD
            })
        })
            .then(response => {
                if (!response.ok){
                    throw new Error()    
                }   else return response.json()
            })
            .then (data => {
                localStorage.clear()
                localStorage.setItem("login_token", JSON.stringify(data))
                props.accountDispatch({
                    type: account_actions.GET_TOKEN
                })
            })
            .catch (e => props.dispatch({
                type: ACTIONS.ERROR_INPUT_LOGIN,
                data: false
                }
            ))
    }

    return(
        <div className="login_form_div">

            <label htmlFor="login_input">Логин или номер телефона:</label>

            <input type="text" 
                id="login_input" 
                value={props.parentState.LOGIN} 
                className={props.parentState.NO_LOGIN_INPUT_ERRORS? '' : "error_data_input"}            
                onChange={(e) => props.dispatch({type: ACTIONS.LOGIN_LOGIN, data: e.target.value})}
            /> 

            <label htmlFor="password_input">Пароль:</label>

            <input 
                type="password" 
                id="password_input" 
                value={props.parentState.PASSWORD} 
                className={props.parentState.NO_LOGIN_INPUT_ERRORS? '' : "error_data_input"}
                onChange={(e) => props.dispatch({type: ACTIONS.LOGIN_PASSWORD, data: e.target.value})}
                /> 

            <p 
            className={props.parentState.NO_LOGIN_INPUT_ERRORS? "error_msg_hidden" : "error_msg"}
            >
            Введите корректные данные
            </p>

            <button 
                className={LOGIN_DATA_NOT_EMPTY && props.parentState.NO_LOGIN_INPUT_ERRORS? "login_active_button" : "login_disabled_button"}
                onClick={sendLoginData}
            >
            Войти
            </button>

            <Link to="#">Восстановить пароль</Link>

        </div>
    )
}