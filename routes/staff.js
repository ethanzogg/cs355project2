const staffController = new (require('../controllers/StaffController'))();
const staffRouter = new require('koa-router')({
    prefix: '/staff'
});

staffRouter.get('/', staffController.wholeStaff);
staffRouter.get('/:staff', staffController.singleStaff);
staffRouter.post('/', staffController.addStaff, staffController.wholeStaff);
staffRouter.put('/:staff', staffController.updateStaff, staffController.wholeStaff);
staffRouter.delete('/:staff', staffController.deleteStaff, staffController.wholeStaff);

module.exports = staffRouter;