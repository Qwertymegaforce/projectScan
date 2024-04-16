export const searchresult_actions = {
    SET_DATA: "set_data",
    CHANGE_WIDTH: "change_width",
    SET_DOCLIST_DATA: "set_doclist_data",
    UPDATE_SEARCH_INDEX: "update_search_index",
    SET_DOC_CONTENT_STATE: "set_doc_content_state"
}




export function dispatchBriefState(state, action){
    switch(action.type){
        case searchresult_actions.SET_DATA:
            return{
                ...state,
                renderItems: action.data,
            }
        case searchresult_actions.CHANGE_WIDTH:
            return {
                ...state,
                windowWidth: action.data
            }
        
        default:
            return state
    }
}




export function sordBriefData(data_array){
    let result = data_array.sort((current, next)=>{
        return new Date(current.date).getTime() - new Date(next.date).getTime()
    })
    return result
}


export function calculateBriefResult(state){
    let result = 0
    for(let item of state){
        result += item.value
    }
    return result
}



export function formRequest(searchState){
    const request_body = {
        intervalType: "month",
        issueDateInterval: {
            startDate: `${searchState.startDate.value}T00:00:00+03:00`,
            endDate: `${searchState.endDate.value}T23:59:59+03:00`
        },
        similarMode : "none",
        histogramTypes : ["totalDocuments", "riskFactors"],
        limit: Number(searchState.docnumber.value),
        sortDirectionType: "desc",
        sortType: "issueDate",
        searchContext: {
            targetSearchEntitiesContext: {
                targetSearchEntities: [
                    {
                        type: "company",
                        inn: Number(searchState.itn.value.replace(/\s/g, '')),
                        maxFullness : searchState.checkboxes.max_depth
                    }
                ],
                onlyMainRole : searchState.checkboxes.main_role,
                onlyWithRiskFactors : searchState.checkboxes.risk_factors,
                tonality : searchState.tonality.APIvalue
            }
        },
        attributeFilters: {
            excludeTechNews: !searchState.checkboxes.tech_news,
            excludeAnnouncements: !searchState.checkboxes.summaries,
            excludeDigests: !searchState.checkboxes.announce_calendars,
          },
    }
    return request_body
}


export function formIDSRequest(IDSArr, index){
    let request_arr = IDSArr.slice(index, index + 10)
    let result = {
        ids: request_arr.map(item => item.encodedId)
    }
    return result
}


export function correctText(text){
    const decoded = text
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/<([A-Za-z0-9\W\_]+?)>/g, "");
    return decoded.length > 500? decoded.slice(0,500) + "..." : decoded
}


export function dispatchDocList(state, action){
    switch(action.type){
        case searchresult_actions.SET_DOCLIST_DATA:
            return {
                ...state,
                IDS: action.data.items
            }
        default:
            return state
    }
}


export function dispatchDocContent(state, action){
    switch(action.type){
        case searchresult_actions.UPDATE_SEARCH_INDEX:
            return{
                ...state,
                searchIndex: state.searchIndex + 10
            }
        case searchresult_actions.SET_DOC_CONTENT_STATE:
            let updatedArray = state.itemsArray.concat(action.data)
            return {
                ...state,
                itemsArray: updatedArray
            }
        default:
            return state
    }
}


const possibleTags = {
    isDigest: "Cводки новостей",
    isAnnouncement: "Анонсы и события",
    isTechNews : "Технические новости"
}

export function chooseTag(attributes){
    if(attributes.isDigest){
        return possibleTags.isDigest 
    }
    else if(attributes.isAnnouncement){
        return possibleTags.isAnnouncement
    }
    else if(attributes.isTechNews){
        return possibleTags.isTechNews
    } else return false
}


export function parseImg(markup){
    const decoded = markup
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    if(decoded.includes("data-src=")){
        let index = decoded.indexOf("data-src=")
        let sliced_str = decoded.slice(index + 10)
        let result = ""
        for (let letter of sliced_str){
            if(letter!=='"'){
                result += letter
            } else break
        }
        return result
    }
    return false
}


export function normilizeDocDate(date){
    return date.slice(8,10) + "." + date.slice(5,7) + "." + date.slice(0,4)
}