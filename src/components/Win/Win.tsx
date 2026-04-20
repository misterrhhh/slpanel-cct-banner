import React from 'react';
import type { ExtendedTeam } from '../../types';
import "./win.scss";


interface Props {
    team: ExtendedTeam,
    show: boolean
}

export const Win: React.FC<Props> = ({ team, show }) => {


    return (
        <div className={`win ${team.side} ${team.physicalSide} ${show ? "show" : "hide"}`}>
            <div className="win-background"></div>
            <div className="win-text">wins the round</div>
         
        </div>
    )
}

