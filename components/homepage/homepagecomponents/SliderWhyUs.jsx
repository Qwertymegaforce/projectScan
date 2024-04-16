import React from "react";
import SliderItem from "./SliderItem.jsx";
import { items } from "../homepage_utils/slideritems.js";
import {stateDispatcher, sliderActions, calculateCollectionIndex} from "../homepage_utils/slideritems.js";


export default function SliderWhyUs(){

    const [sliderState, sliderStateDispach] = React.useReducer(stateDispatcher, {
        index: 0,
        collection_index: calculateCollectionIndex(window.innerWidth),
        windowWidth: window.innerWidth,
        div_items: []
    })


    
    const slider_items = items.map((item, index) => <SliderItem key = {index} image={item.image} text = {item.text}/>)

    React.useEffect(() => {
        window.addEventListener('resize', ()=> {
            sliderStateDispach({
                type: sliderActions.CHANGE_WIDTH,
                data: window.innerWidth
            })
        })

    }, [])


    React.useEffect(() => {
        sliderStateDispach({
            type: sliderActions.UPDATE_COLLECTION_INDEX,
            data: calculateCollectionIndex(sliderState.windowWidth)
        })

    }, [sliderState.windowWidth])


    React.useEffect(()=> {
        let div_items = []
    
        for (let i = 0; i < Math.ceil(slider_items.length / sliderState.collection_index); i ++){
            div_items.push(
                <div key={i} className={(i+1) * sliderState.collection_index <= slider_items.length? "slider_items_collection_div" : 'slider_items_collection_notfull_div'}>
                    {slider_items.slice(i*sliderState.collection_index, (i+1) * sliderState.collection_index)}
                </div>
            )
        }

        sliderStateDispach({
            type: sliderActions.UPDATE_SLIDER,
            data: div_items
        })
    }, [sliderState.collection_index])


    function incrementIndex(){
        if(sliderState.index + 1 <= 0){
            return sliderStateDispach({
                type: sliderActions.INCREMENT_INDEX,
                data: sliderState.index
        })
        }
    }

    function decrementIndex(){
        if(sliderState.index - 1 > - sliderState.div_items.length){
            return sliderStateDispach({
                type: sliderActions.DECREMENT_INDEX,
                data: sliderState.index
            })  
        }

    }

    
    
    return (
        <div className="slider_wrapper_div">
            <h1 className="why_us_sign">Почему именно мы?</h1>
            <div className="slider_buttons_div">
                <button onClick={incrementIndex}>
                    <img src="../../../static/svg/svg_homepage/carousel/backbutton.svg"/>
                </button>
                <div className="slider_div" >
                    <div className="slider_inner_div" style={{transform: `translate(${sliderState.index * 100}%)`}}>
                        {sliderState.div_items}
                    </div>
                </div>
                <button onClick={decrementIndex}>
                    <img src="../../../static/svg/svg_homepage/carousel/forwardbutton.svg"/>
                </button>
            </div>
        </div>
    )
}