import React from 'react';
import type { ExtendedTeam } from '../../types';
import "./logo.scss";

import DefaultLogoCT from "./../../assets/iconography/ct.png"
import DefaultLogoT from "./../../assets/iconography/t.png"

interface Props {
    team: ExtendedTeam,
}

export const Logo: React.FC<Props> = ({ team }) => {


    return (
        <div className={`logo ${team.side} ${team.physicalSide}`}>
            <img src={team.logo ? team.logo : team.side === "CT" ? DefaultLogoCT : DefaultLogoT} />
        </div>
    )
}

