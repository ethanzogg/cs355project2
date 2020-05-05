const chpConnection = require('../database/chp_connection');

class DepartmentController {
    constructor(){
        console.log("Department Controller Initialized");
    }

    // Return all departments
    async departments (ctx) {
        console.log("CONTROLLER HIT: DepartmentController::departments");
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Department;';
            chpConnection.query(query, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Department: ${err}`);
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

    // Return a single department
    async department(ctx) {
        console.log("CONTROLLER HIT: DepartmentController:department");
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Department WHERE dept_id = ?;';
            const sd = ctx.params.department;
            chpConnection.query({
                sql: query,
                values: [sd]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Department: ${err}`);
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

    // Add new department
    async addDept(ctx, next) {
        console.log("CONTROLLER HIT: DepartmentController:addDept");
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Department(dept_id, name, budget, employee_count, patient_count) VALUES (?, ?, ?, ?, ?);';
            const nd = ctx.request.body;
            chpConnection.query({
                sql: query,
                values: [nd.dept_id, nd.name, nd.budget, nd.employee_count, nd.patient_count]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Department: ${err}`);
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

    // Update department
    async updateDept(ctx, next) {
        console.log("CONTROLLER HIT: DepartmentController:updateDept");
        return new Promise((resolve, reject) => {
            const ud = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Department
                    SET
                        name = ?,
                        budget = ?,
                        employee_count = ?,
                        patient_count = ?
                    WHERE dept_id = ?;`,
                values: [ud.name, ud.budget, ud.employee_count, ud.patient_count, ctx.params.department]
            }, (err, res) => {
                if (err){
                    reject(`Error querying CHP.Department: ${err}`);
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

    // Delete a Department
    async deleteDept(ctx, next) {
        console.log("CONTROLLER HIT: DepartmentController::deleteDept");
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: 'DELETE FROM Department WHERE dept_id = ?;',
                values : [ctx.params.department]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Department: ${err}`);
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

module.exports = DepartmentController;