import IMatches from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  finishMatch(id:number): Promise<void>,
  updateMatch(id: number, homeTeam: number, awayTeam: number): Promise<boolean>;
  create(data: IMatches): Promise<IMatches | null>,
  findById(id: number): Promise<IMatches | null>
}
