// StaffController.js

const chpConnection = require('../database/chp_connection')

class StaffController {
    constructor(){
        console.log("Staff Controller Initialized");
    }

    // Return all staff members
    async wholeStaff (ctx) {
        console.log("CONTROLLER HIT: StaffController:wholeStaff");
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Staff;';
            chpConnection.query(query, (err, res) => {
                if (err){
                    reject(`Error querying CHP.Staff: ${err}`);
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

    // Return single staff member
    async singleStaff (ctx) {
        console.log("CONTROLLER HIT: StaffController:singleStaff")
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Staff WHERE staff_id = ?;';
            const sid = ctx.params.staff;

            chpConnection.query({
                sql: query,
                values: [sid]
            }, (err, res) => {
                if (err){
                    reject(`Error querying CHP.Staff: ${err}`)
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

    // Add new staff member
    async addStaff(ctx, next) {
        console.log("CONTROLLER HIT: StaffController::addStaff");
        return new Promise((resolve, reject) => {
            const newS = ctx.request.body;
            const query = 'INSERT INTO Staff(staff_id, fName, mName, lName, suffix, dept, salary) VALUES (?, ?, ?, ?, ?, ?, ?);';
            chpConnection.query({
                sql: query,
                values: [newS.staff_id, newS.fName, newS.mName, newS.lName, newS.suffix, newS.dept, newS.salary]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Staff: ${err}`);
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

    // Update a staff member
    async updateStaff(ctx, next) {
        console.log("CONTROLLER HIT: StaffController::updateStaff");
        return new Promise((resolve, reject) => {
            const sm = ctx.request.body;
            chpConnection.query({
                sql:`
                    UPDATE Staff
                    SET
                        fName = ?,
                        mName = ?,
                        lName = ?,
                        suffix = ?,
                        dept = ?,
                        salary = ?
                    WHERE staff_id = ?;`,
                values: [sm.fName, sm.mName, sm.lName, sm.suffix, sm.dept, sm.salary, ctx.params.staff]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Staff: ${err}`);
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

    // Delete a staff member
    async deleteStaff(ctx, next) {
        console.log("CONTROLLER HIT: StaffController::deleteStaff");
        return new Promise ((resolve, reject) => {
            chpConnection.query({
                sql: 'DELETE FROM Staff WHERE staff_id = ?;',
                values: [ctx.params.staff]
            }, (err, res) => {
                if (err){
                    reject(`Error querying CHP.Staff: ${err}`);
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
}

module.exports = StaffController;