import {
  Component, OnInit, OnDestroy, EventEmitter, Input, Output,
  TemplateRef, ChangeDetectionStrategy, NgZone
} from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyComponent implements OnInit, OnDestroy {

  @Input() template: TemplateRef<any>;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() items: any[];
  @Input() model: string;
  @Input() noNew = false;
  @Input() mode: string;
  @Input() iconClass: string;
  @Input() groupBy: string;
  @Input() itemClass: string;
  @Output() deleteItem = new EventEmitter<any>();
  @Output() editItem = new EventEmitter<any>();
  @Output() newItem = new EventEmitter<any>();
  @Output() selectItem = new EventEmitter<any>();

  itemsHolder: any[] = [];
  itemsGroup = {};
  isFirstOpen = true;
  constructor(public _ngZone: NgZone) {

  }



  deleteItemHandler(item) {
    this.deleteItem.emit(item);
  }

  editItemHandler(item) {
    this.clearSelection();
    item._meta_active = '_meta_active';
    this.editItem.emit(item);
  }
  newItemHandler(item) {
    this.newItem.emit(item);
  }

  clearSelection() {
    this.items.forEach((it) => {
      delete it._meta_active;
    });
  }
  selectItemHandler(item) {
    this.clearSelection();
    item._meta_active = '_meta_active';
    this.selectItem.emit(item);
  }

  groupedItems(value: any, groupByField: string) {
    this._ngZone.run(async () => {
      const result = value.reduce((r: any, a: any) => {
        r[a[groupByField]] = r[a[groupByField]] || [];
        r[a[groupByField]].push(a);
        return r;
      }, Object.create({}));
      Object.keys(result).forEach((key: string) => {
        result[key] = this.sortArray(result[key]);
      });
      this.itemsGroup = result;
    });
  }
  sortArray(companiesList: any[]) {
    if (companiesList) {
      return [...companiesList].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return [];
    }
  }

  getHeading(key: string, length: number) {
    return `${key} (${length})`;
  }

  ngOnInit() {
    if (this.items) {
      this.items = this.sortArray(this.items);
      this.itemsHolder = this.items;
      this.groupedItems(this.items, 'type');
    }
  }

  async ngOnDestroy() {

  }
}

