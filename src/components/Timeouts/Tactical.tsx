import React, { useEffect, useState } from 'react';
import type { ExtendedTeam } from '../../types';
import "./timeouts.scss";


interface Props {
    show: boolean
    teamTimeout: ExtendedTeam,
    time: number
}


export const Tactical: React.FC<Props> = ({ show, teamTimeout, time }) => {

    const [displayTime, setDisplayTime] = useState(0)
    const [maxTime, setMaxTime] = useState(0)
    const [team, setTeam] = useState<ExtendedTeam>()

    useEffect(() => {
        if (time && show) {
            setDisplayTime(time)

            if (time > maxTime) {
                setMaxTime(time)
            }
        }
    }, [time])

    useEffect(() => {
        if (show && teamTimeout) {
            setTeam(teamTimeout)
        }
    }, [teamTimeout])

    

    let progress = (100 * displayTime) / maxTime


    let styleLeft = `polygon(0% 0, ${progress}% 0, ${progress}% 100%, 0% 100%)`
    let styleRight = `polygon(${100 - progress}% 0, 100% 0, 100% 100%, ${100 - progress}% 100%)`

    return (
        <div className={`tactical ${team?.side} ${team?.physicalSide} ${show ? "show" : "hide"}`}>
            <div className="tactical-background"></div>
            <div className="tactical-bar" style={{ clipPath: team?.physicalSide === "left" ? styleLeft : styleRight }}></div>
            
            <div className="tactical-time">{displayTime.toFixed(0)}</div>
        </div>
    )
}

