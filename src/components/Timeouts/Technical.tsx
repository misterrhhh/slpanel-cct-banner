import React from 'react';
import "./timeouts.scss";

interface Props {
    show: boolean
}


export const Technical: React.FC<Props> = ({ show }) => {


    return (
        <div className={`technical ${show ? "show" : "hide"}`}>PAUSA TÉCNICA</div>
    )
}

