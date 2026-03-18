import React from 'react';
import type { ExtendedTeam } from '../../types';
import "./win.scss";

import DefaultLogoCT from "./../../assets/iconography/ct.png";
import DefaultLogoT from "./../../assets/iconography/t.png";

interface Props {
    team: ExtendedTeam,
    show: boolean
}

export const Win: React.FC<Props> = ({ team, show }) => {

    return (
        <div className={`win ${team.side} ${team.physicalSide} ${show ? "show" : "hide"}`}>
            <div className="win-logo"><img src={team.logo ? team.logo : team.side === "CT" ? DefaultLogoCT : DefaultLogoT} /></div>
            <div className="win-name">ROUND</div>
            <div className="win-desc">WON</div>
        </div>
    )
}

