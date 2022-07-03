"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path = require('path');
var options = { root: path.join(__dirname, "../home") };
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
app.use(express_1.default.static(path.join(__dirname, '../')));
//VIEWS TEST
//MVC-test
app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../home/home.html'));
    console.log("Captured get /");
    //res.sendFile("../home/home.html");
});
app.listen(8000, function () { return console.log('Server started on 8000'); });
