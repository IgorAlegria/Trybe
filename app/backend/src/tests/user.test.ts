import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { user, login } from './mocks/MockUsers'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users test', () => {
    it('should login with valid credentials', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(true);
     
        sinon.stub(SequelizeUser, 'findOne').resolves(user as SequelizeUser);
      
        const response = await chai.request(app)
          .post('/login')
          .send(login)

        expect(response).to.have.status(200);
        expect(response.body).to.haveOwnProperty('token');
      })

     
    });
