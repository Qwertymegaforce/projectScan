import React from "react";
import FetchedData from "./FetchedData.jsx";
import { account_actions } from "../basecomponents_utils/basecomponents_utils.js";
import { HTTPS, API, DOMAIN, ACCOUNT_INFO } from '../../../baseutils/paths';


export default function AccountData(props){

    const [companyState, setCompanyState] = React.useState()

    if (props.token){
        React.useEffect(()=>{
            fetch(HTTPS + DOMAIN + API + ACCOUNT_INFO, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": props.token
                }
            }).then(response => {
                if(!response.ok){
                    throw new Error()
                } else return response.json()
                })
              .then(data=>setCompanyState(data))
              .catch(err => {
                props.dispatchAccountState({
                    type: account_actions.LOGOUT,
                })  
              })
        }, [])
    }

    function logoutHandler(){
        props.dispatchAccountState({
            type: account_actions.LOGOUT,
        })
    }

    return (
        <>

        <div className="accountdata_component_div"
            style={props.displaySubMenu?{
                opacity: 0,
                pointerEvents: "none"
            } : null}
        >
            <div className="company_limit_div">
                <div className="company_limit_info_div">
                    {companyState? <FetchedData 
                        used = {companyState.eventFiltersInfo.usedCompanyCount} 
                        limit = {companyState.eventFiltersInfo.companyLimit} 
                        /> : <img className="loader" src="../../../static/svg/svg_basecomponents/loader.svg"/>}
                </div>  
            </div>
            <div className="profile_div">
                <div className="profile_name_logout_div">
                    <p>Алексей А.</p>
                    <button onClick={logoutHandler}>Выйти</button>
                </div>
                <div className="profile_image_div">
                    <img src="../../../static/svg/svg_basecomponents/owner.svg" alt="" />
                </div>
                
            </div>
        </div>
        </>    
    )
}