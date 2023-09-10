import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { user } from './mocks/MockUsers'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users test', () => {
    it('verify token correct', async function () {
        sinon.stub(SequelizeUser, 'findOne').resolves(user as any);
        sinon.stub(bcrypt, 'compare').resolves(true);
        sinon.stub(jwt, 'verify').resolves({id: 1});

    const {status, body} = await chai.request(app).get('/login/role')
    .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzNzkxNzU0fQ.iICtkr3BJRboEY67OKBL5hpb4cjOOoPo1c9Rt-waezc');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({role: 'admin'});
    })
});
