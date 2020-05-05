const departmentController = new (require('../controllers/DepartmentController'))();
const departmentRouter = new require('koa-router')({
    prefix: '/dept'
});

departmentRouter.get('/', departmentController.departments);
departmentRouter.get('/:department', departmentController.department);
departmentRouter.post('/', departmentController.addDept, departmentController.departments);
departmentRouter.put('/:department', departmentController.updateDept, departmentController.departments);
departmentRouter.delete('/:department', departmentController.deleteDept, departmentController.departments);

module.exports = departmentRouter;