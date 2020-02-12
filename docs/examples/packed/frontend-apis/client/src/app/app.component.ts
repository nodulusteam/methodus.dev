import { Component, OnInit } from '@angular/core';
import { TodoModel } from './contracts.service';
import { ContractsService } from './contracts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private contractsService: ContractsService) {

  }
  title = 'Methodus Todo app';
  todos: TodoModel[];
  activeTodo: TodoModel;
  public async ngOnInit() {
    await this.getTodoList()
  }

  public async getTodoList() {
    this.todos = await this.contractsService.localController.list();
  }
  public async getMore(id: number) {
    this.activeTodo = await this.contractsService.localController.get(id);
  }
}
