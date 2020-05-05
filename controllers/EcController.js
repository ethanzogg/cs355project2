const chpConnection = require('../database/chp_connection');

class EcController {
    constructor(){
        console.log("Emergency Contact Controller Initialized");
    }

    // Return all emergency contacts
    async ecs(ctx){
        console.log("CONTROLLER HIT: EcController::ecs");
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Emergency_Contact;';
            chpConnection.query(query, (err, res) => {
                if (err){
                    reject(`Error querying CHP.Emergency_Contact: ${err}`);
                }
                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        }).catch(err => {
            ctx.body = err;
            ctx.status = 500;
        });
    }

    // Return a single emergency contact
    async ec(ctx){
        console.log("CONTROLLER HIT: EcController:ec");
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Emergency_Contact WHERE patient = ?;';
            const pat = ctx.params.ec;
            chpConnection.query({
                sql: query,
                values: [pat]
            }, (err, res) => {
                if (err){
                    reject(`Error querying CHP.Emergency_Contact: ${err}`);
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

    // Add new emergency contact
    async addEc(ctx, next) {
        console.log("CONTROLLER HIT: EcController:addEc");
        return new Promise((resolve, reject) => {
            const newEc = ctx.request.body;
            chpConnection.query({
                sql: 'INSERT INTO Emergency_Contact(patient, name, phone, relationship) VALUES (?, ?, ?, ?);',
                values: [newEc.patient, newEc.name, newEc.phone, newEc.relationship]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Emergency_Contact: ${err}`);
                }
                resolve();
            });
        }).then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Update an emergency contact
    async updateEc(ctx, next) {
        console.log("CONTROLLER HIT: EcController:updateEc");
        return new Promise((resolve, reject) => {
            const nce = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Emergency_Contact
                    SET
                        name = ?,
                        phone = ?,
                        relationship = ?
                    WHERE patient = ?;`,
                values: [nce.name, nce.phone, nce.relationship, ctx.params.ec]
            }, (err, res) => {
                if (err){
                    reject(`Error querying CHP.Emergency_Contact: ${err}`);
                }
                resolve();
            });
        }).then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Delete an emergecny contact
    async deleteEc(ctx, next) {
        console.log("CONTROLLER HIT: EcController:deleteEc");
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: 'DELETE FROM Emergency_Contact WHERE patient = ?;',
                values: [ctx.params.ec]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Emergency_Contact: ${err}`);
                }
                resolve();
            });
        }).then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }
}

module.exports = EcController;