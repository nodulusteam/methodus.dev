import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '@Methodus/Describe';

  constructor() {

  }
  ngOnInit() {
    (window as any).describe_color = this.selectColor(1, 10);
  }
  selectColor(colorNum, colors) {
    if (colors < 1) {
      colors = 1;
    }
    return 'hsl(' + (colorNum * (360 / colors) % 360) + ',100%,50%)';
  }
}
