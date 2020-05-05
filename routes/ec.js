const ecController = new (require('../controllers/EcController'))();
const ecRouter = new require('koa-router')({
    prefix: '/ec'
});

ecRouter.get('/', ecController.ecs);
ecRouter.get('/:ec', ecController.ec);
ecRouter.post('/', ecController.addEc, ecController.ecs);
ecRouter.put('/:ec', ecController.updateEc, ecController.ecs);
ecRouter.delete('/:ec', ecController.deleteEc, ecController.ecs);

module.exports = ecRouter;