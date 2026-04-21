import React, { useEffect, useState } from 'react';
import type { ExtendedCSGO, ExtendedPlayer, ExtendedTeam, Match, MatchTeam } from './types';
import Layout from './components/Layout/Layout';
import './App.css';
import { io } from 'socket.io-client';
import eventEmitter from './events/EventEmitter';
import * as I from "csgogsi"

type StageLinkRuntime = {
  origin: string;
  socketOrigin: string;
  socketPath: string;
};

declare global {
  interface Window {
    __STAGELINK__?: {
      origin: string;
      socketOrigin: string;
      socketPath: string;
    };
  }
}

const getStageLinkRuntime = (): StageLinkRuntime => {
  if (window.__STAGELINK__?.socketOrigin) {
    return { ...window.__STAGELINK__ };
  }
  const devOrigin = 'http://localhost:1906';
  return {
    origin: devOrigin,
    socketOrigin: devOrigin,
    socketPath: '/socket.io',
  };
};

const runtime = getStageLinkRuntime();

const replaceHostWithServerIp = (url: string | null | undefined): string | null => {
  if (!url) return url ?? null;
  try {
    const parsed = new URL(url);
    const runtimeHost = new URL(runtime.origin).hostname;
    parsed.hostname = runtimeHost;
    return parsed.toString();
  } catch {
    return url;
  }
};

const normalizeTeamAssets = (team: ExtendedTeam): ExtendedTeam => ({
  ...team,
  logo: replaceHostWithServerIp(team.logo),
});

const normalizePlayerAssets = (player: ExtendedPlayer): ExtendedPlayer => ({
  ...player,
  avatar: replaceHostWithServerIp(player.avatar),
  team: normalizeTeamAssets(player.team),
});

const normalizeGameAssets = (data: ExtendedCSGO): ExtendedCSGO => ({
  ...data,
  map: {
    ...data.map,
    team_ct: normalizeTeamAssets(data.map.team_ct),
    team_t: normalizeTeamAssets(data.map.team_t),
  },
  players: data.players.map(normalizePlayerAssets),
  player: data.player ? normalizePlayerAssets(data.player) : null,
});

const normalizeMatchTeamAssets = (team: MatchTeam): MatchTeam => ({
  ...team,
  logo: replaceHostWithServerIp(team.logo) ?? '',
});

const normalizeMatchAssets = (matchData: Match): Match => ({
  ...matchData,
  teamOne: normalizeMatchTeamAssets(matchData.teamOne),
  teamTwo: normalizeMatchTeamAssets(matchData.teamTwo),
});

export const socket = io(runtime.socketOrigin, {
  path: runtime.socketPath,
  transports: ['websocket'],
  autoConnect: false,
});

const App: React.FC = () => {
  const [game, setGame] = useState<ExtendedCSGO | null>(null);
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    socket.connect();

    const handleData = (data: ExtendedCSGO) => {
      setGame(normalizeGameAssets(data));
    };

    const handleMatch = (matchData: Match) => {
      setMatch(normalizeMatchAssets(matchData));
    };

    const handleBombExplode = () => {
      eventEmitter.emit('bombExplode');
    };

    const handleRoundEnd = (score: I.Score) => {
      console.log(score)
      eventEmitter.emit('roundEnd', score);
    };

    socket.on('data', handleData);
    socket.on('match', handleMatch);
    socket.on('bombExplode', handleBombExplode);
    socket.on('roundEnd', handleRoundEnd);

    return () => {
      socket.off('data', handleData);
      socket.off('match', handleMatch);
      socket.off('bombExplode', handleBombExplode);
      socket.off('roundEnd', handleRoundEnd);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      {(!game || !match) ? (
        <div className="App-loading">Waiting for match data…</div>
      ) : (
        <Layout game={game} match={match} />
      )}
    </div>
  );
};

export default App;
