import { Injectable } from '@angular/core';


@Injectable()
export class NavigationService {
  constructor() {
  }
  history = [];
  historyIndex = 0;

  async add(historyObject: { name: string, hit?: number }) {



    const exist = this.history.filter((hist) => {
      return hist.name === historyObject.name;
    });// indexOf(history);


    if (exist.length > 0) {
      exist[0].hit++;
      //this.history[exist].hit = this.history[exist].hit ? this.history[exist].hit + 1 : 1;
    } else {
      historyObject.hit = 1;

      this.history.push(historyObject);
      this.historyIndex = this.history.length;
    }
  }

  moveBack() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
    }
  }
}
