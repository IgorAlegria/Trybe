import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  finishMatch(id:number): Promise<void>,
}
