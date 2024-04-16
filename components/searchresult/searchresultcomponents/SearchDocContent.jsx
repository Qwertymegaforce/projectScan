import React from 'react';
import SearchDocItem from './SearchDocItem.jsx';
import { HTTPS, API, DOMAIN, DOCUMENTS } from '../../../baseutils/paths';
import { searchresult_actions, parseImg, dispatchDocContent, formIDSRequest, correctText, chooseTag, normilizeDocDate} from '../searchresult_utils/searchresult_utils.js';

const SearchDocContent = (props) => {
    
    const [docContentState, setDocContentState] = React.useReducer(dispatchDocContent, {
        itemsArray: [],
        searchIndex: 0
    })

    React.useEffect(()=>{
        fetch(HTTPS + DOMAIN + API + DOCUMENTS, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": props.token
                },
                body: JSON.stringify(formIDSRequest(props.IDS, docContentState.searchIndex))
        })
        .then(response => {
            if(!response.ok){
                let CustomError = new Error()
                CustomError.status = response.status
                throw CustomError
            } else return response.json()
        })
        .then(data => {
            let result = data.map((item, index)=> {
            return <SearchDocItem 
            key = {index + 1 + docContentState.itemsArray.length}
            title = {item.ok.title.text}
            url = {item.ok.url}
            text = {correctText(item.ok.content.markup)}
            date = {normilizeDocDate(item.ok.issueDate)}
            wordCount = {item.ok.attributes.wordCount}
            img = {parseImg(item.ok.content.markup)}
            tag = {chooseTag(item.ok.attributes)}
            source = {item.ok.source.name}
            />})

            setDocContentState({
                type: searchresult_actions.SET_DOC_CONTENT_STATE,
                data: result
            })
        })
        .catch(error=>{
            switch(error.status){
                case 401:
                    props.dispatchAccountState({
                        type: account_actions.LOGOUT
                    })
                    break
            }
        })
    }, [docContentState.searchIndex])


    return (
        <div className='searchdoclist_content_component_div'>
            <div className="searchdoclist_content_div">
                {docContentState.itemsArray}
            </div>
            <button 
                onClick={()=>{setDocContentState({type: searchresult_actions.UPDATE_SEARCH_INDEX})}}
                style={{
                    display: docContentState.searchIndex < props.IDS.length - 10? "block" : "none"
                }}
                className='show_more_doclist_button'
            >
                Показать больше
            </button>
        </div>
    );
}

export default SearchDocContent;
