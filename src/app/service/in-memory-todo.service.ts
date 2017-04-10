import { Injectable } from '@angular/core';
import {Task} from '../model/task';

@Injectable()
export class InMemoryTodoService {
  // Should be moved into task store
  id: number;
  tasks: Task[];

  constructor() {
    this.tasks = [new Task("0", "Test task")];
    this.id = 1;
  }

  add(name: string): Promise<Task> {
    var task = new Task("" + this.id++, name);
    this.tasks.push(task);
    return Promise.resolve(task);
  }

  delete(id: string): Promise<void> {
    for (var i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        this.tasks.splice(i, 1);
        return Promise.resolve();
      }
    }
    return Promise.reject("task not found");
  }

  getAll(): Promise<Task[]> {
    return Promise.resolve(this.tasks);
  }

  updateDone(id: string, isDone: boolean): Promise<void> {
    for (var i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id+"") {
        this.tasks[i].isDone = isDone;
        return Promise.resolve();
      }
    }
    return Promise.reject("task not found");
  }
}
