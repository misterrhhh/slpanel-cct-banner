import React from 'react';
import type { ExtendedPlayer } from '../../types';
import "./players.scss";

import DefaultAvatarCT from "./../../assets/agents/ct.png";
import DefaultAvatarT from "./../../assets/agents/t.png";

import Weapon from '../Weapon/Weapon';

const CLIP_OFFSET = 2.3


interface Props {
    players: ExtendedPlayer[],
    orientation: "left" | "right",
    side: "CT" | "T",
    placements: string[],
    observedID: string
}

export const PlayersList: React.FC<Props> = ({ players, orientation, side, placements, observedID }) => {

   

    if (!placements || placements.length < 5) return null;

    const orderedPlayers = placements.map((steamid) =>
        players.find((p) => p.steamid === steamid) || null
    );

    const hasMissingPlayer = orderedPlayers.some((p) => p === null);


    if (hasMissingPlayer) return null;

    return (
        <div className={`players-list ${orientation} ${side}`}>
            {orderedPlayers.map((player) => {
                if (!player) return null;

                return (
                    <Player
                        player={player}
                        observed={player.steamid === observedID}
                        orientation={orientation}
                    />
                );
            })}
        </div>
    )
}

interface PlayersProps {
    player: ExtendedPlayer,
    observed: boolean,
    orientation: "left" | "right"
}

const Player: React.FC<PlayersProps> = ({ player, observed, orientation }) => {

    const weapons = player.weapons.map(weapon => ({ ...weapon, name: weapon.name.replace("weapon_", "") }));
    const primary = weapons.filter(weapon => !['C4', 'Pistol', 'Knife', 'Grenade', undefined].includes(weapon.type))[0] || null;
    const secondary = weapons.filter(weapon => weapon.type === "Pistol")[0] || null;
    const tertiary = weapons.filter(weapon => weapon.type === "Knife")[0] || null;

    let health = player.state.health
    let healthNegative = 100 - health

    let a = health === 0 ? 100 : 100 - CLIP_OFFSET < healthNegative ? 100 - CLIP_OFFSET : healthNegative
    let b = healthNegative + CLIP_OFFSET > 100 ? healthNegative : CLIP_OFFSET + healthNegative

    let healthStyleLeft = `polygon(0 ${a}%, 100% ${b}%, 100% 100%, 0 100%)`
    let healthStyleRight = `polygon(0 ${b}%, 100% ${a}%, 100% 100%, 0 100%)`

    let healthStyle = orientation === "left" ? healthStyleLeft : healthStyleRight


    let name = player.name

    return (
        <div className={`player ${observed ? "observed" : ""} ${player.state.health === 0 ? "dead" : ""}`}>
            <div className="player-dead">DEAD</div>
            <div className="player-skull"></div>

            <div className="player-health">
                <div className="value">{health}</div>
                <div className="hp">HP</div>
            </div>

            <div className="player-name-wrapper">
                <div className="player-name">{name}</div>
            </div>

            <div className="player-weapon">
                {primary || secondary || tertiary ? <Weapon weapon={primary ? primary.name : secondary ? secondary.name : tertiary.name} active={primary ? primary.state === "active" : secondary ? secondary.state === "active" : tertiary.state === "active"} /> : ""}
            </div>



            <div className="player-health-frame-secondary">
                <div className="player-health-bar-dummy" style={{ clipPath: healthStyle }}>
                    <div className="player-health-bar-secondary"></div>
                </div>
            </div>
            <div className="player-fog"></div>
            <div className="player-avatar"><img src={player.avatar ? player.avatar : player.team.side === "CT" ? DefaultAvatarCT : DefaultAvatarT} /></div>
            <div className="player-health-frame">
                <div className="player-health-bar" style={{ clipPath: healthStyle }}></div>
                <div className="player-health-bar-delayed" style={{ clipPath: healthStyle }}></div>
            </div>

        </div>
    )
}
