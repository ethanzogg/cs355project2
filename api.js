// api.js
const http = require("http");
const koa = require("koa");
const koaJson = require('koa-json');
const bodyParser = require('koa-bodyparser');
const defaultRoute = require('./routes/default');
const API_PORT = 8031;
const api = new koa();
api.use(bodyParser());
api.use(koaJson());
defaultRoute(api);
http.createServer(api.callback()).listen(API_PORT);