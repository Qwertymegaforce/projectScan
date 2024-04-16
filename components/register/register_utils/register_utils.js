export const button_styles = {
    color: "rgb(2, 148, 145)",
    borderBottom: "solid 2px rgb(2, 148, 145)"
}


export const ACTIONS = {
    LOGIN_LOGIN : "login_login",
    LOGIN_PASSWORD : "login_password",
    ERROR_INPUT_LOGIN: "error_input_login"
}

export function reducer(state, action){

    switch (action.type) {
        case ACTIONS.LOGIN_LOGIN: 
            return { 
                login: {
                ...state.login,
                LOGIN: action.data,
                NO_LOGIN_INPUT_ERRORS: true,
            }}
        case ACTIONS.LOGIN_PASSWORD: 
            return {
                login: {
                ...state.login,
                PASSWORD: action.data,
                NO_LOGIN_INPUT_ERRORS: true,
            }}
        
        case ACTIONS.ERROR_INPUT_LOGIN: 
            return {
                login: {
                ...state.login,
                NO_LOGIN_INPUT_ERRORS: action.data,
            }}

        default:
            return state
    }
}




