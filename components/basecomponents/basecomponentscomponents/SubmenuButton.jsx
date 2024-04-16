import React from 'react';
import { filters } from '../basecomponents_utils/basecomponents_utils';


const SubmenuButton = (props) => {


    function toggleSubMenu(){
        const toggler = props.displaySubMenu? 0 : 1
        hideCrossRef.current.style["opacity"] = 100 * toggler
        topCrossRef.current.style['transform'] = `rotate(${45 * toggler}deg)`
        bottomCrossRef.current.style['transform'] = `rotate(${135 * toggler}deg) translate(${-7 * toggler}px, ${7 * toggler}px)`
        bottomCrossRef.current.style['filter'] = topCrossRef.current.style['filter'] = props.displaySubMenu? filters.hide : filters.display
        props.mainRef.current.style.opacity = props.displaySubMenu? 100 : 0
        props.footerRef.current.style.opacity = props.displaySubMenu? 100 : 0
        document.getElementsByTagName('body')[0].style['overflow-y'] = props.displaySubMenu? "visible" : "hidden"
        props.setDisplaySubMenu(prevDisplay => !prevDisplay)
    }

    const hideCrossRef = React.useRef()
    const topCrossRef = React.useRef()
    const bottomCrossRef = React.useRef()

    return (
        <div className="submenu_button_div" 
            onClick={toggleSubMenu}
            style={{display: props.displaySubMenu? "flex" : ""}}
            ref={props.SubMenuButtonRef}
        >
            <img src="../../../static/svg/svg_basecomponents/submenu_rectangle.svg"
            className='hide_cross'
            style={{
                opacity: props.displaySubMenu? 0 : 100
            }}  
            ref={hideCrossRef}/>
            <img src="../../../static/svg/svg_basecomponents/submenu_rectangle.svg" 
            className='top_cross' 
            ref={topCrossRef}/>
            <img src="../../../static/svg/svg_basecomponents/submenu_rectangle.svg" 
            className='bottom_cross' 
            ref={bottomCrossRef}/>
        </div>
    );
}

export default SubmenuButton;
