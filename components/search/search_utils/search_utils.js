export const checkboxes = [
    {
        text: "Признак максимальной полноты"
    },
    {
        text: "Упоминания в бизнес-контексте"
    },
    {
        text: "Главная роль в публикации"
    },
    {
        text: "Публикации только с риск-факторами"
    },
    {
        text: "Включать технические новости рынков"
    },
    {
        text: "Включать анонсы и календари"
    },
    {
        text: "Включать сводки новостей"
    },
]


export const checkboxes_settings = {
    0 : "max_depth",
    1 : "business_context",
    2 : "main_role",
    3 : "risk_factors",
    4 : "tech_news",
    5 : "announce_calendars",
    6 : "summaries"
}


export const search_actions = {
    SET_CHECKBOX : "set_checkbox",
    SET_TONALITY: "set_tonality",
    CHANGE_DOC_NUMBER: "change_doc_number",
    DISPLAY_BLANK_ERRORS: "display_blank_errors",
    CHANGE_ITN: "change_itn",
    CHECK_ITN: "check_itn",
    SET_START_DATE: "set_start_date",
    SET_END_DATE: "set_end_date",
    SET_SEARCH_DATA: "set_search_data"
}


export const tonality_values = {
    "Любая" : "any",
    "Позитивная" : "positive",
    "Негативная" : "negative",
}


function checkDocNumber(number){
    if(isNaN(number)){
        return true
    }

    else if(parseInt(number) > 1000 || parseInt(number) < 1) {
        return true
    }

    else if (number.includes(".")){
        return true
    }

    else return false
}


function checkITN(itn){
    if(itn.length == 0){
        return false
    }

    if(isNaN(itn)){
        return true
    }

    if(itn.length !== 10){
        return true
    }

    const numbers = [2, 4, 10, 3, 5, 9, 4, 6, 8]

    let multiplier_result = 0

    for(let i = 0; i < 9; i++){
        multiplier_result += numbers[i] * parseInt(itn[i])
    }


    let criteria = String(multiplier_result % 11)

    criteria = (criteria.substring(criteria.length - 1));


    if(Number(criteria) !== parseInt(itn.substring(itn.length - 1))){
        return true
    } 
    
    else return false
}


function normilizeITN(itn){
    
    itn = itn.split('')

    let spaces = [2, 6, 10]
    
    for(let item of spaces){
        if(item < itn.length){
            itn.splice(item, 0, " ")
        }
    }

    if(itn.length > 13){
        itn = itn.slice(0, 13)
    }

    return itn.toString().replace(/,/g, '')
}


export function normilizeDate(date){
    date = date.slice(8,10) + date.slice(4,7) + "." + date.slice(0,4)
    return date 
}


function checkDates(start, end){
    if(start.length === 0 || end.length === 0){
        return false
    }
    if(new Date(start).getTime() < new Date(end).getTime()){
        return false
    }


    return true
}



export function checkData(searchState){
    for(let i in searchState){
        for (let item in searchState[i]){
            if ((item === "error" || item === "blank") && searchState[i][item]){
                return false
            }
        }
    }

    return true
}


export function setSearchState (state, action){
    switch (action.type){
        case search_actions.SET_CHECKBOX:
            return {
                ...state,
                checkboxes: {
                    ...state.checkboxes,
                    [action.data] : !state.checkboxes[action.data]
                }
            }
        case search_actions.SET_TONALITY:
            return {
                ...state,
                tonality: {
                    value: action.data,
                    APIvalue: tonality_values[action.data],
                    display: !state.tonality.display
                }
            }
        case search_actions.CHANGE_DOC_NUMBER:
            return {
                ...state,
                docnumber: {
                    value: action.data,
                    error: checkDocNumber(action.data),
                    blank: action.data.length === 0? true : false
                },

                displayBlankErrors : false,
            }
        case search_actions.CHANGE_ITN:
            return{
                ...state,
                itn: {
                    error: false,
                    value: normilizeITN(action.data.replace(/\s/g, '')),
                    blank: action.data.length === 0? true : false,
                },

                displayBlankErrors : false,
            }
        case search_actions.DISPLAY_BLANK_ERRORS:
            return {
                ...state,
                displayBlankErrors: true
            }
        case search_actions.CHECK_ITN:
            return{
                ...state,
                itn: {
                    ...state.itn,
                    error: checkITN(action.data.replace(/\s/g, ''))
                }
            }
        case search_actions.SET_START_DATE:
            return {
                ...state,
                startDate: {
                    error: checkDates(action.data, state.endDate.value),
                    shownValue: normilizeDate(action.data.replace(/-/g, '.')),
                    blank: false,
                    value: action.data
                },
                endDate: {
                    ...state.endDate,
                    error: false
                },

                displayBlankErrors : false,
            }
        case search_actions.SET_END_DATE:
            return {
                ...state,
                endDate: {
                    error: checkDates(state.startDate.value, action.data),
                    shownValue: normilizeDate(action.data.replace(/-/g, '.')),
                    blank: false,
                    value: action.data
                },
                startDate: {
                    ...state.startDate,
                    error: false
                },

                displayBlankErrors : false,
            }
        default:
            return state
    }
}


