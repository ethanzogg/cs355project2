const chpConnection = require('../database/chp_connection');

class PatientViewController {
    constructor() {
        console.log('PatientView Controller Initialized');
    }

    // Returns all data from the patient_view table
    async patientsView (ctx) {
        console.log('CONTROLLER HIT: PatientView::patientsView');
        return new Promise ((resolve, reject) => {
            const query = 'SELECT * FROM patient_view';

            chpConnection.query(query, (err, res) => {
                if (err){
                    reject(`Error querying CHP.patient_view: ${err}`);
                }

                ctx.body = res;
                ctx.status = 200;

                resolve();

            });
        }).catch(err => {
            ctx.status = 500;
            ctx.body = err;
        });
    }

    // Returns all data from the patient_view table relating to a single patient
    async patientView (ctx) {
        console.log('CONTROLLER HIT: PatientView::patientView');
        return  new Promise ((resolve, reject) => {
            const query = 'SELECT * FROM patient_view WHERE patient_id = ?';
            const pid = ctx.params.patientview;
            chpConnection.query({
                sql: query,
                values: [pid]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.patient_view: ${err}`)
                }

                ctx.body = res;
                ctx.status = 200;

                resolve();
            });
        }).catch(err => {
            ctx.status = 500;
            ctx.body = err;
        });
    }
}

module.exports = PatientViewController;