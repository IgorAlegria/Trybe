import { Board } from '../Interfaces/Matches/IMatches';
import TeamsModel from '../models/TeamsModel';
import MatchesModel from '../models/MatchesModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { ILeaderBoard } from '../Interfaces/Leaderboard/ILeaderboard';
import UtilsLeaderboard from '../Utils/UtilsLeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

class LeaderboardService {
  constructor(
    private match: IMatchesModel = new MatchesModel(),
    private teams: ITeamsModel = new TeamsModel(),
  ) {}

  private async getLeaderboardNoOrder(board:Board): Promise<ILeaderBoard[]> {
    const teams = await this.teams.findAll();
    const matches = await this.match.findAll();
    const classification = teams.map((team) => ({ teamId: team.id, name: team.teamName }));
    return classification.map((team) => ({
      name: team.name,
      totalPoints: UtilsLeaderboard.countTotalPoints(matches, team.teamId, board),
      totalGames: UtilsLeaderboard.countTotalGames(matches, team.teamId, board),
      totalVictories: UtilsLeaderboard.countVictories(matches, team.teamId, board),
      totalDraws: UtilsLeaderboard.countDraws(matches, team.teamId, board),
      totalLosses: UtilsLeaderboard.countLosses(matches, team.teamId, board),
      goalsFavor: UtilsLeaderboard.countGoalsFavor(matches, team.teamId, board),
      goalsOwn: UtilsLeaderboard.countGoalsOwn(matches, team.teamId, board),
      goalsBalance: UtilsLeaderboard.countGoalsBalance(matches, team.teamId, board),
      efficiency: UtilsLeaderboard.efficiency(matches, team.teamId, board),
    }));
  }

  public async getLeaderboard(board:Board):Promise<ServiceResponse<ILeaderBoard[]>> {
    const leaderboard = await this.getLeaderboardNoOrder(board);
    const data = UtilsLeaderboard.classificationSorted(leaderboard);
    return { status: 'SUCCESSFUL', data };
  }
}
export default LeaderboardService;
