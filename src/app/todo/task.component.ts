import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {InMemoryTodoService} from '../service/in-memory-todo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(private todoService: InMemoryTodoService) {
    console.log('task component created: ');
  }

  ngOnInit() {
    console.log('On init called of task component: ');
  }

  deleteTask() {
    console.log('delete called');
    console.log(this.task.id);
    this.todoService.delete(this.task.id)
    .then(() => {
      this.notify.emit('deleted');
    });
  }
}
