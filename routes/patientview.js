const PatientViewController = new (require('../controllers/PatientViewController'));
const patientviewRouter = require('koa-router')({
    prefix: '/patientview'
});

patientviewRouter.get('/', PatientViewController.patientsView);
patientviewRouter.get('/:patientview', PatientViewController.patientView);

module.exports = patientviewRouter;