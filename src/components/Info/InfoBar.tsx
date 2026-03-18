
import "./info.scss"
import type { ExtendedTeam } from '../../types';
import DefaultAvatarCT from './../../assets/iconography/ct.png';
import DefaultAvatarT from './../../assets/iconography/t.png';

interface Props {
    team: ExtendedTeam;
    amountOfMaps: number;
    show: boolean
}

const InfoBar = ({ team, amountOfMaps, show }: Props) => {
    return (
        <div className={`bt-info ${show ? 'show' : 'hide'}`}>
            <div className="bt-logo">
                <img src={team.logo ? team.logo : team.side === 'CT' ? DefaultAvatarCT : DefaultAvatarT} />
            </div>
            <div className="bt-bo">
                {new Array(amountOfMaps).fill(0).map((_, i) => (
                    <div key={i} className={`box ${team.matches_won_this_series > i ? 'win' : ''} `} />
                ))}
            </div>
            <div className="bt-score">{team.score}</div>
            <div className="bt-name">{team.name}</div>
        </div>
    )
}

export default InfoBar;