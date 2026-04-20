import * as I from "csgogsi";
import React, { useEffect, useState } from 'react';
import eventEmitter from '../../events/EventEmitter';
import type { ExtendedCSGO, Match } from '../../types';
import { TeamBanner } from '../TeamBanner/TeamBanner';
import "./layout.scss";

interface Props {
    game: ExtendedCSGO | null,
    match: Match | null
}

const Layout: React.FC<Props> = ({ game, match }) => {

    if (!match || !game) return null;

    const left = game.map.team_ct.physicalSide === "left" ? game.map.team_ct : game.map.team_t
    const right = game.map.team_ct.physicalSide === "right" ? game.map.team_ct : game.map.team_t

  const amountOfMaps = (match && Math.floor(Number(match.mode.substr(-1)) / 2) + 1) || 0;

  console.log("Amount of maps:", amountOfMaps);

    const [winnerSide, setWinnerSide] = useState<"CT" | "T">("CT")
    const [showWinner, setShowWinner] = useState(false)

    useEffect(() => {
        eventEmitter.on("roundEnd", (result: I.Score) => {
            console.log(result)
            setWinnerSide(result.winner.side)
            setShowWinner(true)

            setTimeout(() => {
                setShowWinner(false);
            }, 5000);
        });

        return () => {
            eventEmitter.off("roundEnd", () => { });
        };
    }, []);

    return (
        <div className="layout">
            <TeamBanner team={left} game={game} showWinner={showWinner && winnerSide === left.side} amountOfMaps={amountOfMaps} />
            <TeamBanner team={right} game={game} showWinner={showWinner && winnerSide === right.side} amountOfMaps={amountOfMaps} />
        </div>
    )
}

export default Layout;
