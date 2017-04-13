import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {LocalStorageTodoService} from '../service/local-storage-todo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  editable: boolean = false;
  editedName: string;

  constructor(private todoService: LocalStorageTodoService) {
    console.log('task component created: ');
  }

  ngOnInit() {
    console.log('On init called of task component: ');
    this.editedName = this.task.name;
  }

  toggleTask() {
    console.log('toggle called');
    console.log(this.task.id);
    this.todoService.updateDone(this.task.id, !this.task.isDone)
    .then(() => {
      this.notify.emit('toggled');
    });
  }

  deleteTask() {
    console.log('delete called');
    console.log(this.task.id);
    this.todoService.delete(this.task.id)
    .then(() => {
      console.log('promise fulfilled for delete')
      this.notify.emit('deleted');
    });
  }

  enableEditing() {
    this.editable = true;
  }

  disableEditing() {
    this.editable = false;
    this.editedName = this.task.name;
  }

  editName() {
    if (!(this.editedName === this.task.name)) {
      let newTask = new Task(this.task.id, this.editedName, this.task.isDone);
      this.todoService.update(newTask)
      .then(() => {
        this.task = newTask;
        this.notify.emit('edited');
      });
    }
    this.editable = false;
  }
}
