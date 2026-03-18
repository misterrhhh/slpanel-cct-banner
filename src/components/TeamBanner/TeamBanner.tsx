import { useEffect, useState } from "react"
import type { ExtendedCSGO, ExtendedTeam } from "../../types"
import { Win } from "../Win/Win"
import "./teambanner.scss"
import * as I from "csgogsi"
import eventEmitter from "../../events/EventEmitter"
import { Score } from "../Score/Score"
import { Tactical } from "../Timeouts/Tactical"

interface Props {
    team: ExtendedTeam,
    game: ExtendedCSGO,
    showWinner: boolean
}

export const TeamBanner: React.FC<Props> = ({ team, game, showWinner }) => {

    const phase = game.phase_countdowns.phase

    

    const tacticalPhase = team.side === "CT" ? "timeout_ct" : "timeout_t"
    const showTactical = phase === tacticalPhase


    const showScore = !showWinner && !showTactical

    return (
        <div className={`banner ${team.physicalSide} ${team.side}`}>
            <div className="banner-icon"></div>
            <div className="banner-content">
                <Tactical show={showTactical} team={team}/>
                <Win team={team} show={showWinner} />
                <Score team={team} show={showScore} />
            </div>
            <div className="banner-icon"></div>
        </div>
    )
}

/*
<Tactical show={showTactical} team={team}/>
                <Win team={team} show={showWinner} />
                <Score team={team} show={showScore} />
*/
