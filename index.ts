import 'reflect-metadata'
import express, { Request, Response } from "express";
import Container from "typedi";
import { TaskService } from "./service/task.service";
import { Task } from "./entities/task";
import bodyParser from "body-parser";
import { container } from "tsyringe";

const app = express();
app.use(bodyParser.json())

const taskService = Container.get(TaskService);

//CRUD routes
app.get("/tasks", (request: Request, response: Response) => {
    const tasks = taskService.getAllTasks();
    response.json(tasks)
})

app.post("/tasks", (request: Request, response: Response) => {
    try {
        const task = taskService.createTask(request.body as Task);
        response.status(201).json(task);
    } catch (error) {
        response.status(400).json({ error: (error as Error).message })
    }
})

app.put("/tasks/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const task = taskService.updateTask(id, request.body as Partial<Task>);
        response.json(task);
    } catch (error) {
        response.status(404).json({ error: (error as Error).message })
    }
})

app.delete("/tasks/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    try {
        const task = taskService.deleteTask(id);
        response.status(204);
    } catch (error) {
        response.status(400).json({ error: (error as Error).message })
    }
})

app.listen(3000, () => {
    console.log(`server is running on port 3000`);
})

// let message: string = 'hello';
// console.log(message);
