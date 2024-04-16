import React from 'react';
import { checkboxes, checkboxes_settings, search_actions, setSearchState, checkData } from '../search_utils/search_utils';
import Checkbox from './Checkbox.jsx';
import TonalityDropdown from './TonalityDropdown.jsx';
import ErrorMsg from "./ErrorMsg.jsx"
import { useNavigate } from 'react-router-dom';
import { HTTPS, API, DOMAIN, OBJECTSEARCH_HISTOGRAMS } from '../../../baseutils/paths';
import { account_actions } from '../../basecomponents/basecomponents_utils/basecomponents_utils.js';


const SearchForm = (props) => {

    const navigate = useNavigate()

    const [searchState, dispatchSearchState] = React.useReducer(setSearchState, {
        checkboxes : {
            max_depth: false,
            business_context: false,
            main_role: false,
            risk_factors: false,
            tech_news: false,
            announce_calendars: false,
            summaries: false,
        },
        tonality: {
            value: "Любая",
            APIvalue : "any",
            display: false
        },
        docnumber: {
            error: false,
            value: "",
            blank: true
        },
        itn: {
            error: false,
            value: "",
            blank: true
        },
        startDate: {
            error: false,
            shownValue : "",
            value: "",
            blank: true
        },
        endDate: {
            error: false,
            shownValue : "",
            value: "",
            blank: true
        },
        displayBlankErrors : false,
    })

    const [searchRequestData, setSearchRequestData] = React.useState()


    React.useEffect(()=>{
        if(searchRequestData){
            navigate("/searchresult", {state: {
                briefData: {...searchRequestData},
                requestForm: {...searchState}
            }})
        }
    }, [searchRequestData])



    
    const checkboxes_inputs = checkboxes.map((item, index) => {
        return <Checkbox 
        key={index}
        stateValue = {searchState.checkboxes[checkboxes_settings[index]]}
        settings = {checkboxes_settings[index]}
        content={item.text}
        dispatchSearchState = {dispatchSearchState}
        />
    })

    function searchData(){
        if(checkData(searchState)){
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
    
            fetch(HTTPS + DOMAIN + API + OBJECTSEARCH_HISTOGRAMS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": props.token
                },
                body: JSON.stringify(request_body)
            })
                .then(response => {
                    if(!response.ok){
                        let CustomError = new Error()
                        CustomError.status = response.status
                        throw CustomError
                    } else return response.json()
                })
                .then(data => setSearchRequestData({...data}))
                .catch(error=>{
                    switch(error.status){
                        case 401:
                            props.dispatchAccountState({
                                type: account_actions.LOGOUT
                            })
                            break
                        case 500:
                            console.log('Ошибка сервера. Попробуйте выбрать период, включающий последние 13 мес, не раньше');
                            break
                    }
                })
        } else {
            dispatchSearchState({
                type: search_actions.DISPLAY_BLANK_ERRORS
            })
        }
    }
    
    function chooseTonality(){
        dispatchSearchState({
            type: search_actions.SET_TONALITY,
            data: searchState.tonality.value
        })
    }

    function changeITN(e){
        dispatchSearchState({
            type: search_actions.CHANGE_ITN,
            data: e.target.value
        })
    }

    function validateITN(e){
        dispatchSearchState({
            type: search_actions.CHECK_ITN,
            data: e.target.value
        })
    }

    function changeDocNumber(e){
        dispatchSearchState({
            type: search_actions.CHANGE_DOC_NUMBER,
            data: e.target.value
        })
    }
    
    function setStartDate(e){
        dispatchSearchState({
            type: search_actions.SET_START_DATE,
            data: e.target.value
        })
    }
    
    function setEndDate(e){
        dispatchSearchState({
            type: search_actions.SET_END_DATE,
            data: e.target.value
        })
    }


    return (
        <div className='searchform_component_div'>
            <div className="searchform_div">
                <div className="searchform_inputs_div">
                    <div>
                        <label htmlFor="itn">ИНН компании<span className={(searchState.displayBlankErrors && searchState.itn.blank)? "error_data_ast_search" : null}>*</span></label>
                        <input 
                            id="itn" 
                            className={searchState.itn.error || (searchState.displayBlankErrors && searchState.itn.blank)? "error_data_input_search" : null}
                            type="text" 
                            placeholder='10 цифр' 
                            value={searchState.itn.value} 
                            onInput={changeITN} 
                            onBlur={validateITN}
                        />
                        <ErrorMsg 
                            displayOverAll = {true}
                            selfErrors = {searchState.itn.error}
                            selfBlank = {searchState.itn.blank}
                            displayBlank = {searchState.displayBlankErrors}
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="tonality">Тональность</label>
                        <div className="tonality_div" >
                            <div onClick={chooseTonality}>
                                <input id="tonality"  type="text" value={searchState.tonality.value} readOnly="readonly"/>
                                <img src="../../../static/svg/svg_search/downarrow.svg" alt="" />
                            </div>
                            <TonalityDropdown display={searchState.tonality.display} dispatchSearchState={dispatchSearchState}/>
                        </div>
                        <ErrorMsg 
                            displayOverAll = {false}
                            selfErrors = {false}
                            selfBlank = {false}
                            displayBlank = {searchState.displayBlankErrors}
                        />
                    </div>

                    <div>
                        <label htmlFor="docs_number">Количество документов в выдаче<span className={(searchState.displayBlankErrors && searchState.docnumber.blank)? "error_data_ast_search" : null}>*</span></label>
                        <input 
                            id="docs_number" 
                            className={searchState.docnumber.error || (searchState.displayBlankErrors && searchState.docnumber.blank)? "error_data_input_search" : null}
                            type="text" placeholder='От 1 до 1000' 
                            value={searchState.docnumber.value}
                            onInput={changeDocNumber}
                        />
                        <ErrorMsg 
                            displayOverAll = {true}
                            selfErrors = {searchState.docnumber.error}
                            selfBlank = {searchState.docnumber.blank}
                            displayBlank = {searchState.displayBlankErrors}
                        />
                    </div>

                    <div className='date_input_div'>
                        <label>
                            Диапозон поиска
                            <span 
                                className={(searchState.displayBlankErrors && searchState.endDate.blank)? "error_data_ast_search" : null}
                            >
                                    *
                            </span>
                        </label>
                        <div>
                            <div className='startdate_input_div'>
                                <input   
                                    type="text" 
                                    placeholder='Дата начала' 
                                    value={searchState.startDate.shownValue}
                                    readOnly="readonly" 
                                    className={searchState.startDate.error || (searchState.displayBlankErrors && searchState.startDate.blank)? "error_data_input_search" : null}
                                />
                                <img src="../../../static/svg/svg_search/downarrow.svg" alt="" />
                                <input 
                                    type="date" 
                                    className='hiden_date_input' 
                                    onInput={setStartDate}
                                />
                            </div>
                            <div className='enddate_input_div'>
                                <input 
                                    type="text" 
                                    className={searchState.endDate.error || (searchState.displayBlankErrors && searchState.endDate.blank)? "error_data_input_search" : null}
                                    placeholder='Дата конца' 
                                    value={searchState.endDate.shownValue}
                                    readOnly="readonly"
                                />
                                <img src="../../../static/svg/svg_search/downarrow.svg" alt="" />
                                <input type="date" 
                                    className='hiden_date_input' 
                                    onInput={setEndDate}
                                />
                            </div>
                        </div>
                        <ErrorMsg 
                            displayOverAll = {true}
                            selfErrors = {(searchState.startDate.error || searchState.endDate.error)? true : false}
                            selfBlank = {(searchState.startDate.blank || searchState.endDate.blank)? true : false}
                            displayBlank = {searchState.displayBlankErrors}
                        />
                    </div>

                </div>
                <div className="checkboxesform_div">
                    <div className="checkboxes_div">
                        {checkboxes_inputs}
                    </div>
                    <div className="search_button_div">
                        <button 
                            className={searchState.displayBlankErrors? 'search_disabled_button' : null}
                            onClick={searchData}
                        >
                            Поиск
                        </button>
                        <p className='field_require_sign'>* Поле обязательно к заполнению</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchForm;
