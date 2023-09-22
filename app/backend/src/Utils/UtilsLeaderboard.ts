import { ILeaderBoard } from '../Interfaces/Leaderboard/ILeaderboard';
import IMatches, { GameResults, Board } from '../Interfaces/Matches/IMatches';

export default class UtilsLeaderboard {
  private static allMatchesFinished(matches:IMatches[]):IMatches[] {
    return matches.filter((match) => match.inProgress === false);
  }

  private static allMatchesFinishedWithTeamId(
    matches:IMatches[],
    teamId:number,
  ):IMatches[] {
    return UtilsLeaderboard.allMatchesFinished(matches)
      .filter((match) => match.homeTeamId === teamId || match.awayTeamId === teamId);
  }

  private static allMatchesHomeTeamId(
    matches:IMatches[],
    teamId:number,
  ):IMatches[] {
    return UtilsLeaderboard.allMatchesFinishedWithTeamId(matches, teamId)
      .filter((match) => match.homeTeamId === teamId);
  }

  private static allMatchesAwayTeamId(
    matches:IMatches[],
    teamId:number,
  ):
    IMatches[] {
    return UtilsLeaderboard.allMatchesFinishedWithTeamId(matches, teamId)
      .filter((match) => match.awayTeamId === teamId);
  }

  private static gameRules(match:IMatches, teamId:number):GameResults {
    if (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals) {
      return 'Victory';
    }
    if (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals) {
      return 'Victory';
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      return 'Draw';
    }
    return 'Defeat';
  }

  private static chooseBoardTeamId(
    board: Board,
    matches:IMatches[],
    teamId:number,
  ):IMatches[] {
    if (board === 'home') {
      return UtilsLeaderboard.allMatchesHomeTeamId(matches, teamId);
    }
    if (board === 'away') {
      return UtilsLeaderboard.allMatchesAwayTeamId(matches, teamId);
    }
    return UtilsLeaderboard.allMatchesFinishedWithTeamId(matches, teamId);
  }

  public static countGoalsFavor(
    matches:IMatches[],
    teamId:number,
    board: Board,
  ):number {
    const allMatchesFinished = UtilsLeaderboard.chooseBoardTeamId(board, matches, teamId);
    let counter = 0;
    allMatchesFinished.forEach((match) => {
      if (match.homeTeamId === teamId) {
        counter += match.homeTeamGoals;
      }
      if (match.awayTeamId === teamId) {
        counter += match.awayTeamGoals;
      }
    });
    return counter;
  }

  public static countGoalsOwn(
    matches:IMatches[],
    teamId:number,
    board: Board,
  ):number {
    const allMatchesFinished = UtilsLeaderboard.chooseBoardTeamId(board, matches, teamId);
    let counter = 0;
    allMatchesFinished.forEach((match) => {
      if (match.homeTeamId === teamId) {
        counter += match.awayTeamGoals;
      }
      if (match.awayTeamId === teamId) {
        counter += match.homeTeamGoals;
      }
    });
    return counter;
  }

  public static countGoalsBalance(
    matches:IMatches[],
    teamId:number,
    board: Board,
  ):number {
    const goalsFavor = UtilsLeaderboard.countGoalsFavor(matches, teamId, board);
    const goalsOwn = UtilsLeaderboard.countGoalsOwn(matches, teamId, board);
    return goalsFavor - goalsOwn;
  }

  public static countVictories(
    matches:IMatches[],
    teamId:number,
    board:Board,
  ):number {
    const allMatchesFinished = UtilsLeaderboard.chooseBoardTeamId(board, matches, teamId);
    let counter = 0;
    allMatchesFinished.forEach((match) => {
      if (UtilsLeaderboard.gameRules(match, teamId) === 'Victory') {
        counter += 1;
      }
    });
    return counter;
  }

  public static countDraws(
    matches:IMatches[],
    teamId:number,
    board: Board,
  ):number {
    let counter = 0;
    const allMatchesFinished = UtilsLeaderboard.chooseBoardTeamId(board, matches, teamId);
    allMatchesFinished.forEach((match) => {
      if (UtilsLeaderboard.gameRules(match, teamId) === 'Draw') {
        counter += 1;
      }
    });
    return counter;
  }

  public static countTotalPoints(
    matches:IMatches[],
    teamId:number,
    board:Board,
  ):number {
    const victoryPoint = 3;
    const drawPoint = 1;
    const totalVictories = UtilsLeaderboard.countVictories(matches, teamId, board) * victoryPoint;
    const totalDraws = UtilsLeaderboard.countDraws(matches, teamId, board) * drawPoint;
    return totalDraws + totalVictories;
  }

  public static efficiency(
    matches:IMatches[],
    teamId:number,
    board:Board,
  ):string {
    const totalPoints = UtilsLeaderboard.countTotalPoints(matches, teamId, board);
    const totalGames = UtilsLeaderboard.countTotalGames(matches, teamId, board);
    const result = (totalPoints / (totalGames * 3)) * 100;
    return result.toFixed(2);
  }

  public static countLosses(
    matches:IMatches[],
    teamId:number,
    board: Board,
  ):number {
    const allMatchesFinished = UtilsLeaderboard.chooseBoardTeamId(board, matches, teamId);
    let counter = 0;
    allMatchesFinished.forEach((match) => {
      if (UtilsLeaderboard.gameRules(match, teamId) === 'Defeat') {
        counter += 1;
      }
    });
    return counter;
  }

  public static countTotalGames(
    matches: IMatches[],
    teamId: number,
    board: Board,
  ): number {
    const totalGames = UtilsLeaderboard.chooseBoardTeamId(board, matches, teamId);
    return totalGames.length;
  }

  public static classificationSorted(classification:ILeaderBoard[]):ILeaderBoard[] {
    return classification.sort((a:ILeaderBoard, b:ILeaderBoard) =>
      b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  }
}
