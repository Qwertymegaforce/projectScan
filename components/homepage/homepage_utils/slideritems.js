
export const items = [
    {
        image: "../../../static/svg/svg_homepage/carousel/clock.svg",
        text: "Высокая и оперативная скорость обработки заявки"
    },
    {
        image: "../../../static/svg/svg_homepage/carousel/magnifier.svg",
        text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос"
    },
    {   
        image: "../../../static/svg/svg_homepage/carousel/shield.svg",
        text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству"
    },
    {   
        image: "../../../static/svg/svg_homepage/carousel/shield.svg",
        text: "Для проверки 1, при желании можно убрать лишнее в файле slideritems.js"
    },
    {   
        image: "../../../static/svg/svg_homepage/carousel/shield.svg",
        text: "Для проверки 2"
    },
    {   
        image: "../../../static/svg/svg_homepage/carousel/shield.svg",
        text: "Для проверки 3"
    },
    {   
        image: "../../../static/svg/svg_homepage/carousel/shield.svg",
        text: "Для проверки 4"
    },
    
]

export const sliderActions = {
    INCREMENT_INDEX: "increment_index",
    DECREMENT_INDEX: "decrement_index",
    UPDATE_COLLECTION_INDEX: "update_collection_index",
    UPDATE_SLIDER: "update_slider",
    CHANGE_WIDTH: "change_width"
}


export function stateDispatcher(state, action) {
    switch(action.type){
        case sliderActions.INCREMENT_INDEX:
            return {
                ...state,
                index: action.data + 1
            }
        case sliderActions.DECREMENT_INDEX:
            return {
                ...state,
                index: action.data - 1
            }
        case sliderActions.UPDATE_SLIDER:
            return {
                ...state,
                index: state.index < action.data.length? 0 : state.index, 
                div_items: action.data
            }
        case sliderActions.UPDATE_COLLECTION_INDEX:
            return {
                ...state,
                collection_index: action.data
            }
        case sliderActions.CHANGE_WIDTH:
            return {
                ...state,
                windowWidth: action.data
            }
        default:
            return state
    }
}


export function calculateCollectionIndex(width){
    if (width <= 700 && width > 500) {
        return 2
    } 
    else if (width <= 500){
        return 1
    }
    else {
        return 3
    }
    
}