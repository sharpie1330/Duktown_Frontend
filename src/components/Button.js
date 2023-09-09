import React from 'react';
import '../css/Button.css'

function Button({label, styleClass, onClick}){
    return (
        <button className={styleClass} onClick={onClick}>{label}</button>
    );
}

export default Button;