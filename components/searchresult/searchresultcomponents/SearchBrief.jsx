import React from 'react';
import BriefItem from './BriefItem.jsx';
import BriefSlider from './BriefSlider.jsx';
import { dispatchBriefState, searchresult_actions, calculateBriefResult, sordBriefData} from '../searchresult_utils/searchresult_utils.js';

const SearchBrief = (props) => {

    const[briefState, setBriefState] = React.useReducer(dispatchBriefState, {
        renderItems: null,
        windowWidth: window.innerWidth
    })


    const scrolledSlide = React.useRef()
    const tableHeaders = React.useRef()


    React.useEffect(()=>{
        let brief_items = []

        if(props.data.data.length !== 0){
            for(let i = 0; i<props.data.data[0].data.length; i++){
                brief_items.push({
                    totalDocs: props.data.data[0].data[i].value,
                    riskDocs: props.data.data[1].data[i].value,
                    date: props.data.data[1].data[i].date
                    }
                )
            }
    
            brief_items = sordBriefData(brief_items)
    
            brief_items = brief_items.map((item, index)=>{
                return (<BriefItem
                key = {index}
                windowWidth = {briefState.windowWidth}
                tableHeaders = {tableHeaders}
                totalDocs = {item.totalDocs}
                riskDocs = {item.riskDocs}
                date = {`${item.date.slice(8,10)}.${item.date.slice(5,7)}.${item.date.slice(0,4)}`}
                />)
            })
        }
        
        setBriefState({
            type: searchresult_actions.SET_DATA,
            data: brief_items
        })

    }, [briefState.windowWidth])

    React.useState(()=>{
        window.addEventListener('resize', ()=> {
            setBriefState({
                type: searchresult_actions.CHANGE_WIDTH,
                data: window.innerWidth
            })
        })
    }, [])

    function scrollLeft(event){
        scrolledSlide.current.scrollTo(scrolledSlide.current.scrollLeft - scrolledSlide.current.offsetWidth * 0.1, 0)
    }
   
    function scrollRight(event){
        scrolledSlide.current.scrollTo(scrolledSlide.current.scrollLeft + scrolledSlide.current.offsetWidth * 0.1, 0)
    }
    

    return (
        <div className='search_brief_component_div'>
            <div className="brief_header_div">
                <h1 className='general_brief_sign'>Общая сводка</h1>
                <p className='number_docs_founded_sign'>{props.data.data.length !== 0? `Найдено ${calculateBriefResult(props.data.data[0].data)} публикаций` : "Нет данных"}</p>
            </div>
            <div className="brief_carousel_div">
                <button style={{pointerEvents: briefState.renderItems? null : "none"}} onClick={scrollLeft}>
                    <img src="../../../static/svg/svg_homepage/carousel/backbutton.svg" className='arrow_img_brief'/>
                </button>
                <div className="brief_carousel_itself_div">
                    <div className="table_headers_carousel_div" ref={tableHeaders}>
                        <p>Период</p>
                        <p>Всего</p>
                        <p>Риски</p>
                    </div>
                    <BriefSlider 
                        renderItems = {briefState.renderItems}
                        index = {briefState.index}
                        scrolledSlide = {scrolledSlide}
                    />
                </div>
                <button style={{pointerEvents: briefState.renderItems? null : "none"}} onClick={scrollRight}>
                    <img src="../../../static/svg/svg_homepage/carousel/forwardbutton.svg" className='arrow_img_brief'/>
                </button>
            </div>
        </div>
    );
}

export default SearchBrief;
