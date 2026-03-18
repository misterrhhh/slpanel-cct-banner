import type { CSGO, Map, Player, Team } from "csgogsi";

export interface ExtendedTeam extends Omit<Team, "extra"> {
	extra?: string;
	short?: string;
	color?: string;
	physicalSide?: "left" | "right"
}

export interface ExtendedPlayer extends Omit<Player, "team" | "extra"> {
	id: string;
	extra?: string;
	team: ExtendedTeam;
  camera?: string;
}

export interface ExtendedMap extends Omit<Map, "team_ct" | "team_t"> {
	team_ct: ExtendedTeam;
	team_t: ExtendedTeam;
}

export interface ExtendedCSGO extends Omit<CSGO, "player" | "players" | "map"> {
	players: ExtendedPlayer[];
	player: ExtendedPlayer | null;
	map: ExtendedMap;
}

export interface MatchTeam {
  id: string;
  score: number;
  physicalSide: "left" | "right";
  color: string,
  country: string,
  extra: string,
  logo: string,
  name: string,
  placements: string[],
  short: string
}

export interface Match {
  id?: number;
  mode: string;
  title: string;
  teamOne: MatchTeam;
  teamTwo: MatchTeam;
}