const chpConnection = require('../database/chp_connection');

class PatientController {
    constructor(){
        console.log("Patient Controller Initialized!")
    }

    // Return all patients
    async patients(ctx) {
        console.log("Controllrt HIT: PatientController::patients");
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Patient;';

            chpConnection.query(query, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Patient: ${err}`);
                }
                
                ctx.body = res;
                ctx.status = 200;

                resolve();
            });
        }).catch(err => {
            ctx.body = `Internal Server Error: ${err}`;
            ctx.status = 500;
        });
    }

    // Return a single patient
    async patient(ctx) {
        console.log("Controller HIT: PatientController::patient");
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Patient WHERE patient_id = ?;';
            const dc = ctx.params.patient;

            chpConnection.query({
                sql: query,
                values: [dc]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Patient::patient: ${err}`);
                }

                ctx.body = res;
                ctx.status = 200;

                resolve();
            });
        }).catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // add new Patient
    async addPatient(ctx, next) {
        console.log("Controller HIT: ServerController::addPatient");
        return new Promise((resolve, reject) => {
            const newDC = ctx.request.body;

            chpConnection.query({
                sql: 'INSERT INTO Patient (patient_id, fName, mName, lName, DoB, email, phone_num, doctor, emergency_contact, admittance_date, dept) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                values: [newDC.patient_id, newDC.fName, newDC.mName, newDC.lName, newDC.DoB, newDC.email, newDC.phone_num, newDC.doctor, newDC.emergency_contact, newDC.admittance_date, newDC.dept] 
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Patient::addPatient: ${err}`);   
                }

                resolve();
            });
        }).then(await next)
        .catch(err => {
            ctx.status = 500,
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Update a patient
    async updatePatient(ctx, next) {
        console.log("Controller HIT: ServerController::updatePatient");
        return new Promise((resolve, reject) => {
            const dc = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Patient
                    SET
                        fName = ?,
                        mName = ?,
                        lName = ?,
                        DoB = ?,
                        email = ?,
                        phone_num = ?,
                        doctor = ?,
                        emergency_contact = ?,
                        admittance_date = ?,
                        dept = ?
                    WHERE patient_id = ?;`,
                values: [dc.fName, dc.mName, dc.lName, dc.DoB, dc.email, dc.phone_num, dc.doctor, dc.emergency_contact, dc.admittance_date, dc.dept, ctx.params.patient]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Patient::updatePatient: ${err}`);
                }

                resolve();
            });
        }).then(await next)
        .catch (err => {
            ctx.status = 500,
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Delete a patient
    async deletePatient(ctx, next) {
        console.log("Controller HIT: ServerController::deletePatient");
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: 'DELETE FROM Patient WHERE patient_id = ?;',
                values: [ctx.params.patient]
            }, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Patient::deletePatient: ${err}`);
                }
                resolve();
            });
        })
        .then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }
}

module.exports = PatientController;