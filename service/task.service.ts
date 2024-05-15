import { Service } from "typedi";
import { Task, TaskSchema } from "../entities/task";

@Service()
export class TaskService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task | undefined {
        return this.tasks.find((task) => task.id === id);
    }

    createTask(data: Task): Task {
        const validatedTask = TaskSchema.parse(data);
        this.tasks.push(validatedTask);
        return validatedTask;
    }

    updateTask(id: string, data: Partial<Task>): Task {
        const taskIndex = this.tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) {
            throw new Error("Task not found");
        }

        const updatedTask = { ...this.tasks[taskIndex], ...data }
        this.tasks[taskIndex] = updatedTask
        return updatedTask;

    }

    deleteTask(id: string): void {
        const taskIndex = this.tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) {
            throw new Error("Task not found");
        }
        this.tasks.splice(taskIndex, 1);
    }
}