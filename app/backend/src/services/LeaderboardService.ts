import MatchesModel from '../models/MatchesModel';
import TeamModel from '../models/TeamsModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';

export type Team = {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    teamName: string;
  };
  awayTeam: {
    teamName: string;
  };
};

export default class leaderboardService {
  static matches: any;
  static teams: any;
  constructor(
    private matches: IMatchesModel = new MatchesModel(),
    private teams: ITeamsModel = new TeamModel(),
  ) { }

  public async home() {
    const allMatches = await this.matches.findAll();
    const matchesHome = allMatches
      .filter((match: { inProgress: boolean; }) => match.inProgress === false);
    const teamHome = await this.teams.findAll();
    const teste = teamHome.map((team) => {
      const t = team.teamName;

      return { [t]: matchesHome.filter((match) => match.homeTeamId === team.id) };
    });
    return teste[0];
  }
}
