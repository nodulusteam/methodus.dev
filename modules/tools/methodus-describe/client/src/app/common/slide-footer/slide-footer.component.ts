import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slide-footer',
  templateUrl: './slide-footer.component.html',
  styleUrls: ['./slide-footer.component.scss']
})
export class SlideFooterComponent implements OnInit {

  constructor() { }

  @Input() title: string;
  @Input() className: string;
  @Input() iconClass: string;
  @Input() closeFn: Function;
  @Output() closed = new EventEmitter();
  ngOnInit() {
  }

  closeSlider() {
    this.closed.emit(true);
  }
}
