import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DirtyService {
  constructor() {

  }

  private _dirty: boolean;
  private _saving: boolean;
  detect: EventEmitter<any> = new EventEmitter<any>();
  dirty: EventEmitter<boolean> = new EventEmitter<boolean>();
  saving: EventEmitter<boolean> = new EventEmitter<boolean>();
  setDirty() {
    this._dirty = true;
    this.dirty.emit(true);
  }
  warn() {
    if (this._dirty) {
      return confirm('Are you sure? some data may be lost.');
    }
    return true;
  }
  clearDirty() {
    this._dirty = false;
    this.dirty.emit(false);
  }
  setSaving() {
    this._saving = false;
    this.saving.emit(true);
  }
  clearSaving() {
    this._saving = false;
    this.saving.emit(false);
  }
  detectChanges() {
    if (!this._dirty) {
      this.detect.emit();
    }
  }
}
