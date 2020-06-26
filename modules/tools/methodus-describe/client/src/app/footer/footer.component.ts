import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  _on: boolean;
  toggle() {
    this._on = !this._on;
  }

  ngOnInit() {
  }

}
