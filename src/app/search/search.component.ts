import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Task} from '../model/task';
import {InMemoryTodoService} from '../service/in-memory-todo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: []
})
export class SearchComponent implements OnInit {
  query: string;
  searchRes: Task[];

  constructor(private todoService: InMemoryTodoService) { }

  ngOnInit() {

  }

  searchTask() {
      this.todoService.getAll()
      .then(tasks => {
        this.searchRes = tasks.filter(task => task.name.indexOf(this.query) >= 0);
      });
  }

  onSubmit() {
    this.todoService.getAll()
    .then(tasks => {
      this.searchRes = tasks.filter(task => task.name.indexOf(this.query) >= 0);
    });
  }
}
