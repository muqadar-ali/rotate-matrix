"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCsvFile = void 0;
var fs = require("fs");
var fastCsv = require("fast-csv");
var parseCsvFile = function (filename) {
    var data = [];
    var readableStream = fs.createReadStream(filename);
    return new Promise(function (resolve, reject) {
        fastCsv
            .parseStream(readableStream)
            .on("error", function (error) {
            reject(error);
        })
            .on("data", function (row) {
            data.push(row);
        })
            .on("end", function (rowCount) {
            resolve(data);
        });
    });
};
exports.parseCsvFile = parseCsvFile;
