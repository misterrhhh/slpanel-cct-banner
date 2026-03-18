import React from 'react';
import type { ExtendedTeam } from '../../types';
import "./score.scss";

import DefaultLogoCT from "./../../assets/iconography/ct.png";
import DefaultLogoT from "./../../assets/iconography/t.png";

interface Props {
    team: ExtendedTeam,
    show: boolean
}

export const Score: React.FC<Props> = ({ team, show }) => {


    return (
        <div className={`score ${team.side} ${team.physicalSide} ${show ? "show" : "hide"}`}>
            <div className="win-logo"><img src={team.logo ? team.logo : team.side === "CT" ? DefaultLogoCT : DefaultLogoT} /></div>
            <div className="win-score">{team.score}</div>
            <div className="win-name">{team.name}</div>
        </div>
    )
}

