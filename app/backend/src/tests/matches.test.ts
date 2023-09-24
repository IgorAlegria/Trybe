import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { 
    errorCreateMatch, 
    notFoundTeamsCreateMatch, 
    equalTeamsCreateMatch, 
    returnCreatedMatche, 
    createMatch, 
    updatedMatches,
    allMatchesMock, 
    allMatchesFinishedMock, 
    allMatchesProgressMock,
    errorUpdatedMatches,
    notFounddMatches
} from './mocks/MockMatches';
import { loginMock } from './mocks/MockUsers'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o retorno da model SequelizeMatches', () => {
    afterEach(sinon.restore);

    it('Testando getAll', async function (){
        sinon.stub(SequelizeMatches, 'findAll').resolves(allMatchesMock as any);
        const { status, body } = await chai.request(app).get('/matches');
    
        expect(status).to.eq(200);
        expect(body).to.deep.equal(allMatchesMock);
      });

      it('Testando se retorna as paridas que acabaram', async function (){
        sinon.stub(SequelizeMatches, 'findAll').resolves(allMatchesFinishedMock as any);
        const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    
        expect(status).to.eq(200);
        expect(body).to.deep.equal(allMatchesFinishedMock);
      });

      it('Testando se retorna as paridas que estão em andamento', async function (){
        sinon.stub(SequelizeMatches, 'findAll').resolves(allMatchesProgressMock as any);
        const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    
        expect(status).to.eq(200);
        expect(body).to.deep.equal(allMatchesProgressMock);
      });

      it('Testando se o status da partida muda para finalizando', async function (){
        sinon.stub(SequelizeMatches, 'update').resolves();
        const login = await chai.request(app).post('/login').send(loginMock)
        const token = login.body.token
        const { status, body } = await chai.request(app).patch('/matches/41/finish').set('Authorization', `'Bearer' ${token}`);
    
        expect(status).to.eq(200);
        expect(body).to.deep.equal({ message: 'Finished' });
      });

      it('Testando se atualiza as partidas em andamento', async function (){
        sinon.stub(SequelizeMatches, 'update').resolves();
        const login = await chai.request(app).post('/login').send(loginMock)
        const token = login.body.token
        const { status, body } = await chai.request(app).patch('/matches/41').set('Authorization', `'Bearer' ${token}`).send(updatedMatches);
    
        expect(status).to.eq(200);
        expect(body).to.deep.equal({ message: 'Updated' });
      });

      it('Testando se retorna erro ao tentar atualizando uma partida terminada', async function (){
        sinon.stub(SequelizeMatches, 'update').resolves();
        const login = await chai.request(app).post('/login').send(loginMock)
        const token = login.body.token
        const { status, body } = await chai.request(app).patch('/matches/1').set('Authorization', `'Bearer' ${token}`).send(errorUpdatedMatches);
    
        expect(status).to.eq(409);
        expect(body).to.deep.equal({ message: 'Matches is finish' });
      });

      it('Testando se retorna erro ao colocar id de uma partida inexistente', async function (){
        sinon.stub(SequelizeMatches, 'update').resolves();
        const login = await chai.request(app).post('/login').send(loginMock)
        const token = login.body.token
        const { status, body } = await chai.request(app).patch('/matches/999').set('Authorization', `'Bearer' ${token}`).send(notFounddMatches);
    
        expect(status).to.eq(404);
        expect(body).to.deep.equal({ message: 'Match not found' });
      });

      it('Testando se é possivel criar uma partida', async function (){
        const MockMatch = SequelizeMatches.build(returnCreatedMatche)
        sinon.stub(SequelizeMatches, 'create').resolves(MockMatch);
        const login = await chai.request(app).post('/login').send(loginMock)
        const token = login.body.token
        const { status, body } = await chai.request(app).post('/matches').set('Authorization', `'Bearer' ${token}`).send(createMatch);
    
        expect(status).to.eq(201);
        expect(body).to.deep.equal(returnCreatedMatche);
      });

      it('Testando se retorna erro quando coloca o mesmo id para as duas equipes', async function (){
        const login = await chai.request(app).post('/login').send(loginMock)
        const token = login.body.token
        const { status, body } = await chai.request(app).post('/matches').set('Authorization', `'Bearer' ${token}`).send(equalTeamsCreateMatch);
    
        expect(status).to.eq(422);
        expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
      });

      it('Testando se retorna erro quando coloca id errado(equipe inexistente)', async function (){
        const login = await chai.request(app).post('/login').send(loginMock)
        const token = login.body.token
        const { status, body } = await chai.request(app).post('/matches').set('Authorization', `'Bearer' ${token}`).send(notFoundTeamsCreateMatch);
    
        expect(status).to.eq(404);
        expect(body).to.deep.equal({ message: 'There is no team with such id!' });
      });

      it('Testando se retorna erro quando falta alguma informação', async function (){
        sinon.stub(SequelizeMatches, 'create').resolves();
        const login = await chai.request(app).post('/login').send(loginMock)
        const token = login.body.token
        const { status, body } = await chai.request(app).post('/matches').set('Authorization', `'Bearer' ${token}`).send(errorCreateMatch);
    
        expect(status).to.eq(404);
        expect(body).to.deep.equal({ message: 'Failed to create the match' });
      });
});
