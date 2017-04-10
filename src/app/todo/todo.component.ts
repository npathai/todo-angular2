import { Component, OnInit } from '@angular/core';
import {InMemoryTodoService} from '../service/in-memory-todo.service';
import {Task} from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [InMemoryTodoService]
})
export class TodoComponent implements OnInit {
  newTask: string;
  tasks: Task[];

  constructor(private todoService: InMemoryTodoService) { }

  ngOnInit() {
    this.todoService.getAll().then(tasks => {
      this.tasks = tasks;
    });
  }

  onSubmit() {
    console.log('on submit called ' + this.newTask);
    this.todoService.add(this.newTask)
    .then(task => {
      return this.todoService.getAll();
    }).then(tasks => {
      this.newTask = undefined;
      this.tasks = tasks;
      console.log(this.tasks);
    });
  }

  // deleteTask(id: number) {
  //   this.todoService.delete(id)
  //   .then(() => {
  //     return this.todoService.getAll();
  //   }).then(tasks => {
  //     this.tasks = tasks;
  //   });
  // }

  // toggleTask(task: Task) {
  //   this.todoService.updateDone(task.id, !task.isDone)
  //   .then(() => {
  //     return this.todoService.getAll();
  //   }).then(tasks => {
  //     this.tasks = tasks;
  //   });
  // }

  onNotify(message: string) {
    console.log('On notify called of todo component: ' + message);
    this.todoService.getAll().then(tasks => {
      this.tasks = tasks;
    });
  }
}
