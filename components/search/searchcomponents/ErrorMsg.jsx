import React from 'react';

const ErrorMsg = (props) => {

    if(!props.displayOverAll){
        return (<p></p>)
    }

    return (
        <p className='error_input_search'>
            {props.displayBlank && props.selfBlank? "Обязательное поле" : 
            props.selfErrors? "Введите верные данные" : null}
        </p>
    );
}

export default ErrorMsg;
