import React from 'react';


const BriefSlider = (props) => {

    let X = 0
    let Y = 0
    let captiveX = 0
    let captiveY = 0
    let startScroll = false


    return (
        <div className="inner_carousel_div" ref={props.scrolledSlide} 
            onMouseOver={(event)=>{
                X = event.clientX
                Y = event.clientY
                if(startScroll){
                    props.scrolledSlide.current?.scrollTo(props.scrolledSlide.current?.scrollLeft + captiveX - X, 0)
                }
            }}
            onMouseDown={(event)=>{
                captiveX = event.clientX
                captiveY = event.clientY
                startScroll = true
            }}

            onMouseUp={(event =>{
                startScroll = false 
            })}

            onMouseLeave={(event)=>{
                startScroll = false 
            }}
        >
            {props.renderItems?
            <div className='inner_carousel_slider_div'
                style={{transform: `translate(${-100 * props.index}%)`}}
            >
                {props.renderItems.length !== 0? props.renderItems : <div className="brief_loader_div"><p className='no_data_sign'>Нет данных</p></div>}
            </div> :
            <div className="brief_loader_div">
                <img className="loader brief_loader" src="../../../static/svg/svg_basecomponents/loader.svg"/>
                <p>Загружаем данные</p>
            </div>
            }
        </div>
    )


}

export default BriefSlider;
