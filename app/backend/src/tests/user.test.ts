import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import JWT from '../Utils/JWT';
import { user, login, invalidEmail, invalidPassword } from './mocks/MockUsers'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users test', () => {
  afterEach(sinon.restore);

    it('should login with valid credentials', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(true);
     
        sinon.stub(SequelizeUser, 'findOne').resolves(user as SequelizeUser);
      
        const response = await chai.request(app)
          .post('/login')
          .send(login)

        expect(response).to.have.status(200);
        expect(response.body).to.haveOwnProperty('token');
      })

      it('should login with invalid  email credentials', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(true);
     
        sinon.stub(SequelizeUser, 'findOne').resolves(user as SequelizeUser);
      
        const response = await chai.request(app)
          .post('/login')
          .send(invalidEmail)

        expect(response).to.have.status(401);
        expect(response.body.message).to.be.equal('Invalid email or password');
      })

      it('should login with invalid password credentials', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(true);
     
        sinon.stub(SequelizeUser, 'findOne').resolves(user as SequelizeUser);
      
        const response = await chai.request(app)
          .post('/login')
          .send(invalidPassword)

        expect(response).to.have.status(401);
        expect(response.body.message).to.be.equal('Invalid email or password');
      })

      it('Should return a 401 error for missing token in Authorization header', async function () {
        const response = await chai.request(app).get('/login/role').send();
    
        expect(response).to.equal(401);
        expect(response.body).to.have.key('message');
      });
    
      it('Should return a 401 error for an invalid token in Authorization header', async function () {
        sinon.stub(JWT, 'verify').returns('Token must be a valid token');
    
        const response = await chai
          .request(app)
          .get('/login/role')
          .set('authorization', 'invalidToken')
          .send();

        expect(response).to.equal(401);
        expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
      });
    });

