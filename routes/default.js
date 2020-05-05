// default.js
const patientviewRouter = require('./patientview');
const patientRouter = require('./patient');
const staffRouter = require('./staff');
const deptRouter = require('./department');
const ecRouter = require('./ec');
const roomRouter = require('./room');
const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    patientviewRouter.routes(),
    patientRouter.routes(),
    staffRouter.routes(),
    deptRouter.routes(),
    ecRouter.routes(),
    roomRouter.routes(),
    defaultRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
};