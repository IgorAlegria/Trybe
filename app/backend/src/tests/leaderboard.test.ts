import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { allMatchesMock } from './mocks/MockMatches';
import { allTeamsMock } from './mocks/MockTeams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o retorno da rota leaderboard', () => {
    afterEach(sinon.restore);

    it('Testando retorno total', async function (){
        sinon.stub(SequelizeMatches, 'findAll').resolves(allMatchesMock as any);
        sinon.stub(SequelizeTeams, 'findAll').resolves(allTeamsMock as any);
        const { status, body } = await chai.request(app).get('/leaderboard');
    
        expect(status).to.eq(200);
        expect(body[0]).to.have.property('totalPoints');
        expect(body[0]).to.have.property('totalGames');
        expect(body[0]).to.have.property('totalVictories');
        expect(body[0]).to.have.property('totalDraws');
        expect(body[0]).to.have.property('totalLosses');
        expect(body[0]).to.have.property('goalsFavor');
        expect(body[0]).to.have.property('goalsOwn');
        expect(body[0]).to.have.property('goalsBalance');
        expect(body[0]).to.have.property('efficiency');
      });

      it('Testanto o retorno a classificação em jogo em casa', async function (){
        sinon.stub(SequelizeMatches, 'findAll').resolves(allMatchesMock as any);
        sinon.stub(SequelizeTeams, 'findAll').resolves(allTeamsMock as any);
        const { status, body } = await chai.request(app).get('/leaderboard/home');
    
        expect(status).to.eq(200);
        expect(body[0]).to.have.property('totalPoints');
        expect(body[0]).to.have.property('totalGames');
        expect(body[0]).to.have.property('totalVictories');
        expect(body[0]).to.have.property('totalDraws');
        expect(body[0]).to.have.property('totalLosses');
        expect(body[0]).to.have.property('goalsFavor');
        expect(body[0]).to.have.property('goalsOwn');
        expect(body[0]).to.have.property('goalsBalance');
        expect(body[0]).to.have.property('efficiency');
      });

      it('Testanto o retorno a classificação em jogo fora', async function (){
        sinon.stub(SequelizeMatches, 'findAll').resolves(allMatchesMock as any);
        sinon.stub(SequelizeTeams, 'findAll').resolves(allTeamsMock as any);
        const { status, body } = await chai.request(app).get('/leaderboard/away');
    
        expect(status).to.eq(200);
        expect(body[0]).to.have.property('totalPoints');
        expect(body[0]).to.have.property('totalGames');
        expect(body[0]).to.have.property('totalVictories');
        expect(body[0]).to.have.property('totalDraws');
        expect(body[0]).to.have.property('totalLosses');
        expect(body[0]).to.have.property('goalsFavor');
        expect(body[0]).to.have.property('goalsOwn');
        expect(body[0]).to.have.property('goalsBalance');
        expect(body[0]).to.have.property('efficiency');
      });

});
