export const account_actions = {
    GET_TOKEN: "get_token",
    LOGOUT: 'logout'
}


export const filters = {
    display: "brightness(0) saturate(100%) invert(100%) sepia(83%) saturate(2%) hue-rotate(122deg) brightness(110%) contrast(101%)",
    hide: "brightness(0) saturate(100%) invert(54%) sepia(42%) saturate(7366%) hue-rotate(151deg) brightness(86%) contrast(103%)"
}





export function accountDispatch(state, action){
    switch(action.type){
        case account_actions.GET_TOKEN:
            return {
                ...state,
                token: `Bearer ${JSON.parse(localStorage.getItem('login_token')).accessToken}`,
                expire: new Date(JSON.parse(localStorage.getItem('login_token')).expire)
            }
        
        case account_actions.LOGOUT:
            localStorage.removeItem("login_token")
            return {
                ...state,
                token: "",
                expire: ""
            }
        default:
            return state
    }
}

