const chpConnection = require('../database/chp_connection');

class RoomController {
    constructor(){
        console.log("Room Controller Initialized");
    }

    // Return all rooms
    async rooms(ctx) {
        console.log("CONTROLLER HIT: RoomController::rooms");
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Room;';
            chpConnection.query(query, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Room: ${err}`);
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

    //Return a single room
    async room(ctx) {
        console.log("CONTROLLER HIT: RoomController::room");
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Room WHERE room_num = ?;';
            const rnum = ctx.params.room;
            chpConnection.query({
                sql: query,
                values: [rnum]
             }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Room: ${err}`);
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

    // Add a new room
    async addRoom(ctx, next) {
        console.log("CONTROLLER HIT: RoomController::addRoom");
        return new Promise((resolve, reject) => {
            const newR = ctx.request.body;
            const query = 'INSERT INTO Room(room_num, is_occupied, patient) VALUES (?, ?, ?);';
            chpConnection.query({
                sql: query,
                values: [newR.room_num, newR.is_occupied, newR.patient]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Room: ${err}`);
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

    // Update a room
    async updateRoom(ctx, next) {
        console.log("CONTROLLER HIT: RoomController::updateRoom");
        return new Promise((resolve, reject) => {
            const rnum = ctx.params.room;
            const ur = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Room
                    SET
                        is_occupied = ?,
                        patient = ?
                    WHERE room_num = ?;`,
                values: [ur.is_occupied, ur.patient, rnum]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Room: ${err}`);
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

    // Delete a room
    async deleteRoom(ctx, next) {
        console.log("CONTROLLER HIT: RoomController::deleteRoom");
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: 'DELETE FROM Room WHERE room_num = ?;',
                values: [ctx.params.room]
            }, (err, res) => {
                if(err){
                    reject(`Error querying CHP.Room: ${err}`);
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

module.exports = RoomController;