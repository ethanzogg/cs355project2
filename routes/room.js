const roomController = new (require('../controllers/RoomController'))();
const roomRouter = new require('koa-router')({
    prefix: '/room'
});

roomRouter.get('/', roomController.rooms);
roomRouter.get('/:room', roomController.room);
roomRouter.post('/', roomController.addRoom, roomController.rooms);
roomRouter.put('/:room', roomController.updateRoom, roomController.rooms);
roomRouter.delete('/:room', roomController.deleteRoom, roomController.rooms);

module.exports = roomRouter;