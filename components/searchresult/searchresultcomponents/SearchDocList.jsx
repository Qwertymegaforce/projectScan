import React from 'react';
import { formRequest, dispatchDocList, searchresult_actions } from '../searchresult_utils/searchresult_utils.js';
import { HTTPS, API, DOMAIN, OBJECTSEARCH } from '../../../baseutils/paths';
import SearchDocContent from './SearchDocContent.jsx';
import { account_actions } from '../../basecomponents/basecomponents_utils/basecomponents_utils.js';

const SearchDocList = (props) => {

    const [docListState, setDocListState] = React.useReducer(dispatchDocList, {
        IDS : null
    })


    React.useEffect(()=>{
        fetch(HTTPS + DOMAIN + API + OBJECTSEARCH, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": props.token
            },
            body: JSON.stringify(formRequest(props.data))
        })
        .then(response => {
        if(!response.ok){
            let CustomError = new Error()
            CustomError.status = response.status
            throw CustomError
        } else return response.json()})
        .then(data => setDocListState({
            type: searchresult_actions.SET_DOCLIST_DATA,
            data: data
        }))
        .catch(error=>{
            switch(error.status){
                case 401:
                    props.dispatchAccountState({
                        type: account_actions.LOGOUT
                    })
                    break
            }
        })
    }, [])

    return (
        <div className='searchdoclist_component'>
            <h1 className='docs_list_sign'>Список документов</h1>
            {docListState.IDS && <SearchDocContent IDS = {docListState.IDS} token = {props.token}/>}
        </div>
    );
}

export default SearchDocList;
