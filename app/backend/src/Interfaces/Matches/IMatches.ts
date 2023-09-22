export default interface IMatches {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export type GameResults = 'Victory' | 'Defeat' | 'Draw';

export type Board = 'home' | 'away' | undefined;

export interface IMatchWithAssociations extends IMatches {
  homeTeam: { teamName: string };
  awayTeam: { teamName: string };
}
