const patientController = new (require('../controllers/PatientController'))();
const patientRouter = new require('koa-router')({
    prefix: '/patient'
});

patientRouter.get('/', patientController.patients);
patientRouter.get('/:patient', patientController.patient);
patientRouter.post('/', patientController.addPatient, patientController.patients);
patientRouter.put('/:patient', patientController.updatePatient, patientController.patients);
patientRouter.delete('/:patient', patientController.deletePatient, patientController.patients);

module.exports = patientRouter;