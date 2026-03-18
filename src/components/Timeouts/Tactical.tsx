import React from 'react';
import type { ExtendedTeam } from '../../types';
import "./timeouts.scss";

import DefaultLogoCT from "./../../assets/iconography/ct.png";
import DefaultLogoT from "./../../assets/iconography/t.png";

interface Props {
    show: boolean
    team: ExtendedTeam,
}

const TOTAL_TIMEOUTS = 3

export const Tactical: React.FC<Props> = ({ show, team }) => {



    return (
        <div className={`tactical ${team.side} ${team.physicalSide} ${show ? "show" : "hide"}`}>
            <div className="tactical-logo"><img src={team.logo ? team.logo : team.side === "CT" ? DefaultLogoCT : DefaultLogoT} /></div>
            <div className="tactical-name">PAUSA TÁTICA</div>
            <div className="tactical-boxes">
                {new Array(TOTAL_TIMEOUTS).fill(0).map((_, i) => (
                    <div key={i} className={`tactical-box ${team.timeouts_remaining > i ? "full" : ""} `} />
                ))}
            </div>
        </div>
    )
}

