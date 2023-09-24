import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser'
import * as bcrypt from 'bcryptjs'
import JWT from '../Utils/JWT';
import { nonExistentUser, user, loginMock, invalidEmail, invalidPassword } from './mocks/MockUsers'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o retorno da model SequelizeUser', () => {
  afterEach(sinon.restore);

    it('Login com sucesso', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(true);
     
        sinon.stub(SequelizeUser, 'findOne').resolves(user as SequelizeUser);
      
        const { status, body } = await chai.request(app)
          .post('/login')
          .send(loginMock)

        expect(status).to.eq(200);
        expect(body).to.haveOwnProperty('token');
      })

      it('Login com email invalido', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(true);
     
        sinon.stub(SequelizeUser, 'findOne').resolves(user as SequelizeUser);
      
        const { status, body } = await chai.request(app)
          .post('/login')
          .send(invalidEmail)

        expect(status).to.eq(401);
        expect(body.message).to.be.equal('Invalid email or password');
      })

      it('Login com senha invalido', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(false);
     
        sinon.stub(SequelizeUser, 'findOne').resolves(user as SequelizeUser);
      
        const { status, body } = await chai.request(app)
          .post('/login')
          .send(invalidPassword)

        expect(status).to.eq(401);
        expect(body.message).to.be.equal('Invalid email or password');
      })

      it('Retorna erro 401 se o Authorization header está sem token', async function () {
        const { status, body } = await chai.request(app).get('/login/role').send();
    
        expect(status).to.eq(401);
        expect(body).to.have.key('message');
      });
    
      it('Retorna erro 401 se o Authorization header está com token invalido', async function () {
        sinon.stub(JWT, 'verify').returns('Token must be a valid token');
    
        const { status, body } = await chai
          .request(app)
          .get('/login/role')
          .set('authorization', 'invalidToken')
          .send();

        expect(status).to.eq(401);
        expect(body).to.deep.equal({ message: 'Token must be a valid token' });
      });

      it('Testando se retorna o role do usuario', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(true);
     
        sinon.stub(SequelizeUser, 'findOne').resolves(user as SequelizeUser);
      
        const login = await chai.request(app).post('/login').send(loginMock)
        const token = login.body.token
        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', `'Bearer' ${token}`);

        expect(status).to.eq(200);
        expect(body).to.to.deep.equal({ "role": "admin" });
      })

      it('Testando se retorna erro com usuario inexistente', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(true);
     
        sinon.stub(SequelizeUser, 'findOne').resolves(user as SequelizeUser).
        onSecondCall().resolves(null);
      
        const login = await chai.request(app).post('/login').send(loginMock)
        const token = login.body.token
        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', `'Bearer' ${token}`);

        expect(status).to.eq(404);
        expect(body).to.to.deep.equal({
           "role": {
             "message": "User not found"
           }});
      })
    });

