import type { ExtendedCSGO, ExtendedTeam } from "../../types"
import "./teambanner.scss"

import { Tactical } from "../Timeouts/Tactical"
import { Win } from "../Win/Win"
import backgroundVideo from "./../../assets/background.mp4"
import cct from "./../../assets/cct.png"

interface Props {
    team: ExtendedTeam,
    game: ExtendedCSGO,
    showWinner: boolean,
    amountOfMaps: number
}

export const TeamBanner: React.FC<Props> = ({ team, game, showWinner, amountOfMaps }) => {

    const phase = game.phase_countdowns.phase

    

    const tacticalPhase = team.side === "CT" ? "timeout_ct" : "timeout_t"
    const showTactical = phase === tacticalPhase


   

    return (
        <div className={`banner ${team.physicalSide} ${team.side}`}>
            <Tactical show={showTactical} teamTimeout={team} time={game.phase_countdowns.phase_ends_in ?? 0}/>
            <Win show={showWinner} team={team} />
            <div className="banner-background">
                <video autoPlay loop muted>
                    <source src={backgroundVideo} type="video/webm" />
                </video>
            </div>
            <div className="banner-gradient"></div>
            <div className="banner-team">
                <img src={team.logo ?? cct} />
            </div>
            <div className="banner-identifier"></div>
            <div className="banner-container">
                <div className="banner-name">{team.name}</div>
                <div className="banner-bo">
                    {new Array(amountOfMaps).fill(0).map((_, i) => (
						<div key={i} className={`box ${team.matches_won_this_series > i ? "win" : ""} `} />
					))}
                </div>
            </div>
            <div className="banner-score">{team.score}</div>
        </div>
    )
}

