import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { allTeamsMock, teamMock } from './mocks/MockTeams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o retorno da model SequelizeTeams', () => {
    afterEach(sinon.restore);

    it('Testando getAll', async function (){
        sinon.stub(SequelizeTeams, 'findAll').resolves(allTeamsMock as any);
        const { status, body } = await chai.request(app).get('/teams');
    
        expect(status).to.eq(200);
        expect(body).to.deep.equal(allTeamsMock);
      });

      it('Testando findById', async function (){
        sinon.stub(SequelizeTeams, 'findOne').resolves(teamMock as any);
        const { status, body } = await chai.request(app).get('/teams/4');
    
        expect(status).to.eq(200);
        expect(body).to.deep.equal(teamMock);
      });
});
