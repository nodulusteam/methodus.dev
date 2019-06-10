import { Component, OnInit } from '@angular/core';
import { LocalController } from './contracts';
import { TodoModel } from '@todo/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Methodus Todo app';
  todos: TodoModel[];
  activeTodo: TodoModel;
  public async ngOnInit() {
    this.todos = await LocalController.list();
  }

  public async getMore(id: number) {
    this.activeTodo = await LocalController.get(id);
  }
}
