import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DirtyService } from '../../services/dirty.service';

@Component({
  selector: 'app-slide-header',
  templateUrl: './slide-header.component.html',
  styleUrls: ['./slide-header.component.scss']
})
export class SlideHeaderComponent implements OnInit {

  constructor(public dirtyService: DirtyService) {
    dirtyService.dirty.subscribe((state) => {
      this.dirty = state;
    });

    dirtyService.saving.subscribe((state) => {
      this.saving = state;
    });
  }

  @Input() title: string;
  @Input() className: string;
  @Input() mode: string;

  @Input() enableSave: boolean;
  @Input() iconClass: string;
  @Input() closeFn: boolean;
  @Input() toolbar: TemplateRef<any>;

  @Output() closed = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();

  dirty: boolean;
  saving: boolean;

  class = 'topper';
  ngOnInit() {

    if (this.mode === 'inline') {
      this.class = 'inline-topper';
    }
  }

  saveClick(event) {
    this.dirtyService.setSaving();
    this.save.emit();
  }
  closeSlider() {
    this.closed.emit(true);
  }
}
