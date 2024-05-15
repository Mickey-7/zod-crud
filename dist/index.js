"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typedi_1 = __importDefault(require("typedi"));
const task_service_1 = require("./service/task.service");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const taskService = typedi_1.default.get(task_service_1.TaskService);
//CRUD routes
app.get("/tasks", (request, response) => {
    const tasks = taskService.getAllTasks();
    response.json(tasks);
});
app.post("/tasks", (request, response) => {
    try {
        const task = taskService.createTask(request.body);
        response.status(201).json(task);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
app.put("/tasks/:id", (request, response) => {
    const { id } = request.params;
    try {
        const task = taskService.updateTask(id, request.body);
        response.json(task);
    }
    catch (error) {
        response.status(404).json({ error: error.message });
    }
});
app.delete("/tasks/:id", (request, response) => {
    const { id } = request.params;
    try {
        const task = taskService.deleteTask(id);
        response.status(204);
    }
    catch (error) {
        response.status(400).json({ error: error.message });
    }
});
app.listen(3000, () => {
    console.log(`server is running on port 3000`);
});
// let message: string = 'hello';
// console.log(message);
